const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'C:/Users/crist/Documents/Projetos Hero SD/Pontes Miranda/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(htmlContent, {
    decodeEntities: false,
    recognizeSelfClosing: true,
});

// 1. Hero Section
$('.hero-headline').text('Estratégia jurídica para proteger pessoas, patrimônios, negócios e direitos.');
$('.hero-text-support').text('Aliamos conhecimento técnico, visão estratégica e atendimento personalizado para oferecer assessoria jurídica segura, eficiente e orientada às necessidades de cada cliente.');

// 2. Diferenciais (Pilares)
$('#diferenciais .section-title').text('Pilares da nossa atuação jurídica');
$('#diferenciais .section-subtitle').text('Acreditamos que a advocacia de excelência se constrói com conhecimento técnico, visão estratégica, ética profissional e compromisso com os interesses de cada cliente.');

// Atualizar os 3 cards e remover o "Resolução Ágil"
const cards = $('.diferenciais-grid .diferencial-card');
// Atendimento Personalizado
$(cards[0]).find('h3').text('Atendimento Personalizado');
$(cards[0]).find('p').text('Valorizamos o relacionamento próximo com nossos clientes, oferecendo atendimento individualizado, comunicação transparente e estratégias jurídicas construídas para cada caso.');

// Transparência (was card 2 "Transparência Total", but "Resolução ágil" was card 1 in zero-index, wait. Let's look at the original order:
// 0: Atendimento Personalizado
// 1: Resolução Ágil
// 2: Transparência Total
// 3: Atuação Nacional
$(cards[2]).find('h3').text('Transparência');
$(cards[2]).find('p').text('Acreditamos que a confiança se constrói por meio de uma comunicação transparente, orientações fundamentadas e acompanhamento próximo durante toda a condução da demanda.');

$(cards[3]).find('h3').text('Atuação Nacional');
$(cards[3]).find('p').text('Com experiência em demandas de diferentes regiões do país, oferecemos assessoria jurídica estratégica e representação em âmbito nacional, mantendo a proximidade e a qualidade que caracterizam nossa atuação.');

// Remove Resolução Ágil
$(cards[1]).remove();

// 3. Remover Depoimentos
$('#depoimentos').remove();
$('a[href="#depoimentos"]').remove(); // Header nav link

// 4. Nosso Propósito
$('.proposito-title').text('Promover segurança jurídica por meio de uma advocacia estratégica, ética e comprometida com resultados.');
// The previous text was in two <p> tags and one social card.
// We remove the old text paragraphs.
$('.proposito-text-content > p.proposito-text').remove();
// Insert the 3 new paragraphs before the social card.
const newP1 = $('<p class="proposito-text">No Pontes Miranda Advogados, compreendemos que cada demanda envolve muito mais do que questões jurídicas. Envolve patrimônio, negócios, relações, reputação e decisões que podem produzir reflexos duradouros na vida de nossos clientes.</p>');
const newP2 = $('<p class="proposito-text">Por isso, nossa atuação é pautada pelo estudo aprofundado de cada caso, pela construção de estratégias jurídicas consistentes e pela busca de soluções que conciliem segurança jurídica, eficiência e responsabilidade.</p>');
const newP3 = $('<p class="proposito-text">Mais do que representar interesses em juízo ou prestar consultoria, buscamos estabelecer relações de confiança, oferecendo acompanhamento próximo, orientação qualificada e atuação técnica em todas as etapas da demanda.</p>');
$('.social-card').before(newP1, newP2, newP3);

// 5 e 6. Quem Somos & Sócias Fundadoras
$('.sobre-title').text('Experiência, estratégia e atuação personalizada.');
$('.sobre-lead').text('O Pontes Miranda Advogados foi idealizado e é conduzido por Amanda Pontes e Jéssica Miranda, advogadas que compartilham a convicção de que a excelência jurídica se constrói por meio da técnica, da estratégia e da proximidade com cada cliente.');

const bioCards = $('.bio-card');
// Amanda Pontes
$(bioCards[0]).find('h3').text('Drª Amanda Pontes - OAB/DF 65307');
$(bioCards[0]).find('.bio-subtitle').text('Sócia Fundadora');
$(bioCards[0]).find('p:not(.bio-subtitle)').text('Advogada com atuação nas áreas de Direito Empresarial, Direito Tributário, Direito Civil e Direito de Família. Desenvolve assessoria jurídica consultiva e contenciosa com foco na prevenção de riscos, na resolução estratégica de conflitos e na construção de soluções seguras para pessoas físicas e empresas. Pauta sua atuação pela excelência técnica, cordialidade, ética profissional e compromisso com a defesa dos interesses de seus clientes, buscando oferecer soluções jurídicas seguras, personalizadas e alinhadas às particularidades de cada demanda.');

