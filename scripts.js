import { supabase, saveLead } from './supabase.js';

// Expose Supabase client globally for quick console/custom usage
window.supabase = supabase;

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    initMobileMenu();
    initFaqAccordion();
    initContactForm();
    initSocialCard();
    initScrollAnimations();
});

// Navbar sticky effect on scroll
function initNavbar() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item, .nav-btn-mobile');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle menu icon between burger and X
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // refresh icons
        });

        // Close menu when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// FAQ Accordion
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('faq-open');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-open');
                item.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('faq-open');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });
}

// Contact Form and WhatsApp redirection
function initContactForm() {
    const form = document.getElementById('leadForm');
    const phoneInput = document.getElementById('whatsapp');
    
    if (!form) return;

    // Apply input mask for WhatsApp phone: (XX) XXXXX-XXXX
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let formatted = '';
            
            if (value.length > 0) {
                formatted = '(' + value.substring(0, 2);
                if (value.length > 2) {
                    formatted += ') ' + value.substring(2, 7);
                }
                if (value.length > 7) {
                    formatted += '-' + value.substring(7, 11);
                }
            }
            
            e.target.value = formatted;
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form fields validation
        let isValid = true;
        const name = document.getElementById('name');
        const whatsapp = document.getElementById('whatsapp');
        const email = document.getElementById('email');
        const healthPlan = document.getElementById('healthPlan');
        const service = document.getElementById('service');
        const urgency = document.getElementById('urgency');
        const message = document.getElementById('message');
        
        // Reset previous validation styles
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('invalid');
        });

        // Validate Name
        if (name && name.value.trim() === '') {
            name.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Validate WhatsApp (checks length of numbers in formatted string)
        if (whatsapp) {
            const rawPhone = whatsapp.value.replace(/\D/g, '');
            if (rawPhone.length < 10 || rawPhone.length > 11) {
                whatsapp.parentElement.classList.add('invalid');
                isValid = false;
            }
        }

        // Validate Health Plan Selection
        if (healthPlan && healthPlan.value === '') {
            healthPlan.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Validate Service Selection
        if (service && service.value === '') {
            service.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Validate Case Message
        if (message && message.value.trim() === '') {
            message.parentElement.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            sendLeadToWhatsApp({
                nome: name ? name.value.trim() : '',
                whatsapp: whatsapp ? whatsapp.value.trim() : '',
                email: (email && email.value.trim()) ? email.value.trim() : 'Não informado',
                servico: service ? service.value : 'Negativa de Plano de Saúde',
                mensagem: message ? message.value.trim() : ''
            });
        }
    });
}

// Format and redirect lead to WhatsApp
function sendLeadToWhatsApp(data) {
    // Save lead to Supabase database in background
    saveLead({
        nome: data.nome,
        whatsapp: data.whatsapp,
        email: data.email,
        servico: data.servico,
        mensagem: data.mensagem
    }).catch(err => console.error('Erro ao salvar no Supabase:', err));

    const targetPhoneNumber = '5561991521044'; // (61) 99152-1044
    
    // Create WhatsApp text message structured
    let messageText = `Olá! Vim pelo site e preciso de um advogado para negativa do plano de saúde.\n\n`;
    messageText += `*DADOS DO MEU CASO:*\n`;
    messageText += `• *Nome:* ${data.nome}\n`;
    messageText += `• *WhatsApp:* ${data.whatsapp}\n`;
    if (data.email && data.email !== 'Não informado') {
        messageText += `• *E-mail:* ${data.email}\n`;
    }
    messageText += `• *Tipo de Negativa:* ${data.servico}\n\n`;
    messageText += `*RESUMO DA SITUAÇÃO:*\n${data.mensagem}`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;
    
    // Setup and show modal
    const modal = document.getElementById('successModal');
    const loadingBar = document.getElementById('modalLoadingBar');
    const manualLink = document.getElementById('modalDirectLink');
    
    if (manualLink) manualLink.href = whatsappUrl;
    if (modal) modal.classList.add('active');
    
    // Trigger loading bar width change (CSS handles transition)
    if (loadingBar) {
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 100);
    }
    
    // Auto redirect after 2.5 seconds
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 2500);
}

