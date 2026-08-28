const fs = require('fs');
const cheerio = require('cheerio');

// 1. UPDATE HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });

// Update Header CTA
$('.header-actions .btn-nav').html('<i data-lucide="calendar"></i>Falar com uma advogada');

// Construct New Hero Grid
const newHeroGrid = `
<div class="hero-grid-main redesigned">
    <!-- Coluna Esquerda -->
    <div class="hero-text-col reveal-left">
        <div class="hero-badge">
            <i data-lucide="shield-check" class="hero-badge-icon"></i>
            <span>ADVOCACIA ESTRATÉGICA</span>
        </div>
        <h1 class="hero-headline">Estratégia jurídica<br>para proteger pessoas,<br>patrimônios, negócios<br>e direitos.</h1>
        <p class="hero-text-support">Aliamos conhecimento técnico, visão estratégica e atendimento personalizado para oferecer assessoria jurídica segura, eficiente e orientada às necessidades de cada cliente.</p>
        
        <div class="hero-ctas-container">
            <a href="https://wa.me/5561982258072?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21" class="btn-whatsapp-hero" target="_blank" rel="noopener noreferrer">
                <i data-lucide="message-circle" class="cta-icon-whatsapp"></i>
                <span>FALAR COM UMA ADVOGADA</span>
            </a>
            
            <a href="#contato" class="btn-message-hero">
                <div class="cta-icon-box">
                    <i data-lucide="calendar" class="cta-icon-calendar"></i>
                </div>
                <div class="cta-text-box">
                    <span class="cta-title">AGENDAR ATENDIMENTO</span>
                    <span class="cta-subtitle">Atendimento online ou presencial</span>
                </div>
            </a>
        </div>
    </div>
    
    <!-- Coluna Direita -->
    <div class="hero-image-col reveal-right">
        <!-- Decoration element on right side -->
        <div class="hero-decor-lines">
            <div class="decor-line-v"></div>
            <div class="decor-line-v"></div>
            <div class="decor-line-v"></div>
            <div class="decor-badge">
                <span>PM</span>
            </div>
        </div>

        <img src="assets/foto_advogadas_studio_color.jpg" alt="Dra. Amanda Pontes e Dra. Jéssica Miranda" class="hero-photo-img-ref">

        <!-- Floating message -->
        <div class="hero-floating-message">
            <div class="floating-message-icon">
                <i data-lucide="shield" class="floating-shield"></i>
            </div>
            <p>Atuação ética,<br>estratégica e<br>comprometida<br>com resultados.</p>
        </div>
    </div>
</div>
`;

// Construct New Areas Bar (7 items)
const newAreasBar = `
<div class="areas-floating-bar reveal stagger-2" id="areas">
    <div class="areas-bar-container">
        <div class="area-item title-item">
            <i data-lucide="scale"></i>
            <span>ÁREAS DE<br>ATUAÇÃO</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="users"></i>
            <span>CÍVEL</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="building-2"></i>
            <span>FAMÍLIA E<br>SUCESSÕES</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="briefcase"></i>
            <span>EMPRESARIAL E<br>DIREITO MÉDICO</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="gavel"></i>
            <span>TRABALHISTA</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="shield-check"></i>
            <span>DIREITO DO<br>CONSUMIDOR</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="heart-pulse"></i>
            <span>DIREITO<br>DA SAÚDE</span>
        </div>
    </div>
</div>
`;

$('.hero-grid-main').replaceWith(newHeroGrid);
$('.areas-floating-bar').replaceWith(newAreasBar); // if it was already renamed
if ($('.areas-floating-card').length) {
    $('.areas-floating-card').replaceWith(newAreasBar);
}

fs.writeFileSync('index.html', $.html(), 'utf8');


// 2. UPDATE CSS
// First, read styles.css and remove the appended block
let css = fs.readFileSync('styles.css', 'utf8');

const sectionMarker = '/* =========================================\n   HERO REDESIGN (APPENDED)';
const sectionMarkerWindows = '/* =========================================\r\n   HERO REDESIGN (APPENDED)';

let index = css.indexOf(sectionMarker);
if (index === -1) {
    index = css.indexOf(sectionMarkerWindows);
}

if (index !== -1) {
    css = css.substring(0, index);
}

