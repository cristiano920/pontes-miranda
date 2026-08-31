const fs = require('fs');

function genId() {
    return Math.random().toString(16).substring(2, 9);
}

function section(settings, columns) {
    return {
        id: genId(),
        elType: "section",
        isInner: false,
        settings: Object.assign({
            layout: "boxed",
            content_width: { unit: "px", size: "1200" }
        }, settings),
        elements: columns
    };
}

function column(width, widgets, settings = {}) {
    return {
        id: genId(),
        elType: "column",
        isInner: false,
        settings: Object.assign({
            _column_size: parseInt(width),
            _inline_size: parseInt(width)
        }, settings),
        elements: widgets
    };
}

function heading(title, tag = "h2", align = "left", color = "#161616", size = "36", font = "Playfair Display", settings = {}) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "heading",
        settings: Object.assign({
            title: title,
            header_size: tag,
            align: align,
            title_color: color,
            typography_typography: "custom",
            typography_font_family: font,
            typography_font_size: { unit: "px", size: String(size) },
            typography_line_height: { unit: "em", size: "1.15" }
        }, settings),
        elements: []
    };
}

function text(htmlContent, color = "#555555", size = "15", align = "left") {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "text-editor",
        settings: {
            editor: htmlContent,
            align: align,
            text_color: color,
            typography_typography: "custom",
            typography_font_size: { unit: "px", size: String(size) },
            typography_font_family: "Plus Jakarta Sans"
        },
        elements: []
    };
}

function image(url, align = "center") {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "image",
        settings: {
            image: { url: url, id: "" },
            image_size: "full",
            align: align
        },
        elements: []
    };
}

function button(label, url, bgColor = "#27ae60", textColor = "#ffffff", align = "left") {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "button",
        settings: {
            text: label,
            link: { url: url, is_external: "true", nofollow: "" },
            align: align,
            background_color: bgColor,
            button_text_color: textColor,
            border_radius: { unit: "px", top: "8", right: "8", bottom: "8", left: "8", isLinked: true },
            padding: { unit: "px", top: "14", right: "28", bottom: "14", left: "28", isLinked: false },
            typography_typography: "custom",
            typography_font_weight: "700",
            typography_font_size: { unit: "px", size: "13" }
        },
        elements: []
    };
}

function htmlWidget(code) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "html",
        settings: {
            html: code
        },
        elements: []
    };
}

// ----------------------------------------------------
// BUILD ALL SECTIONS OF THE LANDING PAGE
// ----------------------------------------------------
const sections = [];

// 0. GLOBAL CSS STYLES INJECTOR (Ensures perfect styling)
const globalStyleHeader = htmlWidget(`
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
.pm-gold { color: #c59b4e !important; }
.pm-gold-italic { color: #c59b4e !important; font-style: italic !important; }
.pm-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border: 1px solid rgba(197,155,78,0.5); border-radius: 20px; font-size: 11px; font-weight: 700; color: #b8902a; letter-spacing: 1px; text-transform: uppercase; background: rgba(197,155,78,0.06); margin-bottom: 12px; }
.pm-divider { width: 35px; height: 2px; background: #c59b4e; margin: 12px 0 16px 0; }
.pm-card-dark { background: #121815; color: #fff; padding: 45px; border-radius: 20px; border: 1px solid rgba(197,155,78,0.25); }
.pm-card-light { background: #f7f2ea; color: #161616; padding: 45px; border-radius: 20px; border: 1px solid rgba(197,155,78,0.2); }
.pm-check-list { list-style: none; padding: 0; margin: 20px 0 30px 0; }
.pm-check-list li { display: flex; align-items: center; gap: 10px; font-size: 15px; margin-bottom: 12px; }
.pm-check-list li span { color: #c59b4e; font-weight: bold; }
.pm-areas-bar { background: #0c0c0c; border-radius: 16px; padding: 18px 25px; color: #fff; width: 100%; }
.pm-areas-grid { display: flex; justify-content: space-between; align-items: center; text-align: center; }
.pm-area-item { flex: 1; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.pm-area-title { color: #c59b4e; }
.pm-form-box { background: #ffffff; padding: 35px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
.pm-input { width: 100%; padding: 12px 16px; margin-bottom: 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.pm-btn-block { width: 100%; padding: 14px; background: #25D366; color: #fff; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; font-size: 13px; text-align: center; display: block; text-decoration: none; }
</style>
`);

