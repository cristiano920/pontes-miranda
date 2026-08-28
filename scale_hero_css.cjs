const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Find the index of the appended section
const sectionMarker = '/* =========================================\n   HERO REDESIGN (APPENDED)';
const sectionMarkerWindows = '/* =========================================\r\n   HERO REDESIGN (APPENDED)';

let index = css.indexOf(sectionMarker);
if (index === -1) {
    index = css.indexOf(sectionMarkerWindows);
}

if (index !== -1) {
    css = css.substring(0, index);
}

const newHeroCSS = `/* =========================================
   HERO REDESIGN (APPENDED)
   ========================================= */

/* Hero Container Adjustment */
.hero-section {
    padding-top: calc(var(--header-height) + 20px);
    padding-bottom: 30px;
    background-color: #fdfbf7; /* Off-white premium */
}

/* Make content narrower for more whitespace */
.hero-section .hero-container {
    max-width: 1100px;
}

.hero-grid-main.redesigned {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
}

/* Left Column Styling */
.hero-text-col {
    padding-right: 20px;
}

/* Badge */
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background-color: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 20px;
    margin-bottom: 20px;
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

/* Headline */
.hero-headline {
    font-family: var(--font-heading);
    font-size: 3.2rem;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 16px;
}

/* Support Text */
.hero-text-support {
    font-family: var(--font-body);
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 32px;
    max-width: 95%;
    font-weight: 400;
}

/* CTAs Container */
.hero-ctas-container {
    display: flex;
    align-items: center;
    gap: 16px;
}

.btn-whatsapp-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: var(--green-primary);
    color: white;
    padding: 12px 24px;
    border-radius: 40px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(27, 50, 44, 0.15);
}

.btn-whatsapp-hero:hover {
    background-color: #142822;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(27, 50, 44, 0.25);
}

.cta-icon-whatsapp {
    width: 18px;
    height: 18px;
}

.btn-message-hero {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background-color: white;
    padding: 8px 16px 8px 8px;
    border-radius: 40px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.btn-message-hero:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
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

.cta-icon-calendar {
    width: 16px;
    height: 16px;
    color: #333;
}

.cta-text-box {
    display: flex;
    flex-direction: column;
}

.cta-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: #333;
    letter-spacing: 0.5px;
}

.cta-subtitle {
    font-size: 0.65rem;
    color: #777;
}

/* Right Column */
.hero-image-col {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

/* Photo Card Background (Arch / Rounded Rectangle) */
.hero-photo-card {
    background-color: #e6dfd3; /* Beige */
    border-radius: 40px; /* Highly rounded */
    padding: 30px 30px 0 30px;
    width: 100%;
    max-width: 380px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.4);
}

.hero-photo-img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
    display: block;
    box-shadow: 0 -8px 20px rgba(0,0,0,0.05);
}

/* Decorative Lines */
.hero-decor-lines {
    position: absolute;
    right: -10px;
    top: 15%;
    height: 50%;
    display: flex;
    gap: 8px;
    z-index: 1;
}

.decor-line-v {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0));
}

.decor-badge {
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(212,175,55,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}

.decor-badge span {
    font-family: var(--font-heading);
    color: var(--gold-primary);
    font-size: 1.1rem;
    font-style: italic;
    opacity: 0.6;
}

/* Floating Message */
.hero-floating-message {
    position: absolute;
    bottom: 20px;
    right: -20px;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 180px;
    z-index: 10;
}

.floating-message-icon {
    width: 32px;
    height: 32px;
    background-color: #f5f0e6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.floating-shield {
    width: 16px;
    height: 16px;
    color: var(--gold-primary);
}

.hero-floating-message p {
    font-size: 0.8rem;
    line-height: 1.4;
    color: #333;
    font-weight: 500;
}

/* Areas Floating Bar */
.areas-floating-bar {
    width: 100%;
    margin-top: 30px;
    background-color: #1a1a1a;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    padding: 16px 24px;
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
    gap: 8px;
    color: white;
    text-align: center;
    transition: transform 0.3s ease;
}

.area-item:hover {
    transform: translateY(-2px);
}

.title-item {
    color: var(--gold-primary);
}

.area-item i {
    width: 20px;
    height: 20px;
    opacity: 0.9;
}

.area-item span {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.area-divider {
    width: 1px;
    height: 30px;
    background-color: rgba(255,255,255,0.1);
}

/* Responsive adjustments for the new Hero */
@media (max-width: 1024px) {
    .hero-grid-main.redesigned {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-text-col {
        padding-right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .hero-text-support {
        text-align: center;
    }
    
    .hero-ctas-container {
        justify-content: center;
    }
    
    .hero-decor-lines {
        display: none;
    }
    
    .areas-bar-container {
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
    }
    
    .area-divider {
        display: none;
    }
    
    .area-item {
        width: 30%;
    }
}

@media (max-width: 768px) {
    .hero-headline {
        font-size: 2.2rem;
    }
    
    .hero-ctas-container {
        flex-direction: column;
        width: 100%;
    }
    
    .btn-whatsapp-hero, .btn-message-hero {
        width: 100%;
        justify-content: center;
    }
    
    .hero-floating-message {
        right: 0;
        bottom: 0;
    }
    
    .area-item {
        width: 45%;
    }
}
`;

fs.writeFileSync('styles.css', css + newHeroCSS, 'utf8');
console.log('Successfully scaled down the Hero Section CSS to fit in one fold.');
