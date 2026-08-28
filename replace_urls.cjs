const fs = require('fs');

const htmlPath = 'C:/Users/crist/Documents/Projetos Hero SD/Pontes Miranda/index.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// Replace og:image
content = content.replace(/content="assets\/logo\.png"/g, 'content="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/logo_prata.png"');

// Replace logo_prata
content = content.replace(/src="assets\/logo_prata\.png"/g, 'src="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/logo_prata.png"');

// Replace foto_advogadas_studio_color
content = content.replace(/src="assets\/foto_advogadas_studio_color\.jpg"/g, 'src="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/foto_advogadas_studio_color.jpg"');

// Replace foto_amanda_jessica_sofa
content = content.replace(/src="assets\/foto_amanda_jessica_sofa\.jpg"/g, 'src="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/foto_amanda_jessica_sofa.jpg"');

// Replace favicon_preto (used in social card)
content = content.replace(/src="assets\/favicon_preto\.png"/g, 'src="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/favicon_preto.png"');

// Add favicon link to <head> if it doesn't exist
if (!content.includes('<link rel="icon"')) {
    content = content.replace('</head>', '    <link rel="icon" type="image/png" href="https://pontesmirandaadv.com.br/wp-content/uploads/2026/06/favicon_preto.png">\n</head>');
}

fs.writeFileSync(htmlPath, content, 'utf8');
console.log('HTML updated successfully!');