// HEADER SECTION (NAVBAR)
sections.push(section({
    background_background: "classic",
    background_color: "#050505",
    padding: { unit: "px", top: "15", right: "20", bottom: "15", left: "20", isLinked: false }
}, [
    column("30", [
        image("https://pontesmiranda.adv.br/assets/logo_prata.png", "left")
    ]),
    column("70", [
        htmlWidget(`
        <div style="display:flex; justify-content:flex-end; align-items:center; gap:25px; color:rgba(255,255,255,0.85); font-family:'Plus Jakarta Sans',sans-serif; font-size:14px;">
            <a href="#inicio" style="color:#fff; text-decoration:none;">Início</a>
            <a href="#diferenciais" style="color:#fff; text-decoration:none;">Diferenciais</a>
            <a href="#areas" style="color:#fff; text-decoration:none;">Áreas de Atuação</a>
            <a href="#sobre" style="color:#fff; text-decoration:none;">Quem Somos</a>
            <a href="#faq" style="color:#fff; text-decoration:none;">Dúvidas</a>
            <a href="https://wa.me/5561991521044" target="_blank" style="background:#ffffff; color:#111; padding:8px 18px; border-radius:8px; font-weight:600; text-decoration:none;">📅 Falar com uma advogada</a>
        </div>
        `)
    ])
]));

// 1. HERO SECTION
sections.push(section({
    background_background: "classic",
    background_color: "#F4EEE5",
    padding: { unit: "px", top: "50", right: "20", bottom: "30", left: "20", isLinked: false }
}, [
    column("52", [
        globalStyleHeader,
        heading("Estratégia jurídica<br>para proteger pessoas,<br>patrimônios, negócios<br>e <span class='pm-gold-italic'>direitos.</span>", "h1", "left", "#161616", "44"),
        htmlWidget("<div class='pm-divider'></div>"),
        text("Aliamos conhecimento técnico, visão estratégica e atendimento personalizado para oferecer assessoria jurídica segura, eficiente e orientada às necessidades de cada cliente.", "#555555", "15"),
        htmlWidget(`
        <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
            <a href="https://wa.me/5561991521044?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21" target="_blank" style="background:#1e2e28; color:#fff; padding:14px 24px; border-radius:10px; font-weight:700; font-size:12px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                💬 FALAR COM UMA ADVOGADA
            </a>
            <a href="#contato" style="background:#eae1d3; color:#222; border:1px solid #dcd2c3; padding:14px 20px; border-radius:10px; font-weight:700; font-size:12px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                📅 AGENDAR ATENDIMENTO
            </a>
        </div>
        `)
    ]),
    column("48", [
        image("https://pontesmiranda.adv.br/assets/foto_advogadas_studio_color.jpg", "center")
    ])
]));

// ÁREAS DE ATUAÇÃO BAR
sections.push(section({
    background_background: "classic",
    background_color: "#F4EEE5",
    padding: { unit: "px", top: "0", right: "20", bottom: "40", left: "20", isLinked: false }
}, [
    column("100", [
        htmlWidget(`
        <div class="pm-areas-bar">
            <div class="pm-areas-grid">
                <div class="pm-area-item pm-area-title">⚖️ ÁREAS DE<br>ATUAÇÃO</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">👥 CÍVEL</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">🏛️ FAMÍLIA E<br>SUCESSÕES</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">💼 EMPRESARIAL E<br>DIREITO MÉDICO</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">🔨 TRABALHISTA</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">🛡️ DIREITO DO<br>CONSUMIDOR</div>
                <div style="width:1px; height:30px; background:rgba(255,255,255,0.15);"></div>
                <div class="pm-area-item">❤️ DIREITO<br>DA SAÚDE</div>
            </div>
        </div>
        `)
    ])
]));

