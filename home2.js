import { supabase, saveLead } from './supabase.js';

// Expose Supabase client globally if needed
window.supabase = supabase;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ícones Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    initNavbar();
    initMobileMenu();
    initSpecialtyTabs();
    initFaqAccordion();
    initContactForm();
});

// 1. Navbar Sticky no Scroll
function initNavbar() {
    const header = document.querySelector('.pm-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 2. Menu Mobile Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('pmMobileToggle');
    const navMenu = document.getElementById('pmNavMenu');
    const navLinks = document.querySelectorAll('.pm-nav-link');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
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

// 3. Abas Interativas (Seção 4: Detalhamento dos Direitos)
function initSpecialtyTabs() {
    const tabButtons = document.querySelectorAll('.pm-tab-btn');
    const tabPanes = document.querySelectorAll('.pm-tab-pane');

    if (!tabButtons.length || !tabPanes.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// 4. FAQ Acordeão Inteligente
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.pm-faq-question');

    faqQuestions.forEach(questionBtn => {
        questionBtn.addEventListener('click', () => {
            const faqItem = questionBtn.closest('.pm-faq-item');
            const answer = faqItem.querySelector('.pm-faq-answer');
            const isOpen = faqItem.classList.contains('active');

            // Fechar todos os outros
            document.querySelectorAll('.pm-faq-item').forEach(item => {
                item.classList.remove('active');
                const ans = item.querySelector('.pm-faq-answer');
                if (ans) ans.style.maxHeight = '0px';
            });

            // Abrir o clicado caso não estivesse aberto
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// 5. Formulário de Contato e Envio para WhatsApp
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

        // Validação Serviço
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
                servico: service ? service.value : 'Negativa de Plano de Saúde',
                mensagem: message ? message.value.trim() : ''
            };

            // Salvar no Supabase
            saveLead(leadData).catch(err => console.error('Erro ao registrar no Supabase:', err));

            // Redirecionar ao WhatsApp
            const targetPhone = '5561991521044';
            let messageText = `Olá! Vim pelo site da Pontes Miranda e preciso de orientação jurídica para negativa do plano de saúde.\n\n`;
            messageText += `*DADOS DO CASO:*\n`;
            messageText += `• *Nome:* ${leadData.nome}\n`;
            messageText += `• *WhatsApp:* ${leadData.whatsapp}\n`;
            if (leadData.email !== 'Não informado') {
                messageText += `• *E-mail:* ${leadData.email}\n`;
            }
            messageText += `• *Tipo de Negativa:* ${leadData.servico}\n\n`;
            messageText += `*RESUMO DA SITUAÇÃO:*\n${leadData.mensagem}`;

            const encodedMessage = encodeURIComponent(messageText);
            const waUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

            window.open(waUrl, '_blank');
        }
    });
}
