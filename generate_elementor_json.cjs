const fs = require('fs');

function genId() {
    return Math.random().toString(16).substring(2, 9);
}

function createSection(settings = {}, columns = []) {
    return {
        id: genId(),
        elType: "section",
        isInner: false,
        settings: settings,
        elements: columns
    };
}

function createColumn(width = "100", widgets = [], settings = {}) {
    return {
        id: genId(),
        elType: "column",
        isInner: false,
        settings: Object.assign({ _column_size: width, _inline_size: width }, settings),
        elements: widgets
    };
}

function createHeading(title, tag = "h2", size = "", settings = {}) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "heading",
        settings: Object.assign({
            title: title,
            header_size: tag,
            align: size || "left"
        }, settings),
        elements: []
    };
}

function createText(content, settings = {}) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "text-editor",
        settings: Object.assign({
            editor: content
        }, settings),
        elements: []
    };
}

function createButton(text, link, icon = "fa fa-whatsapp", settings = {}) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "button",
        settings: Object.assign({
            text: text,
            link: { url: link, is_external: "true", nofollow: "" },
            selected_icon: { value: icon, library: "fa-solid" },
            align: "center"
        }, settings),
        elements: []
    };
}

function createImage(url, settings = {}) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "image",
        settings: Object.assign({
            image: { url: url, id: "" },
            image_size: "full"
        }, settings),
        elements: []
    };
}

function createHtmlWidget(htmlContent) {
    return {
        id: genId(),
        elType: "widget",
        isInner: false,
        widgetType: "html",
        settings: {
            html: htmlContent
        },
        elements: []
    };
}

// BUILD ELEMENTOR CONTENT ARRAY
const content = [];

// 1. HERO SECTION
const heroSection = createSection({
    background_background: "classic",
    background_color: "#F4EEE5",
    padding: { unit: "px", top: "40", right: "20", bottom: "40", left: "20", isLinked: false }
}, [
    createColumn("50", [
        createHeading("Estratégia jurídica para proteger pessoas, patrimônios, negócios e <i style='color:#C59B4E;'>direitos.</i>", "h1", "left", {
            title_color: "#161616",
            typography_typography: "custom",
            typography_font_family: "Playfair Display",
            typography_font_size: { unit: "px", size: "42" },
            typography_line_height: { unit: "em", size: "1.1" }
        }),
        createText("<hr style='width:40px; height:3px; background-color:#C59B4E; border:none; margin:15px 0;'>"),
        createText("<p style='font-size:16px; color:#555; line-height:1.6;'>Aliamos conhecimento técnico, visão estratégica e atendimento personalizado para oferecer assessoria jurídica segura, eficiente e orientada às necessidades de cada cliente.</p>"),
        createButton("FALAR COM UMA ADVOGADA", "https://wa.me/5561982258072?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21", "fab fa-whatsapp", {
            button_type: "success",
            background_color: "#1E2E28",
            button_text_color: "#FFFFFF",
            border_radius: { unit: "px", top: "8", right: "8", bottom: "8", left: "8" }
        })
    ]),
    createColumn("50", [
        createImage("https://pontesmiranda.adv.br/assets/foto_advogadas_studio_color.jpg", {
            align: "center"
        })
    ])
]);
content.push(heroSection);

// 2. ÁREAS DE ATUAÇÃO BAR
const areasSection = createSection({
    background_background: "classic",
    background_color: "#0C0C0C",
    padding: { unit: "px", top: "20", right: "20", bottom: "20", left: "20", isLinked: false }
}, [
    createColumn("100", [
        createText(`
        <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; color:#fff; text-align:center;">
            <div style="padding:10px;"><strong style="color:#C59B4E;">⚖️ ÁREAS DE ATUAÇÃO</strong></div>
            <div style="padding:10px;">👥 CÍVEL</div>
            <div style="padding:10px;">🏛️ FAMÍLIA E SUCESSÕES</div>
            <div style="padding:10px;">💼 EMPRESARIAL & MÉDICO</div>
            <div style="padding:10px;">🔨 TRABALHISTA</div>
            <div style="padding:10px;">🛡️ CONSUMIDOR</div>
            <div style="padding:10px;">❤️ SAÚDE</div>
        </div>
        `)
    ])
]);
content.push(areasSection);

// 3. PILARES / DIFERENCIAIS
const diferenciaisSection = createSection({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("100", [
        createHeading("Por Que Escolher A Pontes Miranda", "h4", "center", { title_color: "#C59B4E" }),
        createHeading("Pilares da nossa atuação jurídica", "h2", "center", { title_color: "#161616" }),
        createText("<p style='text-align:center; max-width:700px; margin:0 auto 40px auto; color:#666;'>Acreditamos que a advocacia de excelência se constrói com conhecimento técnico, visão estratégica, ética profissional e compromisso com os interesses de cada cliente.</p>")
    ])
]);
content.push(diferenciaisSection);