// 2. DIFERENCIAIS / PILARES
sections.push(section({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("100", [
        heading("POR QUE ESCOLHER A PONTES MIRANDA", "h5", "center", "#c59b4e", "12", "Plus Jakarta Sans"),
        heading("Pilares da nossa atuação jurídica", "h2", "center", "#161616", "36"),
        text("<p style='text-align:center; max-width:700px; margin:0 auto 50px auto;'>Acreditamos que a advocacia de excelência se constrói com conhecimento técnico, visão estratégica, ética profissional e compromisso com os interesses de cada cliente.</p>", "#555555", "16", "center")
    ])
]));

sections.push(section({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "0", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("33", [
        htmlWidget(`
        <div style="background:#fff; border:1px solid #eee; padding:30px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
            <div style="width:45px; height:45px; background:rgba(197,155,78,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:20px; margin-bottom:20px;">👤</div>
            <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:#161616; margin-bottom:12px;">Atendimento Personalizado</h3>
            <p style="color:#666; font-size:14px; line-height:1.6;">Valorizamos o relacionamento próximo com nossos clientes, oferecendo atendimento individualizado, comunicação transparente e estratégias jurídicas construídas para cada caso.</p>
        </div>
        `)
    ]),
    column("33", [
        htmlWidget(`
        <div style="background:#fff; border:1px solid #eee; padding:30px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
            <div style="width:45px; height:45px; background:rgba(197,155,78,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:20px; margin-bottom:20px;">👁️</div>
            <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:#161616; margin-bottom:12px;">Transparência</h3>
            <p style="color:#666; font-size:14px; line-height:1.6;">Acreditamos que a confiança se constrói por meio de uma comunicação transparente, orientações fundamentadas e acompanhamento próximo durante toda a condução da demanda.</p>
        </div>
        `)
    ]),
    column("33", [
        htmlWidget(`
        <div style="background:#fff; border:1px solid #eee; padding:30px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
            <div style="width:45px; height:45px; background:rgba(197,155,78,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:20px; margin-bottom:20px;">🌐</div>
            <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:#161616; margin-bottom:12px;">Atuação Nacional</h3>
            <p style="color:#666; font-size:14px; line-height:1.6;">Com experiência em demandas de diferentes regiões do país, oferecemos assessoria jurídica estratégica e representação em âmbito nacional, mantendo a proximidade e qualidade.</p>
        </div>
        `)
    ])
]));

// 3. FRAUDE BANCÁRIA
sections.push(section({
    background_background: "classic",
    background_color: "#121815",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("55", [
        htmlWidget("<div class='pm-badge'>🛡️ DIREITO BANCÁRIO</div>"),
        heading("Foi vítima de fraude ou golpe bancário?", "h2", "left", "#ffffff", "36"),
        text("Golpe do PIX, falsa central de atendimento, falso funcionário, empréstimo não contratado ou invasão de conta podem causar prejuízos significativos em poucos minutos.<br><br>Dependendo das circunstâncias da fraude e das falhas de segurança identificadas, é possível buscar judicialmente a recuperação dos valores e a proteção do seu patrimônio.", "#b8c4bf", "15"),
        htmlWidget(`
        <ul class="pm-check-list">
            <li><span>✓</span> Recuperação de valores em casos de fraude bancária</li>
            <li><span>✓</span> Contestação de empréstimos, cartões e operações não reconhecidas</li>
            <li><span>✓</span> Bloqueio ou suspensão de cobranças indevidas</li>
            <li><span>✓</span> Medidas judiciais urgentes para reduzir ou impedir novos prejuízos</li>
        </ul>
        `),
        button("CLIQUE AQUI E FALE CONOSCO", "https://wa.me/5561991521044?text=Ol%C3%A1%2C%20fui%20v%C3%ADtima%20de%20fraude%20banc%C3%A1ria%20e%20preciso%20de%20ajuda%20jur%C3%ADdica%21", "#27ae60", "#ffffff")
    ]),
    column("45", [
        image("https://pontes-miranda.vercel.app/assets/bank_fraud_law-o2Y4S3Nj.jpg")
    ])
]));

