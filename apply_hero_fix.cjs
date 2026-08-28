const fs = require('fs');
const cheerio = require('cheerio');

// 1. UPDATE HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });

// Remove hero badge
$('.hero-badge').remove();

fs.writeFileSync('index.html', $.html(), 'utf8');
console.log('HTML updated: hero badge removed.');

// 2. UPDATE CSS
let css = fs.readFileSync('styles.css', 'utf8');

const marker = 'HERO REDESIGN (APPENDED)';
const idx = css.indexOf(marker);
if (idx !== -1) {
    const blockStart = css.lastIndexOf('/*', idx);
    css = css.substring(0, blockStart);
}

const updatedCSS = `/* =========================================
   HERO REDESIGN (APPENDED)  — Fixed Header Offset & Clean Photo
   ========================================= */

/* Header Override */
.header {
    background-color: #050505 !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    height: 70px !important;
}
.header-container {
    height: 100% !important;
}
.nav-item { color: rgba(255,255,255,0.85) !important; font-size: 0.85rem !important; }
.nav-item:hover { color: #fff !important; }
.btn-nav {
    background-color: #ffffff !important;
    color: #111111 !important;
    font-weight: 600 !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 8px 18px !important;
    border-radius: 8px !important;
    font-size: 0.82rem !important;
    border: none !important;
}
.btn-nav i { width: 15px; height: 15px; color: #b8902a; }

/* Hero Section Base: padding-top: 86px ensures content is NEVER overlapped by the 70px fixed header */
.hero-section {
    background: #f4eee5;
    padding-top: 86px; /* 70px header offset + 16px gap below header */
    padding-bottom: 12px;
    min-height: 100vh;
    max-height: 720px;
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
}

.hero-section .hero-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

/* Grid: 52% / 48% */
.hero-grid-main.redesigned {
    display: grid;
    grid-template-columns: 52fr 48fr;
    gap: 20px;
    align-items: center;
    flex: 1;
}

/* Left Column */
.hero-text-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 20px;
}

.hero-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.85rem;
    font-weight: 500;
    color: #161616;
    line-height: 1.1;
    letter-spacing: -0.5px;
    margin: 0 0 14px 0;
}

.hero-headline .highlight-gold {
    color: #c59b4e;
    font-style: italic;
    font-weight: 400;
}

.hero-gold-divider {
    width: 35px;
    height: 2px;
    background-color: #c59b4e;
    margin-bottom: 14px;
    border-radius: 2px;
}

.hero-text-support {
    font-size: 0.86rem;
    color: #555555;
    line-height: 1.55;
    margin: 0 0 20px 0;
    max-width: 90%;
    font-weight: 400;
}

.hero-ctas-container {
    display: flex;
    align-items: center;
    gap: 12px;
}

/* Button 1: Dark Forest Green / Charcoal with Gold Icon */
.btn-whatsapp-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #1e2e28;
    color: #ffffff;
    height: 48px;
    padding: 0 26px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    white-space: nowrap;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(30, 46, 40, 0.25);
}
.btn-whatsapp-hero:hover {
    background-color: #15221d;
    transform: translateY(-1px);
}
.cta-icon-whatsapp {
    width: 18px;
    height: 18px;
    color: #c59b4e;
}

/* Button 2: Light Cream with Calendar Icon */
.btn-message-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: #eae1d3;
    border: 1px solid #dcd2c3;
    height: 48px;
    padding: 0 16px 0 8px;
    border-radius: 10px;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.25s ease;
}
.btn-message-hero:hover {
    background-color: #e2d7c7;
    transform: translateY(-1px);
}
.cta-icon-box {
    width: 32px;
    height: 32px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cta-icon-calendar { width: 16px; height: 16px; color: #333333; }
.cta-text-box { display: flex; flex-direction: column; gap: 1px; }
.cta-title {
    font-size: 0.66rem;
    font-weight: 700;
    color: #222222;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}
.cta-subtitle { font-size: 0.58rem; color: #666666; font-weight: 400; }

/* Right Column: Clean Photo Display without Header Overlap */
.hero-image-col {
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.hero-photo-wrapper {
    width: 100%;
    height: 100%;
    max-height: 440px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.hero-photo-img-clean {
    max-width: 100%;
    max-height: 440px;
    object-fit: contain;
    object-position: bottom center;
    filter: drop-shadow(0 10px 25px rgba(0,0,0,0.06));
}

/* Floating Areas Bar */
.areas-floating-bar {
    width: 100%;
    background-color: #0c0c0c;
    border-radius: 16px;
    margin-top: 10px;
    padding: 14px 20px;
    box-sizing: border-box;
}

.areas-bar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.area-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
}

.area-item i {
    color: #c59b4e !important;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

.title-item span {
    color: #c59b4e !important;
}

.area-item:not(.title-item) span {
    color: #ffffff;
}

.area-item span {
    font-size: 0.53rem;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.35;
}

.area-divider {
    width: 1px;
    height: 34px;
    background: rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
    margin: 0 4px;
}

/* Responsive */
@media (max-width: 1024px) {
    .hero-section { height: auto; max-height: none; padding: 90px 0 24px; }
    .hero-grid-main.redesigned { grid-template-columns: 1fr; gap: 24px; }
    .hero-text-col { align-items: center; text-align: center; padding-right: 0; }
    .hero-text-support { text-align: center; margin-inline: auto; }
    .hero-gold-divider { margin-inline: auto; }
    .hero-ctas-container { justify-content: center; flex-wrap: wrap; }
    .hero-image-col { justify-content: center; }
    .hero-photo-wrapper { max-height: 360px; }
    .areas-bar-container { flex-wrap: wrap; gap: 14px; justify-content: center; }
    .area-divider { display: none; }
    .area-item { width: 28%; }
}
`;

fs.writeFileSync('styles.css', css + updatedCSS, 'utf8');
console.log('CSS updated with fixed header offset and clean photo sizing.');