// Social Card interaction
function initSocialCard() {
    const card = document.querySelector('.social-card');
    const likeBtn = document.getElementById('socialLikeBtn');
    const likeCountSpan = document.getElementById('socialLikeCount');
    const bookmarkBtn = document.getElementById('socialBookmarkBtn');
    const shareBtn = document.getElementById('socialShareBtn');
    const shareCountSpan = document.getElementById('socialShareCount');

    if (!card) return;

    let likes = parseInt(likeCountSpan?.textContent.trim(), 10) || 142;
    let isLiked = false;
    let isBookmarked = false;
    let shares = parseInt(shareCountSpan?.textContent.trim(), 10) || 12;
    let isShared = false;

    // Automated cursor state variables
    let userInteracted = false;
    let animTimeout = null;

    // Manual click listeners (checking if event is user-driven)
    if (likeBtn && likeCountSpan) {
        likeBtn.addEventListener('click', (e) => {
            if (e.isTrusted) userInteracted = true;
            isLiked = !isLiked;
            likeBtn.classList.toggle('active', isLiked);
            likes = isLiked ? likes + 1 : likes - 1;
            likeCountSpan.textContent = likes;
        });
    }

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', (e) => {
            if (e.isTrusted) userInteracted = true;
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle('active', isBookmarked);
        });
    }

    if (shareBtn && shareCountSpan) {
        shareBtn.addEventListener('click', (e) => {
            if (e.isTrusted) userInteracted = true;
            isShared = !isShared;
            shareBtn.classList.toggle('active', isShared);
            shares = isShared ? shares + 1 : shares - 1;
            shareCountSpan.textContent = shares;
        });
    }

    // Create and append cursor element
    const cursor = document.createElement('div');
    cursor.className = 'simulated-cursor';
    cursor.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 3L11 20L14.5 12.5L22 9L4 3Z" fill="#1c1d1f" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `;
    card.appendChild(cursor);

    // Track mouse enter/leave on card to pause/resume animation
    card.addEventListener('mouseenter', () => {
        userInteracted = true;
        cursor.classList.remove('active');
        clearTimeout(animTimeout);
        resetCardState();
    });

    card.addEventListener('mouseleave', () => {
        // Resume after 4 seconds of inactivity
        clearTimeout(animTimeout);
        animTimeout = setTimeout(() => {
            userInteracted = false;
            startAnimationLoop();
        }, 4000);
    });

    function resetCardState() {
        if (isLiked) {
            isLiked = false;
            likeBtn?.classList.remove('active');
            likes = 142;
            if (likeCountSpan) likeCountSpan.textContent = likes;
        }
        if (isShared) {
            isShared = false;
            shareBtn?.classList.remove('active');
            shares = 12;
            if (shareCountSpan) shareCountSpan.textContent = shares;
        }
        if (isBookmarked) {
            isBookmarked = false;
            bookmarkBtn?.classList.remove('active');
        }
    }

    function setCursorPos(element) {
        const cardRect = card.getBoundingClientRect();
        const elRect = element.getBoundingClientRect();
        const x = elRect.left - cardRect.left + elRect.width / 2;
        const y = elRect.top - cardRect.top + elRect.height / 2;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    }

    function setCursorStartPos() {
        const cardRect = card.getBoundingClientRect();
        const x = cardRect.width - 40;
        const y = cardRect.height - 40;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    }

    function executeStep(action, delay) {
        return new Promise((resolve) => {
            animTimeout = setTimeout(() => {
                if (userInteracted) return;
                action();
                resolve();
            }, delay);
        });
    }

    async function runDemo() {
        if (userInteracted) return;

        setCursorStartPos();
        cursor.classList.add('active');

        // Step 1: Move to Like button
        await executeStep(() => {
            if (likeBtn) setCursorPos(likeBtn);
        }, 1000);

        // Step 2: Click Like button
        await executeStep(() => {
            if (likeBtn) {
                cursor.classList.add('clicking');
                likeBtn.click();
                setTimeout(() => cursor.classList.remove('clicking'), 150);
            }
        }, 1000);

        // Step 3: Move to Share button
        await executeStep(() => {
            if (shareBtn) setCursorPos(shareBtn);
        }, 1200);

        // Step 4: Click Share button
        await executeStep(() => {
            if (shareBtn) {
                cursor.classList.add('clicking');
                shareBtn.click();
                setTimeout(() => cursor.classList.remove('clicking'), 150);
            }
        }, 1000);

        // Step 5: Move to Bookmark button
        await executeStep(() => {
            if (bookmarkBtn) setCursorPos(bookmarkBtn);
        }, 1200);

        // Step 6: Click Bookmark button
        await executeStep(() => {
            if (bookmarkBtn) {
                cursor.classList.add('clicking');
                bookmarkBtn.click();
                setTimeout(() => cursor.classList.remove('clicking'), 150);
            }
        }, 1000);

        // Step 7: Move cursor back to starting point
        await executeStep(() => {
            setCursorStartPos();
        }, 1500);

        // Step 8: Fade out cursor
        await executeStep(() => {
            cursor.classList.remove('active');
        }, 1000);

        // Step 9: Reset card state for the next run
        await executeStep(() => {
            resetCardState();
        }, 2000);

        // Loop again
        if (!userInteracted) {
            animTimeout = setTimeout(runDemo, 2000);
        }
    }

    function startAnimationLoop() {
        clearTimeout(animTimeout);
        if (!userInteracted && window.innerWidth > 768) {
            runDemo();
        }
    }

    // Start initial loop after 3 seconds
    animTimeout = setTimeout(startAnimationLoop, 3000);
}

// Scroll Reveal Animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Anima apenas uma vez ao rolar
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }
}


