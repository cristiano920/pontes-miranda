import { supabase, saveLead } from './supabase.js';

// Expor client caso necessário
window.supabase = supabase;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar ícones Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    initNavbar();
    initMobileMenu();
    initDropdowns();
    initAreaLinksInteractivity();
    initFaqAccordion();
    initContactForm();
    initPrivacyModal();
});

// ==========================================================================
// 1. NAVBAR STICKY NO SCROLL
// ==========================================================================
function initNavbar() {
    const header = document.querySelector('.pm-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 25) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// 2. MENU MOBILE
// ==========================================================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('pmMobileToggle');
    const navMenu = document.getElementById('pmNavMenu');
    const navLinks = document.querySelectorAll('.pm-nav-link:not(.pm-dropdown-toggle), .pm-dropdown-item');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            if (icon) icon.setAttribute('data-lucide', 'x');
        } else {
            if (icon) icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) lucide.createIcons();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) lucide.createIcons();
            }
        });
    });
}

// ==========================================================================
// 3. DROPDOWNS (HEADER) & DROPUP (RODAPÉ)
// ==========================================================================
function initDropdowns() {
    // Dropdown Header
    const headerDropdown = document.querySelector('.pm-nav-dropdown');
    const headerToggle = document.querySelector('.pm-nav-dropdown .pm-dropdown-toggle');

    if (headerDropdown && headerToggle) {
        headerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            headerDropdown.classList.toggle('active');
        });
    }

    // Dropup Rodapé
    const footerDropup = document.querySelector('.pm-footer-dropup');
    const footerToggle = document.querySelector('.pm-footer-dropup .pm-dropup-toggle');

    if (footerDropup && footerToggle) {
        footerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            footerDropup.classList.toggle('active');
        });
    }

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (headerDropdown && !headerDropdown.contains(e.target)) {
            headerDropdown.classList.remove('active');
        }
        if (footerDropup && !footerDropup.contains(e.target)) {
            footerDropup.classList.remove('active');
        }
    });
}

// ==========================================================================
// 4. LINKS DE ÁREAS (CARDS, DROPDOWN, DROPUP, BOTÕES) -> FORMULÁRIO DE CONTATO
// ==========================================================================
function initAreaLinksInteractivity() {
    const areaLinks = document.querySelectorAll('[data-area]');
    const serviceSelect = document.getElementById('pmService');

    areaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetArea = link.getAttribute('data-area');
            if (targetArea && serviceSelect) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === targetArea) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            // Scroll suave até o contato
            const contactSection = document.getElementById('contato');
            if (contactSection) {
                e.preventDefault();
                contactSection.scrollIntoView({ behavior: 'smooth' });

                const nameInput = document.getElementById('pmName');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 600);
                }
            }
        });
    });
}

// ==========================================================================
// 5. FAQ ACORDEÃO INTERATIVO
// ==========================================================================
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.pm-faq-question');

    faqQuestions.forEach(questionBtn => {
        questionBtn.addEventListener('click', () => {
            const faqItem = questionBtn.closest('.pm-faq-item');
            const answer = faqItem.querySelector('.pm-faq-answer');
            const isOpen = faqItem.classList.contains('active');

            // Fechar outros itens
            document.querySelectorAll('.pm-faq-item').forEach(item => {
                item.classList.remove('active');
                const ans = item.querySelector('.pm-faq-answer');
                if (ans) ans.style.maxHeight = '0px';
            });

            // Se não estava aberto, abre este
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ==========================================================================
// 6. FORMULÁRIO DE CONTATO (SUPABASE + WHATSAPP)
// ==========================================================================
function initContactForm() {
    const form = document.getElementById('pmLeadForm');
    const phoneInput = document.getElementById('pmWhatsapp');

    if (!form) return;

    // Máscara de telefone WhatsApp: (XX) XXXXX-XXXX
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const name = document.getElementById('pmName');
        const whatsapp = document.getElementById('pmWhatsapp');
        const email = document.getElementById('pmEmail');
        const service = document.getElementById('pmService');
        const message = document.getElementById('pmMessage');

        // Reset erros
        document.querySelectorAll('.pm-form-group').forEach(group => {
            group.classList.remove('invalid');
        });

        // Validação Nome
        if (name && name.value.trim() === '') {
            name.closest('.pm-form-group').classList.add('invalid');
            isValid = false;
        }

        // Validação WhatsApp (mínimo 10 dígitos)
        if (whatsapp) {
            const rawPhone = whatsapp.value.replace(/\D/g, '');
            if (rawPhone.length < 10 || rawPhone.length > 11) {
                whatsapp.closest('.pm-form-group').classList.add('invalid');
                isValid = false;
            }
        }

        // Validação Assunto / Serviço
        if (service && service.value === '') {
            service.closest('.pm-form-group').classList.add('invalid');
            isValid = false;
        }

        // Validação Mensagem
        if (message && message.value.trim() === '') {
            message.closest('.pm-form-group').classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            const leadData = {
                nome: name ? name.value.trim() : '',
                whatsapp: whatsapp ? whatsapp.value.trim() : '',
                email: (email && email.value.trim()) ? email.value.trim() : 'Não informado',
                servico: service ? service.value : 'Geral',
                mensagem: message ? message.value.trim() : ''
            };

            // Salvar no Supabase em segundo plano
            saveLead(leadData).catch(err => console.error('Erro ao registrar no Supabase:', err));

            // Disparar evento para GTM se disponível
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'contact_form_submission',
                    lead_service: leadData.servico
                });
            }

            // Montar texto estruturado do WhatsApp
            const targetPhone = '5561991521044';
            let messageText = `Olá! Gostaria de uma orientação jurídica com a Pontes Miranda Advogados.\n\n`;
            messageText += `*DADOS PARA CONTATO:*\n`;
            messageText += `• *Nome:* ${leadData.nome}\n`;
            messageText += `• *Telefone:* ${leadData.whatsapp}\n`;
            if (leadData.email !== 'Não informado') {
                messageText += `• *E-mail:* ${leadData.email}\n`;
            }
            messageText += `• *Assunto:* ${leadData.servico}\n\n`;
            messageText += `*RESUMO DO CASO:*\n${leadData.mensagem}`;

            const encodedMessage = encodeURIComponent(messageText);
            const waUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

            window.open(waUrl, '_blank');
        }
    });
}

// ==========================================================================
// 7. MODAL DE AVISO DE PRIVACIDADE (LGPD)
// ==========================================================================
function initPrivacyModal() {
    const openBtn = document.getElementById('openPrivacyModal');
    const modal = document.getElementById('pmPrivacyModal');
    const closeBtn = document.getElementById('closePrivacyModal');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}
