import { supabase } from '../supabase.js';

const CACHE_KEY = 'pm_public_links';
const CACHE_TTL_MS = 60 * 1000; // 1 minuto de cache

// SVG Icons mapping for maximum performance & fidelity
const ICONS_SVG = {
    whatsapp: `<svg class="link-icon-whatsapp" viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.667-.699c.974.53 1.803.82 2.793.82 3.181 0 5.767-2.586 5.767-5.766.001-3.182-2.585-5.806-5.767-5.806zm0 10.455c-.868 0-1.636-.239-2.316-.689l-.165-.109-1.579.414.421-1.54-.108-.172c-.496-.79-.758-1.583-.757-2.593.001-2.564 2.088-4.65 4.653-4.65 2.564 0 4.651 2.086 4.651 4.65 0 2.564-2.087 4.689-4.806 4.689zm2.55-3.486c-.14-.07-.828-.409-.957-.456-.129-.047-.223-.07-.317.07-.094.14-.364.456-.446.55-.082.094-.165.105-.305.035-.14-.07-.591-.218-1.127-.695-.417-.372-.699-.831-.781-.972-.082-.14-.009-.216.061-.286.063-.063.14-.164.21-.246.07-.082.094-.14.14-.234.047-.094.024-.176-.012-.246-.035-.07-.317-.765-.434-1.048-.114-.275-.23-.238-.317-.242l-.27-.004c-.094 0-.246.035-.375.176-.129.14-.493.482-.493 1.176s.505 1.364.575 1.458c.07.094.994 1.517 2.408 2.128.337.145.6.232.805.298.338.107.646.092.89.056.271-.041.828-.338.945-.665.117-.327.117-.607.082-.665-.035-.058-.129-.093-.269-.163z"/>
        <path d="M12.012 2.002C6.489 2.002 2 6.49 2 12.014c0 1.986.58 3.84 1.583 5.405L2 22l4.721-1.536A9.957 9.957 0 0012.012 22c5.522 0 10.012-4.488 10.012-10.012 0-5.524-4.49-10.012-10.012-10.012zm0 18.232c-1.637 0-3.153-.483-4.431-1.314l-.317-.206-2.8 1.053 1.05-2.73-.207-.33A8.214 8.214 0 013.793 12.014c0-4.532 3.687-8.219 8.219-8.219s8.219 3.687 8.219 8.219-3.687 8.22-8.219 8.22z"/>
    </svg>`,
    email: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>`,
    instagram: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>`,
    'map-pin': `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>`,
    phone: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>`,
    globe: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`,
    'file-text': `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" x2="8" y1="13" y2="13"></line>
        <line x1="16" x2="8" y1="17" y2="17"></line>
        <line x1="10" x2="8" y1="9" y2="9"></line>
    </svg>`,
    scale: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
        <path d="M7 21h10"></path>
        <path d="M12 3v18"></path>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
    </svg>`,
    link: `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    initLinks();
});

async function initLinks() {
    const linksListContainer = document.getElementById('linksList');
    if (!linksListContainer) return;

    // 1. Tentar renderizar do cache para velocidade imediata (0ms)
    const cached = getCachedLinks();
    if (cached && Array.isArray(cached) && cached.length > 0) {
        renderLinks(cached, linksListContainer);
    }

    // 2. Buscar dados frescos no Supabase em segundo plano
    try {
        const { data, error } = await supabase
            .from('page_links')
            .select('id, title, url, icon, is_featured, is_active, sort_order')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
            setCachedLinks(data);
            renderLinks(data, linksListContainer);
        }
    } catch (e) {
        console.warn('Erro ao carregar links do Supabase:', e);
    }
}

function getCachedLinks() {
    try {
        const item = sessionStorage.getItem(CACHE_KEY);
        if (!item) return null;
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            return parsed.data;
        }
    } catch (e) {
        return null;
    }
    return null;
}

function setCachedLinks(data) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
    } catch (e) {}
}

function renderLinks(links, container) {
    container.innerHTML = links.map(link => {
        const iconSvg = ICONS_SVG[link.icon] || ICONS_SVG['link'];
        const featuredClass = link.is_featured ? 'featured' : '';
        const isExternal = link.url.startsWith('http') || link.url.startsWith('//');
        const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

        return `
            <a href="${escapeHtml(link.url)}" 
               class="link-card ${featuredClass}" 
               data-link-id="${link.id}" 
               ${targetAttr}
            >
                ${iconSvg}
                <span>${escapeHtml(link.title)}</span>
            </a>
        `;
    }).join('');

    attachClickTracking(container);
}

function attachClickTracking(container) {
    const buttons = container.querySelectorAll('.link-card');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const linkId = btn.getAttribute('data-link-id');
            if (!linkId) return;

            // Incrementa clique no Supabase assincronamente (non-blocking)
            trackClick(linkId);
        });
    });
}

function trackClick(linkId) {
    try {
        supabase.rpc('increment_link_click', { link_id: linkId })
            .then(() => {})
            .catch(err => console.warn('Erro ao registrar clique:', err));
    } catch (e) {
        console.warn('Falha no rastreio de clique:', e);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