// 4. TRATAMENTO NEGADO
sections.push(section({
    background_background: "classic",
    background_color: "#F7F2EA",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("45", [
        image("https://pontes-miranda.vercel.app/assets/health_law_denied-BH4WrpfH.jpg")
    ]),
    column("55", [
        htmlWidget("<div class='pm-badge'>🩺 DIREITO À SAÚDE &amp; TUTELA DE URGÊNCIA</div>"),
        heading("Teve seu tratamento ou cirurgia negados?", "h2", "left", "#161616", "36"),
        text("Se o plano de saúde ou o SUS negou cirurgia, medicamento, tratamento, exame ou internação, uma medida judicial urgente pode ser necessária para garantir o acesso à assistência indicada pelo seu médico.<br><br>Atuamos em casos de negativas de cobertura e situações que não podem esperar.", "#555555", "15"),
        htmlWidget(`
        <ul class="pm-check-list">
            <li style="color:#161616;"><span style="color:#c59b4e;">✓</span> Liminar para liberação urgente de cirurgias e tratamentos</li>
            <li style="color:#161616;"><span style="color:#c59b4e;">✓</span> Medicamentos de alto custo e tratamentos oncológicos</li>
            <li style="color:#161616;"><span style="color:#c59b4e;">✓</span> Internações, exames e procedimentos negados</li>
        </ul>
        `),
        button("CLIQUE AQUI E FALE CONOSCO", "https://wa.me/5561991521044?text=Ol%C3%A1%2C%20meu%20tratamento%20foi%20negado%20pelo%20plano%20de%20sa%C3%BAde%20e%20preciso%20de%20ajuda%20urgente%21", "#1e2e28", "#ffffff")
    ])
]));

// 5. NOSSO PROPÓSITO
sections.push(section({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("100", [
        heading("NOSSO PROPÓSITO", "h5", "center", "#c59b4e", "12", "Plus Jakarta Sans"),
        heading("Promover segurança jurídica por meio de uma advocacia estratégica, ética e comprometida com resultados.", "h2", "center", "#161616", "32"),
        text("<p style='text-align:center; max-width:800px; margin:20px auto 40px auto; color:#555;'>No Pontes Miranda Advogados, compreendemos que cada demanda envolve muito mais do que questões jurídicas. Envolve patrimônio, negócios, relações, reputação e decisões que podem produzir reflexos duradouros na vida de nossos clientes.</p>", "#555555", "16", "center"),
        button("FALAR COM UMA ADVOGADA", "https://wa.me/5561991521044?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21", "#27ae60", "#ffffff", "center")
    ])
]));

// 6. QUEM SOMOS / SÓCIAS
sections.push(section({
    background_background: "classic",
    background_color: "#F9F9F9",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("40", [
        image("https://pontesmiranda.adv.br/assets/foto_amanda_jessica_sofa.jpg")
    ]),
    column("60", [
        heading("SÓCIAS FUNDADORAS", "h5", "left", "#c59b4e", "12", "Plus Jakarta Sans"),
        heading("Experiência, estratégia e atuação personalizada.", "h2", "left", "#161616", "34"),
        text("<p style='color:#555; margin-bottom:25px;'>O Pontes Miranda Advogados foi idealizado e é conduzido por Amanda Pontes e Jéssica Miranda, advogadas que compartilham a convicção de que a excelência jurídica se constrói por meio da técnica, da estratégia e da proximidade com cada cliente.</p>"),
        htmlWidget(`
        <div style="background:#fff; padding:25px; border-radius:10px; border:1px solid #eee; margin-bottom:15px;">
            <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:#161616; margin-bottom:4px;">Drª Amanda Pontes - OAB/DF 65307</h3>
            <p style="color:#c59b4e; font-size:12px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">Sócia Fundadora</p>
            <p style="color:#666; font-size:13px; line-height:1.6;">Advogada com atuação nas áreas de Direito Empresarial, Direito Tributário, Direito Civil e Direito de Família. Desenvolve assessoria jurídica consultiva e contenciosa com foco na prevenção de riscos e soluções estratégicas.</p>
        </div>
        <div style="background:#fff; padding:25px; border-radius:10px; border:1px solid #eee;">
            <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:#161616; margin-bottom:4px;">Drª Jéssica Miranda - OAB/DF 60395</h3>
            <p style="color:#c59b4e; font-size:12px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">Sócia Fundadora</p>
            <p style="color:#666; font-size:13px; line-height:1.6;">Advogada com atuação nas áreas de Direito Empresarial, Direito Administrativo, Direito Médico, Direito Penal Empresarial e Contencioso Estratégico.</p>
        </div>
        `)
    ])
]));

