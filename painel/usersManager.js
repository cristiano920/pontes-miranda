import { supabase } from '../supabase.js';

export const SYSTEM_MENUS = [
    { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard', desc: 'Visão geral e métricas do site' },
    { id: 'links', name: 'Página de Links', icon: 'link-2', desc: 'Gerenciador dos botões da Bio (/links)' },
    { id: 'tags', name: 'Tags & Scripts', icon: 'tags', desc: 'Injeção de pixels e códigos de rastreamento' },
    { id: 'usuarios', name: 'Usuários & Acessos', icon: 'users', desc: 'Controle de contas e permissões do painel' }
];

/**
 * Busca todos os usuários administrativos cadastrados.
 */
export async function getAllUsers() {
    try {
        const { data, error } = await supabase
            .from('admin_profiles')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return { success: true, data: data || [] };
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        return { success: false, error: err.message || 'Falha ao listar usuários.' };
    }
}

/**
 * Busca o perfil e permissões do usuário atualmente logado.
 */
export async function getCurrentUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao carregar perfil do usuário logado:', err);
        return { 
            success: false, 
            data: {
                role: 'admin',
                allowed_menus: ['dashboard', 'links', 'tags', 'usuarios']
            }
        };
    }
}

/**
 * Retorna estatísticas rápidas sobre os usuários.
 */
export async function getUserStats() {
    try {
        const { data, error } = await supabase
            .from('admin_profiles')
            .select('id, is_active, role');

        if (error) throw error;
        const total = data.length;
        const activeCount = data.filter(u => u.is_active).length;
        const adminsCount = data.filter(u => u.role === 'admin').length;

        return {
            success: true,
            stats: { total, activeCount, adminsCount }
        };
    } catch (err) {
        console.error('Erro ao calcular estatísticas de usuários:', err);
        return { success: false, stats: { total: 1, activeCount: 1, adminsCount: 1 } };
    }
}

/**
 * Cria um novo usuário auto-confirmado no Supabase Auth + Admin Profile via RPC.
 */
export async function createUser({ email, password, name, role, allowed_menus }) {
    try {
        const { data, error } = await supabase.rpc('admin_create_user', {
            new_email: email.trim(),
            new_password: password,
            user_name: (name || '').trim(),
            user_role: role || 'editor',
            user_menus: allowed_menus && allowed_menus.length > 0 ? allowed_menus : ['dashboard']
        });

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        return { success: false, error: err.message || 'Falha ao criar usuário.' };
    }
}

/**
 * Atualiza um usuário existente e suas permissões via RPC.
 */
export async function updateUser(id, { email, password, name, role, allowed_menus, is_active }) {
    try {
        const { data, error } = await supabase.rpc('admin_update_user', {
            user_id: id,
            new_email: email.trim(),
            new_password: password ? password : null,
            user_name: (name || '').trim(),
            user_role: role || 'editor',
            user_menus: allowed_menus && allowed_menus.length > 0 ? allowed_menus : ['dashboard'],
            is_active_status: is_active ?? true
        });

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        return { success: false, error: err.message || 'Falha ao atualizar usuário.' };
    }
}

/**
 * Alterna status ativo/inativo de um usuário.
 */
export async function toggleUserStatus(id, isActive) {
    try {
        const { data, error } = await supabase
            .from('admin_profiles')
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
        console.error('Erro ao alternar status do usuário:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Exclui permanentemente um usuário (com proteção à conta master).
 */
export async function deleteUser(id) {
    try {
        const { data, error } = await supabase.rpc('admin_delete_user', {
            target_user_id: id
        });

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        return { success: false, error: err.message || 'Falha ao excluir usuário.' };
    }
}

/**
 * Gera uma senha aleatória forte.
 */
export function generateStrongPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let pass = '';
    for (let i = 0; i < 12; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
}
