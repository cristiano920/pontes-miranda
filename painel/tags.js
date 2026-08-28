import { supabase } from '../supabase.js';

/**
 * Lista de templates pré-configurados para agilizar o cadastro de tags populares.
 */
export const TAG_PRESETS = {
    gtm: {
        name: 'Google Tag Manager',
        provider: 'gtm',
        location: 'head',
        placeholder: 'GTM-XXXXXXX',
        generateCode: (id) => `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id.trim()}');</script>
<!-- End Google Tag Manager -->`
    },
    gtm_body: {
        name: 'Google Tag Manager (NoScript Body)',
        provider: 'gtm',
        location: 'body_start',
        placeholder: 'GTM-XXXXXXX',
        generateCode: (id) => `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id.trim()}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`
    },
    ga4: {
        name: 'Google Analytics 4',
        provider: 'ga4',
        location: 'head',
        placeholder: 'G-XXXXXXXXXX',
        generateCode: (id) => `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id.trim()}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id.trim()}');
</script>`
    },
    meta_pixel: {
        name: 'Meta Pixel (Facebook)',
        provider: 'meta_pixel',
        location: 'head',
        placeholder: '1234567890123456',
        generateCode: (id) => `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id.trim()}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${id.trim()}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`
    },
    hotjar: {
        name: 'Hotjar Tracking Code',
        provider: 'hotjar',
        location: 'head',
        placeholder: '1234567',
        generateCode: (id) => `<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${id.trim()},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
    },
    tiktok: {
        name: 'TikTok Pixel',
        provider: 'tiktok',
        location: 'head',
        placeholder: 'CXXXXXXXXXXXXXX',
        generateCode: (id) => `<!-- TikTok Pixel Code -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${id.trim()}');
  ttq.page();
}(window, document, 'ttq');
</script>`
    },
    custom: {
        name: 'Script / HTML Customizado',
        provider: 'custom',
        location: 'head',
        placeholder: '',
        generateCode: () => ''
    }
};

/**
 * Busca todas as tags cadastradas no banco de dados.
 */
export async function getAllTags() {
    try {
        const { data, error } = await supabase
            .from('site_scripts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data: data || [] };
    } catch (err) {
        console.error('Erro ao buscar tags:', err);
        return { success: false, error: err.message || 'Erro ao carregar lista de tags.' };
    }
}

/**
 * Busca estatísticas rápidas sobre as tags (Total, Ativas no Head, Ativas no Body).
 */
export async function getTagStats() {
    try {
        const { data, error } = await supabase
            .from('site_scripts')
            .select('id, location, is_active');

        if (error) throw error;
        const total = data.length;
        const activeTotal = data.filter(t => t.is_active).length;
        const headActive = data.filter(t => t.is_active && t.location === 'head').length;
        const bodyActive = data.filter(t => t.is_active && (t.location === 'body_start' || t.location === 'body_end')).length;

        return {
            success: true,
            stats: { total, activeTotal, headActive, bodyActive }
        };
    } catch (err) {
        console.error('Erro ao buscar estatísticas de tags:', err);
        return {
            success: false,
            stats: { total: 0, activeTotal: 0, headActive: 0, bodyActive: 0 }
        };
    }
}

/**
 * Cria uma nova tag no banco de dados.
 */
export async function createTag(tagData) {
    try {
        const payload = {
            name: tagData.name.trim(),
            provider: tagData.provider || 'custom',
            location: tagData.location || 'head',
            code: tagData.code.trim(),
            target_pages: tagData.target_pages || 'all',
            is_active: tagData.is_active ?? true,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('site_scripts')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao criar tag:', err);
        return { success: false, error: err.message || 'Falha ao salvar nova tag.' };
    }
}

/**
 * Atualiza uma tag existente.
 */
export async function updateTag(id, tagData) {
    try {
        const payload = {
            name: tagData.name.trim(),
            provider: tagData.provider,
            location: tagData.location,
            code: tagData.code.trim(),
            target_pages: tagData.target_pages || 'all',
            is_active: tagData.is_active,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('site_scripts')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao atualizar tag:', err);
        return { success: false, error: err.message || 'Falha ao atualizar tag.' };
    }
}

/**
 * Alterna status ativo/inativo de uma tag.
 */
export async function toggleTagStatus(id, isActive) {
    try {
        const { data, error } = await supabase
            .from('site_scripts')
            .update({
                is_active: isActive,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao alternar status da tag:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Duplica uma tag existente.
 */
export async function duplicateTag(tag) {
    return createTag({
        name: `${tag.name} (Cópia)`,
        provider: tag.provider,
        location: tag.location,
        code: tag.code,
        target_pages: tag.target_pages,
        is_active: false // começa inativa para segurança
    });
}

/**
 * Remove permanentemente uma tag do banco de dados.
 */
export async function deleteTag(id) {
    try {
        const { error } = await supabase
            .from('site_scripts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err) {
        console.error('Erro ao deletar tag:', err);
        return { success: false, error: err.message || 'Falha ao deletar tag.' };
    }
}