// Jéssica Miranda
$(bioCards[1]).find('h3').text('Drª Jéssica Miranda - OAB/DF 60395');
$(bioCards[1]).find('.bio-subtitle').text('Sócia Fundadora');
$(bioCards[1]).find('p:not(.bio-subtitle)').text('Advogada com atuação nas áreas de Direito Empresarial, Direito Administrativo, Direito Médico, Direito Penal Empresarial e Contencioso Estratégico. Possui experiência na condução de demandas consultivas e judiciais de elevada complexidade, prestando assessoria jurídica a pessoas físicas, empresas e instituições. Sua atuação é marcada pela construção de estratégias jurídicas consistentes, pela análise aprofundada de cada demanda e pela condução firme na defesa dos interesses de seus clientes. Aliando excelência técnica, visão multidisciplinar e planejamento jurídico, atua na prevenção e gestão de riscos, na estruturação de negócios, na gestão de crises e na defesa de profissionais, empresas e instituições, conduzindo cada caso com segurança jurídica, determinação e responsabilidade.');

// 7. FAQ
const faqItems = $('.faq-item');
// FAQ 1
$(faqItems[0]).find('button span').text('Como funciona o atendimento jurídico à distância (online)?');
$(faqItems[0]).find('.faq-answer p').text('O Pontes Miranda Advogados presta atendimento jurídico remoto com o mesmo padrão de excelência, proximidade e segurança adotado nos atendimentos presenciais. As reuniões são realizadas por videoconferência, em ambiente previamente agendado, e toda a documentação é compartilhada por meios eletrônicos seguros.');
// FAQ 2
$(faqItems[1]).find('button span').text('Como serei informado sobre o andamento do meu processo?');
$(faqItems[1]).find('.faq-answer p').text('A comunicação com nossos clientes é pautada pela transparência, pela clareza e pelo acompanhamento contínuo de cada demanda. Mantemos atualizações periódicas sobre o andamento dos processos, com destaque para os atos processuais mais relevantes e para as medidas adotadas pelo escritório. Além disso, disponibilizamos atendimento para esclarecimento de dúvidas e orientações sempre que necessário, assegurando que nossos clientes acompanhem cada etapa da atuação jurídica com segurança, previsibilidade e confiança.');
// FAQ 3
$(faqItems[2]).find('button span').text('Quais documentos são necessários para a primeira consulta jurídica?');
$(faqItems[2]).find('.faq-answer p').text('A documentação necessária varia de acordo com a natureza da demanda. De forma geral, solicitamos um documento oficial de identificação, comprovante de residência e os documentos relacionados ao caso, como contratos, certidões, comunicações, comprovantes ou quaisquer outros elementos que possam contribuir para a análise jurídica. Após o primeiro contato, nossa equipe encaminhará uma relação personalizada dos documentos necessários, permitindo que a consulta seja conduzida com maior objetividade, segurança e aproveitamento técnico.');
// FAQ 4
$(faqItems[3]).find('button span').text('Quanto custa uma consulta ou a contratação dos serviços jurídicos?');
$(faqItems[3]).find('.faq-answer p').text('Os honorários advocatícios são definidos de forma individualizada, considerando as particularidades de cada demanda, sua complexidade, o escopo da atuação e as necessidades específicas de cada cliente. Após a análise inicial do caso, apresentamos uma proposta clara e personalizada, construída com transparência e equilíbrio, buscando oferecer uma solução jurídica adequada tanto às características da demanda quanto à realidade de cada cliente.');
// FAQ 5
$(faqItems[4]).remove();

// 8. OAB no Rodapé
const creds = $('.footer-lawyer-credentials span');
$(creds[0]).text('Drª Amanda Pontes – OAB/DF 65.307');
$(creds[2]).text('Drª Jéssica Miranda – OAB/DF 60.395');

fs.writeFileSync(htmlPath, $.html(), 'utf8');
console.log('HTML successfully updated using cheerio!');
