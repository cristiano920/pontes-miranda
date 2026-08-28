const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Ensure overflow-x hidden on root
if (!css.includes('html, body { overflow-x: hidden')) {
    css = `html, body {\n    max-width: 100% !important;\n    overflow-x: hidden !important;\n}\n` + css;
}

const marker = 'HERO REDESIGN (APPENDED)';
const idx = css.indexOf(marker);
if (idx !== -1) {
    const blockStart = css.lastIndexOf('/*', idx);
    css = css.substring(0, blockStart);
}

const updatedCSS = `/* =========================================
   HERO REDESIGN (APPENDED)  — Mobile & Desktop Perfected
   ========================================= */

/* Header Base */
.header {
    background-color: #050505 !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    height: 70px !important;
}
.header-container {
    height: 100% !important;
}
.btn-nav {
    display: none !important;
}

/* Hero Section Base (Desktop) */
.hero-section {
    background: #f4eee5;
    padding-top: 86px;
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

/* Grid (Desktop: 52% / 48%) */
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

/* Buttons */
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

/* Right Column (Desktop) */
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

/* Floating Areas Bar (Desktop) */
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

/* =========================================
   MOBILE MENU & RESPONSIVE REFINEMENTS
   ========================================= */

@media (max-width: 992px) {
    .nav-menu {
        position: fixed !important;
        top: 0 !important;
        right: -100% !important;
        width: 82% !important;
        max-width: 320px !important;
        height: 100vh !important;
        background: #0d0d0d !important;
        border-left: 1px solid rgba(197, 155, 78, 0.3) !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 22px !important;
        padding: 40px 24px !important;
        transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        z-index: 1000 !important;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5) !important;
    }

    .nav-menu.active {
        right: 0 !important;
    }

    .nav-menu .nav-item {
        color: #ffffff !important;
        font-size: 1.05rem !important;
        font-weight: 500 !important;
        letter-spacing: 0.5px !important;
    }

    .nav-menu .nav-item:hover {
        color: #c59b4e !important;
    }

    .nav-btn-mobile {
        display: block !important;
        margin-top: 15px !important;
        width: 100% !important;
        text-align: center !important;
        padding: 14px 20px !important;
        background: #27ae60 !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        font-size: 0.82rem !important;
        border-radius: 40px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.8px !important;
        box-shadow: 0 6px 18px rgba(39, 174, 96, 0.3) !important;
        text-decoration: none !important;
    }
}

@media (max-width: 768px) {
    /* 1. HERO MOBILE ORDERING & SIZES */
    .hero-section {
        height: auto !important;
        max-height: none !important;
        min-height: auto !important;
        padding: 90px 0 30px !important;
    }

    .hero-section .hero-container {
        padding: 0 20px !important;
    }

    .hero-grid-main.redesigned {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        gap: 16px !important;
    }

    .hero-text-col {
        display: contents !important;
    }

    .hero-headline {
        order: 1 !important;
        font-size: 1.65rem !important;
        line-height: 1.25 !important;
        margin-bottom: 8px !important;
        text-align: center !important;
    }

    .hero-gold-divider {
        order: 2 !important;
        margin: 0 auto 12px auto !important;
    }

    .hero-image-col {
        order: 3 !important;
        width: 100% !important;
        max-height: 360px !important;
        margin-bottom: 12px !important;
        justify-content: center !important;
    }

    .hero-photo-wrapper, 
    .hero-photo-img-clean {
        max-height: 360px !important;
    }

    .hero-text-support {
        order: 4 !important;
        font-size: 0.88rem !important;
        line-height: 1.55 !important;
        margin-bottom: 20px !important;
        text-align: center !important;
        max-width: 100% !important;
    }

    .hero-ctas-container {
        order: 5 !important;
        flex-direction: column !important;
        width: 100% !important;
        gap: 12px !important;
    }

    .btn-whatsapp-hero, 
    .btn-message-hero {
        width: 100% !important;
        justify-content: center !important;
    }

    /* 2. ÁREAS DE ATUAÇÃO FLOATING BAR — MOBILE GRID (2 COLUMNS WITH TITLE SPAN) */
    .areas-floating-bar {
        margin-top: 20px !important;
        padding: 20px 16px !important;
        border-radius: 16px !important;
        background-color: #0c0c0c !important;
        width: 100% !important;
        box-sizing: border-box !important;
    }

    .areas-bar-container {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 14px 10px !important;
        width: 100% !important;
    }

    .area-item.title-item {
        grid-column: 1 / -1 !important;
        padding-bottom: 12px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
        margin-bottom: 4px !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 10px !important;
    }

    .area-item.title-item span {
        text-align: center !important;
        font-size: 0.75rem !important;
        letter-spacing: 1.2px !important;
    }

    .area-item:not(.title-item) {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        padding: 10px 6px !important;
        background: rgba(255, 255, 255, 0.03) !important;
        border-radius: 10px !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        min-height: 70px !important;
    }

    .area-item:not(.title-item) span {
        font-size: 0.6rem !important;
        line-height: 1.35 !important;
    }

    .area-divider {
        display: none !important;
    }

    /* 3. SEÇÃO NOSSO PROPÓSITO & CTA BUTTON MOBILE ADJUSTMENTS */
    .proposito-section {
        padding: 60px 0 !important;
    }

    .proposito-title {
        font-size: 1.4rem !important;
        line-height: 1.35 !important;
        margin-bottom: 20px !important;
        padding: 0 10px !important;
    }

    .proposito-text {
        font-size: 0.9rem !important;
        line-height: 1.6 !important;
    }

    .proposito-cta {
        width: 100% !important;
    }

    .btn-whatsapp-proposito {
        width: 100% !important;
        max-width: 100% !important;
        justify-content: center !important;
        padding: 16px 20px !important;
        font-size: 0.8rem !important;
        box-sizing: border-box !important;
        text-align: center !important;
    }

    /* 4. CONTATO SECTION & FORM OVERFLOW FIX (NO HORIZONTAL SCROLL) */
    .contato-section {
        padding: 50px 0 !important;
        overflow: hidden !important;
    }

    .contato-container {
        padding: 0 16px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    .contato-wrapper {
        display: flex !important;
        flex-direction: column !important;
        gap: 32px !important;
        padding: 28px 18px !important;
        border-radius: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        margin: 0 !important;
    }

    .contato-info-column, 
    .contato-form-column {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    .contato-heading {
        font-size: 1.65rem !important;
        line-height: 1.25 !important;
        text-align: center !important;
        margin-bottom: 14px !important;
    }

    .contato-desc {
        font-size: 0.88rem !important;
        line-height: 1.55 !important;
        text-align: center !important;
        margin-bottom: 24px !important;
    }

    .contato-details {
        gap: 18px !important;
    }

    .details-item {
        gap: 14px !important;
        align-items: flex-start !important;
    }

    .details-item p {
        word-break: break-word !important;
        font-size: 0.85rem !important;
    }

    .contact-form {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    .form-group {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    .form-group input, 
    .form-group select, 
    .form-group textarea {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        font-size: 0.9rem !important;
    }

    .form-row {
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        width: 100% !important;
    }

    .contact-form .btn-primary {
        width: 100% !important;
        box-sizing: border-box !important;
        font-size: 0.82rem !important;
        padding: 14px 16px !important;
        white-space: normal !important;
        text-align: center !important;
    }
}

@media (max-width: 480px) {
    .hero-headline {
        font-size: 1.55rem !important;
    }
}
`;

fs.writeFileSync('styles.css', css + updatedCSS, 'utf8');
console.log('Mobile refinements applied to styles.css');
