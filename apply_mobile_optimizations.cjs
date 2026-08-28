const fs = require('fs');
const cheerio = require('cheerio');

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });

// Remove the desktop .btn-nav button from header-actions
$('.header-actions .btn-nav').remove();

fs.writeFileSync('index.html', $.html(), 'utf8');
console.log('HTML updated: top header button removed.');

// 2. UPDATE STYLES.CSS
let css = fs.readFileSync('styles.css', 'utf8');

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
    display: none !important; /* Removed as requested */
}

/* Hero Section Base (Desktop) */
.hero-section {
    background: #f4eee5;
    padding-top: 86px; /* 70px header offset + 16px top gap */
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

/* =========================================
   MOBILE MENU & MOBILE HERO OPTIMIZATIONS
   ========================================= */

/* Mobile Off-Canvas Nav Menu Override */
@media (max-width: 992px) {
    .nav-menu {
        position: fixed !important;
        top: 0 !important;
        right: -100% !important;
        width: 82% !important;
        max-width: 320px !important;
        height: 100vh !important;
        background: #0d0d0d !important; /* Dark theme so white text is crystal clear */
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

/* Mobile Hero Specific Layout & Ordering */
@media (max-width: 768px) {
    .hero-section {
        height: auto !important;
        max-height: none !important;
        min-height: auto !important;
        padding: 90px 0 30px !important;
    }

    .hero-section .hero-container {
        padding: 0 20px !important;
    }

    /* Flex Container for Mobile Ordering */
    .hero-grid-main.redesigned {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        gap: 16px !important;
    }

    /* Unbox .hero-text-col so its children order freely */
    .hero-text-col {
        display: contents !important;
    }

    /* Order 1: Headline (Smaller Font so words don't break 1 per line) */
    .hero-headline {
        order: 1 !important;
        font-size: 1.7rem !important;
        line-height: 1.25 !important;
        margin-bottom: 8px !important;
        text-align: center !important;
    }

    /* Order 2: Gold Divider */
    .hero-gold-divider {
        order: 2 !important;
        margin: 0 auto 12px auto !important;
    }

    /* Order 3: Photo of Advogadas right below headline */
    .hero-image-col {
        order: 3 !important;
        width: 100% !important;
        max-height: 360px !important;
        margin-bottom: 12px !important;
        justify-content: center !important;
    }

    .hero-photo-wrapper {
        max-height: 360px !important;
    }

    .hero-photo-img-clean {
        max-height: 360px !important;
    }

    /* Order 4: Text Description below Photo */
    .hero-text-support {
        order: 4 !important;
        font-size: 0.88rem !important;
        line-height: 1.55 !important;
        margin-bottom: 20px !important;
        text-align: center !important;
        max-width: 100% !important;
    }

    /* Order 5: Action Buttons */
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

    /* Floating Areas Bar Mobile */
    .areas-floating-bar {
        margin-top: 24px !important;
        padding: 16px 12px !important;
    }

    .areas-bar-container {
        flex-wrap: wrap !important;
        gap: 14px 8px !important;
        justify-content: center !important;
    }

    .area-divider {
        display: none !important;
    }

    .area-item {
        width: 30% !important;
    }

    .area-item span {
        font-size: 0.58rem !important;
    }
}

@media (max-width: 480px) {
    .hero-headline {
        font-size: 1.55rem !important;
    }
    .area-item {
        width: 45% !important;
    }
}
`;

fs.writeFileSync('styles.css', css + updatedCSS, 'utf8');
console.log('CSS updated with mobile menu fixes and mobile hero reordering.');
