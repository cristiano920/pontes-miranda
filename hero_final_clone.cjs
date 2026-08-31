const fs = require('fs');
const cheerio = require('cheerio');

/* =============================================
   PARTE 1 — REWRITE DO HTML DA HERO SECTION
   ============================================= */

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });

// ── Restaurar header para o estado original (sem ícone de calendário injetado antes)
const btnNav = $('.header-actions .btn-nav');
btnNav.html('Falar com uma advogada');

// ── Novo HTML para o grid da hero
const newHeroGrid = `
<div class="hero-grid-main redesigned">
    <!-- Coluna Esquerda: 55% -->
    <div class="hero-text-col reveal-left">
        <div class="hero-badge">
            <i data-lucide="shield-check" class="hero-badge-icon"></i>
            <span>ADVOCACIA ESTRATÉGICA</span>
        </div>
        <h1 class="hero-headline">Estratégia jurídica<br>para proteger pessoas,<br>patrimônios, negócios<br>e direitos.</h1>
        <p class="hero-text-support">Aliamos conhecimento técnico, visão estratégica e atendimento personalizado para oferecer assessoria jurídica segura, eficiente e orientada às necessidades de cada cliente.</p>

        <div class="hero-ctas-container">
            <a href="https://wa.me/5561991521044?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21" class="btn-whatsapp-hero" target="_blank" rel="noopener noreferrer">
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

    <!-- Coluna Direita: 45% -->
    <div class="hero-image-col reveal-right">
        <!-- Linhas decorativas + monograma -->
        <div class="hero-decor-lines">
            <div class="decor-line-v"></div>
            <div class="decor-line-v"></div>
            <div class="decor-line-v"></div>
            <div class="decor-badge"><span>PM</span></div>
        </div>

        <!-- Card bege com foto -->
        <div class="hero-photo-card">
            <img src="assets/foto_advogadas_studio_color.jpg"
                 alt="Dra. Amanda Pontes e Dra. Jéssica Miranda – Pontes Miranda Advogadas"
                 class="hero-photo-img">
        </div>

        <!-- Card flutuante -->
        <div class="hero-floating-message">
            <div class="floating-message-icon">
                <i data-lucide="shield" class="floating-shield"></i>
            </div>
            <p>Atuação ética,<br>estratégica e<br>comprometida<br>com resultados.</p>
        </div>
    </div>
</div>
`;

// ── Novo HTML para a barra de áreas
const newAreasBar = `
<div class="areas-floating-bar" id="areas">
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
$('.areas-floating-bar').replaceWith(newAreasBar);

fs.writeFileSync('index.html', $.html(), 'utf8');
console.log('[1/2] HTML atualizado.');

/* =============================================
   PARTE 2 — REWRITE DO BLOCO CSS APPENDED
   ============================================= */

let css = fs.readFileSync('styles.css', 'utf8');

// Remove o bloco appended anterior (tudo a partir do marcador)
const marker = 'HERO REDESIGN (APPENDED)';
const idx = css.indexOf(marker);
if (idx !== -1) {
    // Recuar até o início do comentário /*
    const blockStart = css.lastIndexOf('/*', idx);
    css = css.substring(0, blockStart);
}

/* ─────────────────────────────────────────────
   CÁLCULO DE ALTURAS para 1366×768:
   Header         = 80px  (fixo)
   Espaço topo    = 12px
   Hero conteúdo  = 530px (badge+título+texto+btns | foto)
   Espaço inferior= 14px
   Barra áreas    = 120px (padding 16px top+bot, ícone 24, texto ~2 linhas)
   ─────────────────────────────────────────────
   Total          ≈ 756px  ✓ cabe em 768px
   ───────────────────────────────────────────── */

const newCSS = `/* =========================================
   HERO REDESIGN (APPENDED)  — v-final 1366×768
   ========================================= */

/* ── Hero Section ── */
.hero-section {
    background-color: #f8f4ee;     /* off-white quente exato da ref */
    padding-top: 12px;             /* respiro mínimo abaixo do header */
    padding-bottom: 14px;
    height: 530px;                 /* reserva exata para conteúdo */
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

/* ── Grid principal: 55% / 45% ── */
.hero-grid-main.redesigned {
    display: grid;
    grid-template-columns: 55fr 45fr;
    gap: 0;
    align-items: center;
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
    margin-bottom: 14px;
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

/* Título */
.hero-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3rem;
    font-weight: 500;
    color: #111;
    line-height: 1.08;
    letter-spacing: -0.5px;
    margin: 0 0 16px 0;
}

/* Texto de apoio */
.hero-text-support {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.55;
    margin: 0 0 22px 0;
    max-width: 88%;
    font-weight: 400;
}

/* CTAs */
.hero-ctas-container {
    display: flex;
    align-items: center;
    gap: 14px;
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
.cta-text-box {
    display: flex;
    flex-direction: column;
    gap: 1px;
}
.cta-title {
    font-size: 0.68rem;
    font-weight: 700;
    color: #222;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}
.cta-subtitle {
    font-size: 0.6rem;
    color: #888;
    font-weight: 400;
}

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

/* Card bege da foto */
.hero-photo-card {
    position: relative;
    width: 100%;
    max-width: 390px;
    height: 460px;              /* altura suficiente para mostrar cabeça+pés */
    background-color: #c9b99a; /* bege da referência */
    border-radius: 32px;
    overflow: hidden;
    z-index: 2;
    flex-shrink: 0;
}

/* Foto: object-fit contain para NÃO cortar pés nem cabeça */
.hero-photo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;         /* garante que a foto inteira apareça */
    object-position: center bottom;
    display: block;
}

/* Linhas decorativas douradas + círculo PM */
.hero-decor-lines {
    position: absolute;
    right: -10px;
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
    right: -34px;
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

/* Card flutuante inferior-direito */
.hero-floating-message {
    position: absolute;
    bottom: 10px;
    right: -10px;
    background: #fff;
    padding: 16px 18px;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10;
    min-width: 140px;
}
.floating-message-icon {
    width: 30px;
    height: 30px;
    background: #f5efdf;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.floating-shield { width: 14px; height: 14px; color: #b8902a; }
.hero-floating-message p {
    font-size: 0.78rem;
    font-weight: 600;
    color: #111;
    line-height: 1.45;
    margin: 0;
}

/* ════════════════════════════════════
   BARRA DE ÁREAS  ≈ 120px
   ════════════════════════════════════ */
.areas-floating-bar {
    width: 100%;
    background-color: #0a0a0a;
    border-radius: 14px;
    margin-top: 14px;
    padding: 16px 20px;
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
    gap: 7px;
    flex: 1;
    min-width: 0;
}

.title-item { color: #c9a84c; }
.title-item i { color: #c9a84c; }

.area-item:not(.title-item) { color: #eee; }
.area-item:not(.title-item) i { color: #c9a84c; }

.area-item i { width: 22px; height: 22px; flex-shrink: 0; }

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
    height: 40px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
    margin: 0 4px;
}

/* ════════════════════════════════════
   RESPONSIVO ≤ 1024px
   ════════════════════════════════════ */
@media (max-width: 1024px) {
    .hero-section { height: auto; padding: 30px 0 24px; }
    .hero-grid-main.redesigned {
        grid-template-columns: 1fr;
        gap: 32px;
    }
    .hero-text-col {
        align-items: center;
        text-align: center;
        padding-right: 0;
    }
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

fs.writeFileSync('styles.css', css + newCSS, 'utf8');
console.log('[2/2] CSS atualizado.');
console.log('Done!');
