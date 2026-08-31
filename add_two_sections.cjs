const fs = require('fs');
const cheerio = require('cheerio');

// 1. READ AND PARSE INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });

// Check if sections already exist to prevent duplicates
if ($('#fraude-bancaria').length === 0) {
    const sectionsHTML = `
        <!-- Seção 1: Fraude Bancária (Direito Bancário) -->
        <section id="fraude-bancaria" class="specialty-cta-section dark-theme-cta">
            <div class="container">
                <div class="specialty-card-wrapper reveal">
                    <div class="specialty-text-col">
                        <div class="specialty-badge">
                            <i data-lucide="shield-alert" class="badge-icon"></i>
                            <span>DIREITO BANCÁRIO & PROTEÇÃO PATRIMONIAL</span>
                        </div>
                        
                        <h2 class="specialty-title">Fui Vítima de Fraude ou Golpe Bancário</h2>
                        
                        <p class="specialty-description">
                            Se você sofreu com golpes do PIX, fraude do falso funcionário, empréstimos não contratados ou invasão de conta corrente, saiba que os bancos têm responsabilidade objetiva sobre a segurança das suas operações.
                        </p>
                        
                        <ul class="specialty-checklist">
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Recuperação de valores transferidos sob golpe ou coação</span>
                            </li>
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Cancelamento de empréstimos e cartões não solicitados</span>
                            </li>
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Medidas judiciais ágeis com pedido de tutela de urgência</span>
                            </li>
                        </ul>

                        <div class="specialty-cta-btn-wrapper">
                            <a href="https://wa.me/5561991521044?text=Ol%C3%A1%2C%20fui%20v%C3%ADtima%20de%20fraude%20banc%C3%A1ria%20e%20preciso%20de%20ajuda%20jur%C3%ADdica%21" 
                               class="btn-specialty-cta btn-dark-cta" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <i data-lucide="message-circle"></i>
                                <span>CLIQUE AQUI E FALE CONOSCO</span>
                            </a>
                        </div>
                    </div>

                    <div class="specialty-image-col">
                        <div class="specialty-image-frame">
                            <img src="assets/bank_fraud_law.jpg" alt="Proteção contra fraude bancária - Pontes Miranda Advogados" class="specialty-img">
                            <div class="image-overlay-badge">
                                <i data-lucide="lock"></i>
                                <span>Defesa dos seus Direitos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Seção 2: Tratamento Negado (Direito à Saúde) -->
        <section id="tratamento-negado" class="specialty-cta-section light-theme-cta">
            <div class="container">
                <div class="specialty-card-wrapper reverse-layout reveal">
                    <div class="specialty-image-col">
                        <div class="specialty-image-frame">
                            <img src="assets/health_law_denied.jpg" alt="Direito à Saúde e Liminares Médicas - Pontes Miranda Advogados" class="specialty-img">
                            <div class="image-overlay-badge gold-badge">
                                <i data-lucide="heart-pulse"></i>
                                <span>Liminar Médica Urgente</span>
                            </div>
                        </div>
                    </div>

                    <div class="specialty-text-col">
                        <div class="specialty-badge gold-style">
                            <i data-lucide="heart-handshake" class="badge-icon"></i>
                            <span>DIREITO À SAÚDE & TUTELA DE URGÊNCIA</span>
                        </div>
                        
                        <h2 class="specialty-title">Meu Tratamento ou Cirurgia Foi Negado</h2>
                        
                        <p class="specialty-description">
                            A negativa injustificada de exames, cirurgias, internações em UTI ou medicamentos de alto custo pelo plano de saúde ou SUS é ilegal. Atuamos com pedido de liminar na Justiça para liberar seu tratamento com máxima rapidez.
                        </p>
                        
                        <ul class="specialty-checklist">
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Ação com liminar judicial urgente para liberação imediata</span>
                            </li>
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Fornecimento de medicamentos de alto custo e oncologia</span>
                            </li>
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>Reversão de cancelamentos unilaterais e reajustes abusivos</span>
                            </li>
                        </ul>

                        <div class="specialty-cta-btn-wrapper">
                            <a href="https://wa.me/5561991521044?text=Ol%C3%A1%2C%20meu%20tratamento%20foi%20negado%20pelo%20plano%20de%20sa%C3%BAde%20e%20preciso%20de%20ajuda%20urgente%21" 
                               class="btn-specialty-cta btn-light-cta" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <i data-lucide="message-circle"></i>
                                <span>CLIQUE AQUI E FALE CONOSCO</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Insert right after #diferenciais
    $('#diferenciais').after(sectionsHTML);
    fs.writeFileSync('index.html', $.html(), 'utf8');
    console.log('Inserted 2 new specialty CTA sections into index.html');
}

// 2. APPEND CSS STYLES
let css = fs.readFileSync('styles.css', 'utf8');

if (!css.includes('/* SPECIALTY CTA SECTIONS */')) {
    const specialtyCSS = `

/* =========================================
   SPECIALTY CTA SECTIONS (Fraude & Saúde)
   ========================================= */

.specialty-cta-section {
    padding: 90px 0;
    position: relative;
    overflow: hidden;
}

/* Dark Theme CTA (Fraude Bancária) */
.dark-theme-cta {
    background-color: #121815; /* Charcoal Dark Green */
    color: #ffffff;
}

/* Light Theme CTA (Tratamento Negado) */
.light-theme-cta {
    background-color: #f7f2ea; /* Warm Cream */
    color: #1a1a1a;
}

.specialty-card-wrapper {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 50px;
    align-items: center;
}

.specialty-card-wrapper.reverse-layout {
    grid-template-columns: 0.9fr 1.1fr;
}

/* Text Column */
.specialty-text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.specialty-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 20px;
    background: rgba(197, 155, 78, 0.12);
    border: 1px solid rgba(197, 155, 78, 0.4);
    margin-bottom: 20px;
}

