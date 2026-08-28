const fs = require('fs');

const htmlPath = 'C:/Users/crist/Documents/Projetos Hero SD/Pontes Miranda/index.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// Replace og:image
content = content.replace(/content="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/logo_prata\.png"/g, 'content="assets/logo.png"');

// Replace logo_prata
content = content.replace(/src="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/logo_prata\.png"/g, 'src="assets/logo_prata.png"');

// Replace foto_advogadas_studio_color
content = content.replace(/src="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/foto_advogadas_studio_color\.jpg"/g, 'src="assets/foto_advogadas_studio_color.jpg"');

// Replace foto_amanda_jessica_sofa
content = content.replace(/src="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/foto_amanda_jessica_sofa\.jpg"/g, 'src="assets/foto_amanda_jessica_sofa.jpg"');

// Replace favicon_preto (used in social card and head)
content = content.replace(/src="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/favicon_preto\.png"/g, 'src="assets/favicon_preto.png"');
content = content.replace(/href="https:\/\/pontesmirandaadv\.com\.br\/wp-content\/uploads\/2026\/06\/favicon_preto\.png"/g, 'href="assets/favicon_preto.png"');

fs.writeFileSync(htmlPath, content, 'utf8');
console.log('HTML reverted successfully!');