// 7. FORMULÁRIO DE CONTATO
sections.push(section({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("45", [
        heading("CONTATO", "h5", "left", "#c59b4e", "12", "Plus Jakarta Sans"),
        heading("Deseja falar com uma de nossas advogadas?", "h2", "left", "#161616", "32"),
        text("<p style='color:#555; margin-bottom:30px;'>Preencha o formulário ao lado com as informações básicas do seu caso. Você será direcionado imediatamente ao nosso WhatsApp comercial para iniciar o atendimento.</p>"),
        htmlWidget(`
        <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; gap:15px; align-items:center;">
                <div style="width:40px; height:40px; background:#f5f0e6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:18px;">📞</div>
                <div><strong style="display:block; font-size:14px;">Telefone / WhatsApp</strong><span style="font-size:13px; color:#666;">(61) 99152-1044</span></div>
            </div>
            <div style="display:flex; gap:15px; align-items:center;">
                <div style="width:40px; height:40px; background:#f5f0e6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:18px;">✉️</div>
                <div><strong style="display:block; font-size:14px;">E-mail Oficial</strong><span style="font-size:13px; color:#666;">contato@pontesmiranda.adv.br</span></div>
            </div>
            <div style="display:flex; gap:15px; align-items:center;">
                <div style="width:40px; height:40px; background:#f5f0e6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#c59b4e; font-size:18px;">📍</div>
                <div><strong style="display:block; font-size:14px;">Localização</strong><span style="font-size:13px; color:#666;">Brasília - DF | Atendimento Digital Nacional</span></div>
            </div>
        </div>
        `)
    ]),
    column("55", [
        htmlWidget(`
        <div class="pm-form-box">
            <h3 style="font-family:'Playfair Display',serif; font-size:22px; margin-bottom:20px; color:#161616;">Fale Conosco via WhatsApp</h3>
            <form action="https://wa.me/5561991521044" target="_blank">
                <input type="text" class="pm-input" placeholder="Seu Nome Completo *" required>
                <input type="tel" class="pm-input" placeholder="WhatsApp com DDD *" required>
                <select class="pm-input" required>
                    <option value="" disabled selected>Selecione a área de interesse</option>
                    <option>Direito Cível</option>
                    <option>Família e Sucessões</option>
                    <option>Empresarial / Tributário</option>
                    <option>Fraude Bancária</option>
                    <option>Direito à Saúde (Tratamento Negado)</option>
                    <option>Trabalhista / Outros</option>
                </select>
                <textarea class="pm-input" rows="3" placeholder="Resumo breve da sua necessidade..." required></textarea>
                <button type="submit" class="pm-btn-block">💬 Iniciar Atendimento via WhatsApp</button>
            </form>
        </div>
        `)
    ])
]));

