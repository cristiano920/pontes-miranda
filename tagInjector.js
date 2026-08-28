import { supabase } from './supabase.js';

const CACHE_KEY = 'pm_site_active_scripts';
const CACHE_TTL_MS = 60 * 1000; // 1 minuto de cache local com revalidação suave

/**
 * Inicializa a injeção dinâmica de scripts na página atual.
 */
export async function initTagInjector() {
    try {
        // 1. Tenta carregar do cache para renderização imediata
        const cached = getCachedScripts();
        if (cached && Array.isArray(cached)) {
            injectScripts(cached);
        }

        // 2. Busca scripts atualizados no Supabase em segundo plano
        const { data, error } = await supabase
            .from('site_scripts')
            .select('id, name, location, code, target_pages')
            .eq('is_active', true);

        if (!error && data) {
            setCachedScripts(data);
            // Se não havia cache anterior, injeta os scripts recém-buscados
            if (!cached) {
                injectScripts(data);
            }
        }
    } catch (e) {
        console.warn('[TagInjector] Falha ao sincronizar scripts:', e);
    }
}

function getCachedScripts() {
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

function setCachedScripts(data) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
    } catch (e) {
        // Ignora erro se storage estiver cheio ou desabilitado
    }
}

/**
 * Injeta a lista de scripts no DOM caso correspondam à página atual.
 */
function injectScripts(scripts) {
    const currentPath = window.location.pathname;

    scripts.forEach(scriptItem => {
        // Verifica se o script deve rodar nesta rota
        if (!shouldRunOnPage(scriptItem.target_pages, currentPath)) {
            return;
        }

        const markerId = `pm-script-${scriptItem.id}`;
        // Evita injeção duplicada do mesmo script
        if (document.getElementById(markerId)) {
            return;
        }

        const container = document.createElement('div');
        container.id = markerId;
        container.style.display = 'none';
        container.setAttribute('data-tag-name', scriptItem.name);

        // Insere o container na posição especificada
        if (scriptItem.location === 'head') {
            document.head.appendChild(container);
        } else if (scriptItem.location === 'body_start') {
            if (document.body.firstChild) {
                document.body.insertBefore(container, document.body.firstChild);
            } else {
                document.body.appendChild(container);
            }
        } else {
            document.body.appendChild(container);
        }

        // Executa o código dentro do container
        parseAndExecute(scriptItem.code, container);
    });
}

/**
 * Valida se a rota atual é compatível com a regra da tag.
 */
function shouldRunOnPage(targetPages, currentPath) {
    if (!targetPages || targetPages === 'all') return true;

    // Normaliza paths
    const cleanCurrent = currentPath.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    const cleanTarget = targetPages.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

    if (cleanTarget === cleanCurrent) return true;
    if (cleanTarget === '/' && cleanCurrent === '') return true;

    return false;
}

/**
 * Interpreta o código HTML/JS e recria elementos <script> para garantir sua execução pelo browser.
 */
function parseAndExecute(htmlCode, targetElement) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    // Processa nós do head e body do código parseado
    const nodes = [...doc.head.childNodes, ...doc.body.childNodes];

    nodes.forEach(node => {
        if (node.nodeName.toLowerCase() === 'script') {
            const script = document.createElement('script');
            // Copia todos os atributos (src, async, defer, type, etc)
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                script.setAttribute(attr.name, attr.value);
            }
            script.textContent = node.textContent;
            targetElement.appendChild(script);
        } else if (node.nodeName.toLowerCase() === 'noscript') {
            const noscript = document.createElement('noscript');
            noscript.innerHTML = node.innerHTML;
            targetElement.appendChild(noscript);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            targetElement.appendChild(node.cloneNode(true));
        }
    });
}

// Auto-inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTagInjector);
} else {
    initTagInjector();
}
