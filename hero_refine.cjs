const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Remove bloco appended anterior
const marker = 'HERO REDESIGN (APPENDED)';
const idx = css.indexOf(marker);
if (idx !== -1) {
    const blockStart = css.lastIndexOf('/*', idx);
    css = css.substring(0, blockStart);
}

const refinedCSS = `/* =========================================
   HERO REDESIGN (APPENDED)  — refinamento fino
   ========================================= */

/* ── Hero Section ── */
.hero-section {
    background-color: #f8f4ee;
    padding-top: 0px;             /* #1: subir conteúdo — tirar espaço topo */
    padding-bottom: 14px;
    height: 540px;
    display: flex;
    align-items: center;
    overflow: visible;
}

.hero-section .hero-container {
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: relative;
}

/* ── Grid: 55% / 45% ── */
.hero-grid-main.redesigned {
    display: grid;
    grid-template-columns: 55fr 45fr;
    gap: 0;
    align-items: center;   /* #2: colunas centralizadas verticalmente */
    height: 100%;
}

/* ════════════════════════════════════
   COLUNA ESQUERDA
   ════════════════════════════════════ */
.hero-text-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 32px;
    gap: 0;
}

/* Badge */
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border: 1px solid rgba(195, 155, 80, 0.45);
    border-radius: 20px;
    width: fit-content;
    margin-bottom: 10px;       /* #7: compactar bloco interno */
    background: transparent;
}
.hero-badge-icon {
    width: 13px;
    height: 13px;
    color: #b8902a;
    flex-shrink: 0;
}
.hero-badge span {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #b8902a;
    text-transform: uppercase;
}

/* Título — #3: ~9% menor (3rem → 2.73rem) */
.hero-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.73rem;
    font-weight: 500;
    color: #111;
    line-height: 1.08;
    letter-spacing: -0.5px;
    margin: 0 0 12px 0;        /* #7: menos espaço abaixo do título */
}

/* Texto de apoio */
.hero-text-support {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.55;
    margin: 0 0 18px 0;        /* #7: menos espaço abaixo do texto */
    max-width: 88%;
    font-weight: 400;
}

/* CTAs */
.hero-ctas-container {
    display: flex;
    align-items: center;
    gap: 10px;                 /* #8: gap levemente menor entre botões */
    flex-wrap: nowrap;
}

/* Botão WhatsApp verde */
.btn-whatsapp-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #27ae60;
    color: #fff;
    height: 48px;
    padding: 0 28px;
    border-radius: 40px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    white-space: nowrap;
    transition: background 0.25s ease, transform 0.2s ease;
    box-shadow: 0 6px 18px rgba(39, 174, 96, 0.28);
}
.btn-whatsapp-hero:hover {
    background-color: #219a52;
    transform: translateY(-1px);
}
.cta-icon-whatsapp {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

/* Botão Agendar */
.btn-message-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: #fff;
    height: 48px;
    padding: 0 18px 0 8px;
    border-radius: 40px;
    text-decoration: none;
    white-space: nowrap;
    transition: box-shadow 0.25s ease, transform 0.2s ease;
    box-shadow: 0 4px 14px rgba(0,0,0,0.07);
}
.btn-message-hero:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
.cta-icon-box {
    width: 34px;
    height: 34px;
    background-color: #f0ece4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.cta-icon-calendar { width: 15px; height: 15px; color: #333; }
.cta-text-box { display: flex; flex-direction: column; gap: 1px; }
.cta-title {
    font-size: 0.68rem;
    font-weight: 700;
    color: #222;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}
.cta-subtitle { font-size: 0.6rem; color: #888; font-weight: 400; }

/* ════════════════════════════════════
   COLUNA DIREITA
   ════════════════════════════════════ */
.hero-image-col {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

/* #4: Card bege da foto — 8% maior (460 → 497px ≈ 500px) */
.hero-photo-card {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 500px;
    background-color: #c9b99a;
    border-radius: 32px;
    overflow: hidden;
    z-index: 2;
    flex-shrink: 0;
}

/* Foto: object-fit contain — pés e cabeça sempre visíveis */
.hero-photo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    display: block;
}

/* #6: Linhas douradas mais próximas da foto (right: -5px em vez de -10px) */
.hero-decor-lines {
    position: absolute;
    right: -5px;               /* mais próximo do card */
    top: 50%;
    transform: translateY(-50%);
    height: 55%;
    display: flex;
    align-items: stretch;
    gap: 6px;
    z-index: 1;
}
.decor-line-v {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom,
        rgba(195,155,80,0) 0%,
        rgba(195,155,80,0.5) 40%,
        rgba(195,155,80,0.5) 60%,
        rgba(195,155,80,0) 100%);
}
.decor-badge {
    position: absolute;
    right: -28px;              /* #6: mais próximo (era -34px) */
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(195,155,80,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
}
.decor-badge span {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: #b8902a;
    font-size: 0.95rem;
    opacity: 0.85;
}

/* #5: Card flutuante — 10% menor (era ~140px largura / 16px padding) */
.hero-floating-message {
    position: absolute;
    bottom: 10px;
    right: -10px;
    background: #fff;
    padding: 13px 15px;        /* reduzido ~10% */
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 10;
    min-width: 126px;          /* 10% menor que 140px */
    max-width: 126px;
}
.floating-message-icon {
    width: 27px;               /* 10% menor que 30px */
    height: 27px;
    background: #f5efdf;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.floating-shield { width: 13px; height: 13px; color: #b8902a; }
.hero-floating-message p {
    font-size: 0.72rem;        /* levemente menor */
    font-weight: 600;
    color: #111;
    line-height: 1.45;
    margin: 0;
}

/* ════════════════════════════════════
   BARRA DE ÁREAS — #9: ~17px menos de altura
   ════════════════════════════════════ */
.areas-floating-bar {
    width: 100%;
    background-color: #0a0a0a;
    border-radius: 14px;
    margin-top: 14px;
    padding: 8px 20px;         /* era 16px → agora 8px: reduz ~16px de altura total */
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
    gap: 5px;                  /* era 7px */
    flex: 1;
    min-width: 0;
}

.title-item { color: #c9a84c; }
.title-item i { color: #c9a84c; }
.area-item:not(.title-item) { color: #eee; }
.area-item:not(.title-item) i { color: #c9a84c; }
.area-item i { width: 20px; height: 20px; flex-shrink: 0; }

.area-item span {
    font-size: 0.52rem;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.4;
}

.area-divider {
    width: 1px;
    height: 36px;              /* era 40px */
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
    margin: 0 4px;
}

/* ════════════════════════════════════
   RESPONSIVO ≤ 1024px
   ════════════════════════════════════ */
@media (max-width: 1024px) {
    .hero-section { height: auto; padding: 30px 0 24px; }
    .hero-grid-main.redesigned { grid-template-columns: 1fr; gap: 32px; }
    .hero-text-col { align-items: center; text-align: center; padding-right: 0; }
    .hero-text-support { text-align: center; margin-inline: auto; }
    .hero-badge { margin-inline: auto; }
    .hero-ctas-container { justify-content: center; flex-wrap: wrap; }
    .hero-image-col { justify-content: center; }
    .hero-photo-card { max-width: 340px; height: 400px; }
    .hero-decor-lines { display: none; }
    .areas-bar-container { flex-wrap: wrap; gap: 16px; justify-content: center; }
    .area-divider { display: none; }
    .area-item { width: 28%; }
}
`;

fs.writeFileSync('styles.css', css + refinedCSS, 'utf8');
console.log('Refinamento fino aplicado com sucesso.');
