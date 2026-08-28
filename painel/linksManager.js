import { supabase } from '../supabase.js';

export const AVAILABLE_ICONS = [
    { id: 'whatsapp', name: 'WhatsApp', iconName: 'message-circle' },
    { id: 'instagram', name: 'Instagram', iconName: 'instagram' },
    { id: 'email', name: 'E-mail', iconName: 'mail' },
    { id: 'map-pin', name: 'Localização / Maps', iconName: 'map-pin' },
    { id: 'phone', name: 'Telefone', iconName: 'phone' },
    { id: 'globe', name: 'Site / Web', iconName: 'globe' },
    { id: 'file-text', name: 'Documento / Arquivo', iconName: 'file-text' },
    { id: 'scale', name: 'Balança / Jurídico', iconName: 'scale' },
    { id: 'link', name: 'Link Padrão', iconName: 'link' }
];

/**
 * Busca todos os links cadastrados ordenados pelo sort_order.
 */
export async function getAllLinks() {
    try {
        const { data, error } = await supabase
            .from('page_links')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: true });

        if (error) throw error;
        return { success: true, data: data || [] };
    } catch (err) {
        console.error('Erro ao buscar links:', err);
        return { success: false, error: err.message || 'Erro ao carregar links.' };
    }
}

/**
 * Retorna estatísticas de links (total, ativos, total de cliques acumulados).
 */
export async function getLinkStats() {
    try {
        const { data, error } = await supabase
            .from('page_links')
            .select('id, is_active, clicks_count');

        if (error) throw error;
        const total = data.length;
        const activeCount = data.filter(l => l.is_active).length;
        const totalClicks = data.reduce((sum, l) => sum + (l.clicks_count || 0), 0);

        return {
            success: true,
            stats: { total, activeCount, totalClicks }
        };
    } catch (err) {
        console.error('Erro ao calcular estatísticas de links:', err);
        return {
            success: false,
            stats: { total: 0, activeCount: 0, totalClicks: 0 }
        };
    }
}

/**
 * Cria um novo botão de link.
 */
export async function createLink(linkData) {
    try {
        // Obter maior sort_order atual para adicionar no final
        const { data: existing } = await supabase
            .from('page_links')
            .select('sort_order')
            .order('sort_order', { ascending: false })
            .limit(1);

        const nextOrder = (existing && existing.length > 0) ? (existing[0].sort_order + 1) : 0;

        const payload = {
            title: linkData.title.trim(),
            url: linkData.url.trim(),
            icon: linkData.icon || 'link',
            is_featured: linkData.is_featured ?? false,
            is_active: linkData.is_active ?? true,
            sort_order: nextOrder,
            clicks_count: 0,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('page_links')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao criar link:', err);
        return { success: false, error: err.message || 'Falha ao salvar link.' };
    }
}

/**
 * Atualiza um link existente.
 */
export async function updateLink(id, linkData) {
    try {
        const payload = {
            title: linkData.title.trim(),
            url: linkData.url.trim(),
            icon: linkData.icon,
            is_featured: linkData.is_featured,
            is_active: linkData.is_active,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('page_links')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao atualizar link:', err);
        return { success: false, error: err.message || 'Falha ao atualizar link.' };
    }
}

/**
 * Alterna o status ativo/inativo de um link.
 */
export async function toggleLinkStatus(id, isActive) {
    try {
        const { data, error } = await supabase
            .from('page_links')
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
        console.error('Erro ao alternar status do link:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Reordena um link (mover para cima ou para baixo).
 */
export async function moveLinkOrder(linksList, currentIndex, direction) {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= linksList.length) return { success: false };

    const currentItem = linksList[currentIndex];
    const targetItem = linksList[targetIndex];

    const tempOrder = currentItem.sort_order;
    const newTargetOrder = targetItem.sort_order === tempOrder ? targetIndex : targetItem.sort_order;
    const newCurrentOrder = targetItem.sort_order === tempOrder ? currentIndex : targetItem.sort_order;

    try {
        // Atualiza as ordens no Supabase
        await Promise.all([
            supabase.from('page_links').update({ sort_order: newCurrentOrder }).eq('id', currentItem.id),
            supabase.from('page_links').update({ sort_order: newTargetOrder }).eq('id', targetItem.id)
        ]);

        return { success: true };
    } catch (err) {
        console.error('Erro ao reordenar links:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Duplica um link existente.
 */
export async function duplicateLink(link) {
    return createLink({
        title: `${link.title} (Cópia)`,
        url: link.url,
        icon: link.icon,
        is_featured: link.is_featured,
        is_active: false // começa inativo para segurança
    });
}

/**
 * Zera o contador de cliques de um link.
 */
export async function resetLinkClicks(id) {
    try {
        const { data, error } = await supabase
            .from('page_links')
            .update({
                clicks_count: 0,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao zerar contador de cliques:', err);
        return { success: false, error: err.message || 'Falha ao zerar cliques.' };
    }
}

/**
 * Remove permanentemente um link.
 */
export async function deleteLink(id) {
    try {
        const { error } = await supabase
            .from('page_links')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err) {
        console.error('Erro ao excluir link:', err);
        return { success: false, error: err.message || 'Falha ao excluir link.' };
    }
}