.specialty-badge.gold-style {
    background: rgba(184, 144, 42, 0.08);
    border-color: rgba(184, 144, 42, 0.35);
}

.badge-icon {
    width: 15px;
    height: 15px;
    color: #c59b4e;
}

.specialty-badge span {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #c59b4e;
    text-transform: uppercase;
}

.specialty-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.18;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
}

.dark-theme-cta .specialty-title { color: #ffffff; }
.light-theme-cta .specialty-title { color: #161616; }

.specialty-description {
    font-size: 1rem;
    line-height: 1.65;
    margin-bottom: 28px;
    font-weight: 400;
}

.dark-theme-cta .specialty-description { color: #b8c4bf; }
.light-theme-cta .specialty-description { color: #555555; }

/* Checklist */
.specialty-checklist {
    list-style: none;
    padding: 0;
    margin: 0 0 36px 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.specialty-checklist li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.94rem;
    font-weight: 500;
}

.dark-theme-cta .specialty-checklist li { color: #e2e8e5; }
.light-theme-cta .specialty-checklist li { color: #2c2c2c; }

.specialty-checklist li i {
    width: 20px;
    height: 20px;
    color: #c59b4e;
    flex-shrink: 0;
}

/* CTA Button */
.specialty-cta-btn-wrapper {
    width: 100%;
}

.btn-specialty-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 54px;
    padding: 0 34px;
    border-radius: 40px;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.btn-dark-cta {
    background-color: #27ae60;
    color: #ffffff;
}

.btn-dark-cta:hover {
    background-color: #219a52;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(39, 174, 96, 0.35);
}

.btn-light-cta {
    background-color: #1e2e28;
    color: #ffffff;
}

.btn-light-cta:hover {
    background-color: #15221d;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(30, 46, 40, 0.35);
}

.btn-specialty-cta i {
    width: 20px;
    height: 20px;
    color: #c59b4e;
}

/* Image Column & Frame */
.specialty-image-col {
    position: relative;
}

.specialty-image-frame {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0,0,0,0.2);
    border: 1px solid rgba(197, 155, 78, 0.2);
}

.specialty-img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.specialty-image-frame:hover .specialty-img {
    transform: scale(1.03);
}

/* Image Overlay Badge */
.image-overlay-badge {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(15, 20, 18, 0.88);
    backdrop-filter: blur(10px);
    padding: 10px 18px;
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(197, 155, 78, 0.3);
}

.image-overlay-badge.gold-badge {
    background: rgba(255, 255, 255, 0.92);
    border-color: rgba(184, 144, 42, 0.3);
}

.image-overlay-badge i {
    width: 16px;
    height: 16px;
    color: #c59b4e;
}

.image-overlay-badge span {
    font-size: 0.76rem;
    font-weight: 600;
    color: #ffffff;
}

.image-overlay-badge.gold-badge span {
    color: #1a1a1a;
}

/* Responsive */
@media (max-width: 1024px) {
    .specialty-cta-section { padding: 60px 0; }
    .specialty-card-wrapper,
    .specialty-card-wrapper.reverse-layout {
        grid-template-columns: 1fr;
        gap: 36px;
    }
    .specialty-text-col {
        align-items: center;
        text-align: center;
    }
    .specialty-title { font-size: 2rem; }
    .specialty-checklist li { text-align: left; }
    .specialty-img { height: 280px; }
}
`;
    fs.writeFileSync('styles.css', css + specialtyCSS, 'utf8');
    console.log('Appended CSS styles for specialty sections.');
}