// 3 Cards Diferenciais
const cardsSection = createSection({
    padding: { unit: "px", top: "0", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("33", [
        createHeading("👤 Atendimento Personalizado", "h3", "left"),
        createText("Valorizamos o relacionamento próximo com nossos clientes, oferecendo atendimento individualizado, comunicação transparente e estratégias jurídicas construídas para cada caso.")
    ]),
    createColumn("33", [
        createHeading("👁️ Transparência", "h3", "left"),
        createText("Acreditamos que a confiança se constrói por meio de uma comunicação transparente, orientações fundamentadas e acompanhamento próximo durante toda a condução da demanda.")
    ]),
    createColumn("33", [
        createHeading("🌐 Atuação Nacional", "h3", "left"),
        createText("Com experiência em demandas de diferentes regiões do país, oferecemos assessoria jurídica estratégica e representação em âmbito nacional.")
    ])
]);
content.push(cardsSection);

// 4. SEÇÃO FRAUDE BANCÁRIA
const fraudeSection = createSection({
    background_background: "classic",
    background_color: "#121815",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("50", [
        createHeading("🛡️ DIREITO BANCÁRIO", "h5", "left", { title_color: "#C59B4E" }),
        createHeading("Foi vítima de fraude ou golpe bancário?", "h2", "left", { title_color: "#FFFFFF" }),
        createText("<p style='color:#b8c4bf;'>Golpe do PIX, falsa central de atendimento, falso funcionário, empréstimo não contratado ou invasão de conta podem causar prejuízos significativos em poucos minutos.<br><br>Dependendo das circunstâncias da fraude e das falhas de segurança identificadas, é possível buscar judicialmente a recuperação dos valores e a proteção do seu patrimônio.</p><ul><li style='color:#fff;'>✔️ Recuperação de valores em casos de fraude bancária</li><li style='color:#fff;'>✔️ Contestação de empréstimos, cartões e operações não reconhecidas</li><li style='color:#fff;'>✔️ Bloqueio ou suspensão de cobranças indevidas</li><li style='color:#fff;'>✔️ Medidas judiciais urgentes para reduzir ou impedir novos prejuízos</li></ul>"),
        createButton("CLIQUE AQUI E FALE CONOSCO", "https://wa.me/5561982258072?text=Ol%C3%A1%2C%20fui%20v%C3%ADtima%20de%20fraude%20banc%C3%A1ria%20e%20preciso%20de%20ajuda%20jur%C3%ADdica%21", "fab fa-whatsapp", {
            background_color: "#27AE60"
        })
    ]),
    createColumn("50", [
        createImage("https://pontes-miranda.vercel.app/assets/bank_fraud_law-o2Y4S3Nj.jpg")
    ])
]);
content.push(fraudeSection);

// 5. SEÇÃO TRATAMENTO NEGADO
const saudeSection = createSection({
    background_background: "classic",
    background_color: "#F7F2EA",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("50", [
        createImage("https://pontes-miranda.vercel.app/assets/health_law_denied-BH4WrpfH.jpg")
    ]),
    createColumn("50", [
        createHeading("🩺 DIREITO À SAÚDE &amp; TUTELA DE URGÊNCIA", "h5", "left", { title_color: "#C59B4E" }),
        createHeading("Teve seu tratamento ou cirurgia negados?", "h2", "left", { title_color: "#161616" }),
        createText("<p style='color:#555;'>Se o plano de saúde ou o SUS negou cirurgia, medicamento, tratamento, exame ou internação, uma medida judicial urgente pode ser necessária para garantir o acesso à assistência indicada pelo seu médico.<br><br>Atuamos em casos de negativas de cobertura e situações que não podem esperar.</p><ul><li style='color:#161616;'>✔️ Liminar para liberação urgente de cirurgias e tratamentos</li><li style='color:#161616;'>✔️ Medicamentos de alto custo e tratamentos oncológicos</li><li style='color:#161616;'>✔️ Internações, exames e procedimentos negados</li></ul>"),
        createButton("CLIQUE AQUI E FALE CONOSCO", "https://wa.me/5561982258072?text=Ol%C3%A1%2C%20meu%20tratamento%20foi%20negado%20pelo%20plano%20de%20sa%C3%BAde%20e%20preciso%20de%20ajuda%20urgente%21", "fab fa-whatsapp", {
            background_color: "#1E2E28"
        })
    ])
]);
content.push(saudeSection);

// 6. NOSSO PROPÓSITO
const propositoSection = createSection({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("100", [
        createHeading("Nosso Propósito", "h4", "center", { title_color: "#C59B4E" }),
        createHeading("Promover segurança jurídica por meio de uma advocacia estratégica, ética e comprometida com resultados.", "h2", "center", { title_color: "#161616" }),
        createText("<p style='text-align:center; max-width:800px; margin:20px auto; color:#555;'>No Pontes Miranda Advogados, compreendemos que cada demanda envolve muito mais do que questões jurídicas. Envolve patrimônio, negócios, relações, reputação e decisões que podem produzir reflexos duradouros na vida de nossos clientes.</p>"),
        createButton("FALAR COM UMA ADVOGADA", "https://wa.me/5561982258072?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21", "fab fa-whatsapp", {
            background_color: "#27AE60"
        })
    ])
]);
content.push(propositoSection);

// 7. QUEM SOMOS / SÓCIAS
const sobreSection = createSection({
    background_background: "classic",
    background_color: "#F9F9F9",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("40", [
        createImage("https://pontesmiranda.adv.br/assets/foto_amanda_jessica_sofa.jpg")
    ]),
    createColumn("60", [
        createHeading("Sócias Fundadoras", "h4", "left", { title_color: "#C59B4E" }),
        createHeading("Experiência, estratégia e atuação personalizada.", "h2", "left", { title_color: "#161616" }),
        createText("<p style='color:#555;'>O Pontes Miranda Advogados foi idealizado e é conduzido por Amanda Pontes e Jéssica Miranda, advogadas que compartilham a convicção de que a excelência jurídica se constrói por meio da técnica, da estratégia e da proximidade com cada cliente.</p>"),
        createHeading("Drª Amanda Pontes - OAB/DF 65307", "h3", "left"),
        createText("<p style='color:#666;'>Advogada com atuação nas áreas de Direito Empresarial, Direito Tributário, Direito Civil e Direito de Família. Desenvolve assessoria jurídica consultiva e contenciosa com foco na prevenção de riscos e soluções estratégicas.</p>"),
        createHeading("Drª Jéssica Miranda - OAB/DF 60395", "h3", "left"),
        createText("<p style='color:#666;'>Advogada com atuação nas áreas de Direito Empresarial, Direito Administrativo, Direito Médico, Direito Penal Empresarial e Contencioso Estratégico.</p>")
    ])
]);
content.push(sobreSection);

// 8. CONTATO & FAQ (COMBINED HTML INJECTOR FOR EXACT WORKING ACCORDIONS & FORM)
const contactFaqSection = createSection({
    background_background: "classic",
    background_color: "#FFFFFF",
    padding: { unit: "px", top: "60", right: "20", bottom: "60", left: "20", isLinked: false }
}, [
    createColumn("100", [
        createHeading("Perguntas Frequentes", "h2", "center", { title_color: "#161616" }),
        createText(`
        <div style="max-width:800px; margin:30px auto; font-family:sans-serif;">
            <details style="padding:15px; margin-bottom:10px; border:1px solid #eee; border-radius:8px;">
                <summary style="font-weight:bold; cursor:pointer;">Como funciona o atendimento jurídico à distância (online)?</summary>
                <p style="margin-top:10px; color:#555;">O Pontes Miranda Advogados presta atendimento jurídico remoto com o mesmo padrão de excelência, proximidade e segurança por videoconferência.</p>
            </details>
            <details style="padding:15px; margin-bottom:10px; border:1px solid #eee; border-radius:8px;">
                <summary style="font-weight:bold; cursor:pointer;">Como serei informado sobre o andamento do meu processo?</summary>
                <p style="margin-top:10px; color:#555;">Mantemos atualizações periódicas sobre o andamento dos processos com total transparência e clareza.</p>
            </details>
            <details style="padding:15px; margin-bottom:10px; border:1px solid #eee; border-radius:8px;">
                <summary style="font-weight:bold; cursor:pointer;">Quais documentos são necessários para a primeira consulta?</summary>
                <p style="margin-top:10px; color:#555;">Documento de identidade, comprovante de residência e os documentos relacionados ao caso.</p>
            </details>
        </div>
        `)
    ])
]);
content.push(contactFaqSection);

// COMPLETE ELEMENTOR JSON OBJECT
const elementorTemplate = {
    version: "0.4",
    title: "Modelo Landing Page - Pontes Miranda Advogados",
    type: "page",
    page_settings: {
        template: "elementor_canvas"
    },
    content: content
};

fs.writeFileSync('elementor_template_pontes_miranda.json', JSON.stringify(elementorTemplate, null, 2), 'utf8');
console.log('Elementor Template JSON generated successfully!');
