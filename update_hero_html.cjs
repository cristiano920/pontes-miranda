const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'C:/Users/crist/Documents/Projetos Hero SD/Pontes Miranda/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(htmlContent, {
    decodeEntities: false,
    recognizeSelfClosing: true,
});

// Create new Hero Grid
const newHeroGrid = `
<div class="hero-grid-main redesigned">
    <!-- Coluna Esquerda -->
    <div class="hero-text-col reveal-left">
        <div class="hero-badge">
            <i data-lucide="shield-check" class="hero-badge-icon"></i>
            <span>ADVOCACIA ESTRATÉGICA</span>
        </div>
        <h1 class="hero-headline">Estratégia jurídica para proteger pessoas, patrimônios, negócios e direitos.</h1>
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

        <div class="hero-photo-card">
            <img src="assets/foto_advogadas_studio_color.jpg" alt="Dra. Amanda Pontes e Dra. Jéssica Miranda" class="hero-photo-img">
        </div>

        <!-- Floating message -->
        <div class="hero-floating-message">
            <div class="floating-message-icon">
                <i data-lucide="shield" class="floating-shield"></i>
            </div>
            <p>Atuação ética, estratégica e comprometida com resultados.</p>
        </div>
    </div>
</div>
`;

// Create new Areas Bar
const newAreasBar = `
<div class="areas-floating-bar reveal stagger-2" id="areas">
    <div class="areas-bar-container">
        <div class="area-item title-item">
            <i data-lucide="scale"></i>
            <span>ÁREAS DE ATUAÇÃO</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="users"></i>
            <span>CÍVEL, FAMÍLIA E SUCESSÕES</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="briefcase"></i>
            <span>EMPRESARIAL E TRIBUTÁRIO</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="gavel"></i>
            <span>CRIMINAL E TRABALHISTA</span>
        </div>
        <div class="area-divider"></div>
        <div class="area-item">
            <i data-lucide="heart-pulse"></i>
            <span>DIREITO MÉDICO E SAÚDE</span>
        </div>
    </div>
</div>
`;

// Replace in DOM
$('.hero-grid-main').replaceWith(newHeroGrid);
$('.areas-floating-card').replaceWith(newAreasBar);

fs.writeFileSync(htmlPath, $.html(), 'utf8');
console.log('Hero Section HTML updated successfully.');