// 8. FAQ ACCORDION
sections.push(section({
    background_background: "classic",
    background_color: "#F9F9F9",
    padding: { unit: "px", top: "70", right: "20", bottom: "70", left: "20", isLinked: false }
}, [
    column("100", [
        heading("PERGUNTAS FREQUENTES", "h5", "center", "#c59b4e", "12", "Plus Jakarta Sans"),
        heading("Respostas para suas principais dúvidas", "h2", "center", "#161616", "36"),
        text("<p style='text-align:center; max-width:700px; margin:0 auto 40px auto; color:#555;'>Entenda de forma clara como funciona o nosso suporte e atendimento jurídico.</p>", "#555555", "16", "center"),
        htmlWidget(`
        <div style="max-width:850px; margin:0 auto; font-family:'Plus Jakarta Sans',sans-serif;">
            <details style="background:#fff; padding:18px 22px; margin-bottom:12px; border-radius:8px; border:1px solid #eee; box-shadow:0 4px 12px rgba(0,0,0,0.02);">
                <summary style="font-weight:600; font-size:16px; cursor:pointer; color:#161616;">Como funciona o atendimento jurídico à distância (online)?</summary>
                <p style="margin-top:12px; color:#555; font-size:14px; line-height:1.6;">O Pontes Miranda Advogados presta atendimento jurídico remoto por videoconferência com o mesmo padrão de excelência, proximidade e segurança dos atendimentos presenciais.</p>
            </details>
            <details style="background:#fff; padding:18px 22px; margin-bottom:12px; border-radius:8px; border:1px solid #eee; box-shadow:0 4px 12px rgba(0,0,0,0.02);">
                <summary style="font-weight:600; font-size:16px; cursor:pointer; color:#161616;">Como serei informado sobre o andamento do meu processo?</summary>
                <p style="margin-top:12px; color:#555; font-size:14px; line-height:1.6;">A comunicação é pautada pela transparência. Mantemos atualizações periódicas com os atos mais relevantes de cada processo.</p>
            </details>
            <details style="background:#fff; padding:18px 22px; margin-bottom:12px; border-radius:8px; border:1px solid #eee; box-shadow:0 4px 12px rgba(0,0,0,0.02);">
                <summary style="font-weight:600; font-size:16px; cursor:pointer; color:#161616;">Quais documentos são necessários para a primeira consulta?</summary>
                <p style="margin-top:12px; color:#555; font-size:14px; line-height:1.6;">Documento oficial de identificação, comprovante de residência e contratos ou documentos específicos relacionados à sua demanda.</p>
            </details>
            <details style="background:#fff; padding:18px 22px; margin-bottom:12px; border-radius:8px; border:1px solid #eee; box-shadow:0 4px 12px rgba(0,0,0,0.02);">
                <summary style="font-weight:600; font-size:16px; cursor:pointer; color:#161616;">Quanto custa uma consulta ou a contratação dos serviços jurídicos?</summary>
                <p style="margin-top:12px; color:#555; font-size:14px; line-height:1.6;">Os honorários são definidos de forma individualizada com transparência e clareza de acordo com a complexidade do caso.</p>
            </details>
        </div>
        `)
    ])
]));

// FOOTER SECTION
sections.push(section({
    background_background: "classic",
    background_color: "#080808",
    padding: { unit: "px", top: "50", right: "20", bottom: "30", left: "20", isLinked: false }
}, [
    column("100", [
        htmlWidget(`
        <div style="color:#aaa; font-family:'Plus Jakarta Sans',sans-serif; text-align:center; font-size:13px;">
            <img src="https://pontesmiranda.adv.br/assets/logo_prata.png" style="height:45px; margin:0 auto 15px auto; display:block;">
            <p style="margin-bottom:20px; color:#888;">© 2026 Pontes Miranda Advogados. Todos os direitos reservados.<br>Drª Amanda Pontes – OAB/DF 65.307 | Drª Jéssica Miranda – OAB/DF 60.395</p>
        </div>
        `)
    ])
]));

// FULL ELEMENTOR EXPORT STRUCTURE
const elementorTemplate = {
    version: "0.4",
    title: "Pontes Miranda Advogados - Landing Page Completa",
    type: "page",
    page_settings: {
        template: "elementor_canvas"
    },
    content: sections
};

fs.writeFileSync('elementor_template_pontes_miranda.json', JSON.stringify(elementorTemplate, null, 2), 'utf8');
if (!fs.existsSync('public')) fs.mkdirSync('public');
fs.writeFileSync('public/elementor_template_pontes_miranda.json', JSON.stringify(elementorTemplate, null, 2), 'utf8');

console.log('Native Elementor JSON Template generated successfully with all 9 sections.');