// Appended block with exact calculations for the first fold (< 740px total)
const newCSS = `/* =========================================
   HERO REDESIGN (APPENDED)
   ========================================= */

/* Header Override */
.header {
    background-color: #000 !important;
    border-bottom: none !important;
}
.nav-item { color: rgba(255,255,255,0.85) !important; }
.nav-item:hover { color: #fff !important; }
.btn-nav {
    background-color: #fff !important;
    color: #000 !important;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 8px; /* Slightly square like in image */
}
.btn-nav i { width: 16px; height: 16px; color: var(--gold-primary); }
.nav-logo { filter: none !important; } /* Ensure it shows properly */

/* Hero Section Base */
.hero-section {
    padding-top: calc(var(--header-height) + 20px);
    padding-bottom: 20px;
    background-color: #fdfbf7;
    min-height: calc(100vh - var(--header-height));
    max-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero-section .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.hero-grid-main.redesigned {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: stretch;
}

/* LEFT COLUMN */
.hero-text-col {
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 20px;
    width: fit-content;
    margin-bottom: 16px;
}
.hero-badge-icon {
    width: 14px;
    height: 14px;
    color: var(--gold-primary);
}
.hero-badge span {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--gold-primary);
    text-transform: uppercase;
}

.hero-headline {
    font-family: var(--font-heading);
    font-size: 3.4rem; /* Big but strict line height */
    font-weight: 500;
    color: #1a1a1a;
    line-height: 1.05;
    letter-spacing: -1px;
    margin-bottom: 16px;
}

.hero-text-support {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
    margin-bottom: 24px;
    max-width: 90%;
    font-weight: 400;
}

.hero-ctas-container {
    display: flex;
    align-items: center;
    gap: 12px;
}

.btn-whatsapp-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: var(--green-primary); /* Matching image green */
    color: white;
    padding: 12px 24px;
    border-radius: 40px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem;
    box-shadow: 0 10px 20px rgba(39, 174, 96, 0.2);
}
.cta-icon-whatsapp { width: 18px; height: 18px; }

.btn-message-hero {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background-color: white;
    padding: 6px 16px 6px 6px;
    border-radius: 40px;
    text-decoration: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
.cta-icon-box {
    width: 32px;
    height: 32px;
    background-color: #f5f5f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cta-icon-calendar { width: 16px; height: 16px; color: #333; }
.cta-text-box { display: flex; flex-direction: column; }
.cta-title { font-size: 0.7rem; font-weight: 700; color: #333; }
.cta-subtitle { font-size: 0.6rem; color: #888; }

/* RIGHT COLUMN */
.hero-image-col {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

/* Image acts as the card itself */
.hero-photo-img-ref {
    width: 100%;
    max-width: 440px;
    height: 440px;
    object-fit: cover;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    position: relative;
    z-index: 2;
}

/* Decor Lines */
.hero-decor-lines {
    position: absolute;
    right: 0px;
    top: 20%;
    height: 60%;
    display: flex;
    gap: 6px;
    z-index: 1;
}
.decor-line-v {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0));
}
.decor-badge {
    position: absolute;
    right: -25px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(212,175,55,0.4);
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}
.decor-badge span {
    font-family: var(--font-heading);
    color: var(--gold-primary);
    font-size: 1.1rem;
    font-style: italic;
    opacity: 0.8;
}

/* Floating Message */
.hero-floating-message {
    position: absolute;
    bottom: -15px;
    right: 15px;
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 10;
}
.floating-message-icon {
    width: 28px;
    height: 28px;
    background-color: #f5f0e6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.floating-shield { width: 14px; height: 14px; color: var(--gold-primary); }
.hero-floating-message p {
    font-size: 0.75rem;
    line-height: 1.5;
    color: #111;
    font-weight: 500;
}

/* BOTTOM BAR */
.areas-floating-bar {
    width: 100%;
    margin-top: 30px;
    background-color: #0a0a0a;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    padding: 16px 20px;
}
.areas-bar-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
}
.area-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex: 1;
}
.title-item {
    color: var(--gold-primary);
}
.area-item:not(.title-item) {
    color: #eee;
}
.area-item i { width: 22px; height: 22px; }
.area-item span {
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.3;
}
.area-divider {
    width: 1px;
    background-color: rgba(255,255,255,0.15);
    margin: 0 5px;
}

@media (max-width: 1024px) {
    .hero-grid-main.redesigned { grid-template-columns: 1fr; }
    .hero-text-col { align-items: center; text-align: center; padding: 0; }
    .hero-text-support { text-align: center; margin: 0 auto 24px auto; }
    .hero-ctas-container { justify-content: center; }
    .hero-image-col { justify-content: center; margin-top: 30px; }
    .areas-bar-container { flex-wrap: wrap; gap: 16px; justify-content: center; }
    .area-divider { display: none; }
    .area-item { width: 25%; }
}
`;

fs.writeFileSync('styles.css', css + newCSS, 'utf8');
console.log('Refactor script completed successfully.');
