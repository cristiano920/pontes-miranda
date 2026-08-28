const fs = require('fs');
const cheerio = require('cheerio');

// Read current index.html and styles.css
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

// Extract body content inside <main>
const $ = cheerio.load(html, { decodeEntities: false });
const mainContent = $('main').html() || $('body').html();

// Combine inline styles and html so it renders 100% self-contained in Elementor
const fullHtmlWidgetCode = `<style>\n${css}\n</style>\n<div class="elementor-custom-landing-wrapper">\n${mainContent}\n</div>`;

// 1. Elementor Template Object formatted according to Elementor v3.x export specs
const elementorPageJson = {
  version: "0.4",
  title: "Landing Page - Pontes Miranda Advogados",
  type: "page",
  page_settings: {
    template: "elementor_canvas"
  },
  content: [
    {
      id: "pm_section_main",
      elType: "section",
      isInner: false,
      settings: {
        layout: "full_width",
        gap: "no",
        padding: {
          unit: "px",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          isLinked: true
        }
      },
      elements: [
        {
          id: "pm_column_main",
          elType: "column",
          isInner: false,
          settings: {
            _column_size: 100,
            _inline_size: 100
          },
          elements: [
            {
              id: "pm_html_widget",
              elType: "widget",
              isInner: false,
              widgetType: "html",
              settings: {
                html: fullHtmlWidgetCode
              },
              elements: []
            }
          ]
        }
      ]
    }
  ]
};

// Write JSON files
fs.writeFileSync('elementor_template_pontes_miranda.json', JSON.stringify(elementorPageJson, null, 2), 'utf8');
if (!fs.existsSync('public')) fs.mkdirSync('public');
fs.writeFileSync('public/elementor_template_pontes_miranda.json', JSON.stringify(elementorPageJson, null, 2), 'utf8');

// Also save raw HTML code for manual copy-paste into Elementor HTML Widget
fs.writeFileSync('elementor_code_snippet.html', fullHtmlWidgetCode, 'utf8');
fs.writeFileSync('public/elementor_code_snippet.html', fullHtmlWidgetCode, 'utf8');

console.log('Fixed Elementor JSON and HTML snippet generated successfully.');
