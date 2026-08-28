import { supabase } from '../supabase.js';

/**
 * Realiza login com e-mail e senha no Supabase Auth.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: any, session?: any, error?: string}>}
 */
export async function loginWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });

        if (error) {
            return {
                success: false,
                error: getAuthErrorMessage(error.message)
            };
        }

        return {
            success: true,
            user: data.user,
            session: data.session
        };
    } catch (err) {
        console.error('Erro na autenticação:', err);
        return {
            success: false,
            error: 'Erro de rede ou servidor ao tentar autenticar. Verifique sua conexão.'
        };
    }
}

/**
 * Encerra a sessão do usuário atual.
 */
export async function logoutUser() {
    try {
        await supabase.auth.signOut();
    } catch (err) {
        console.error('Erro ao deslogar:', err);
    } finally {
        // Redireciona para o login do painel
        window.location.href = '/painel/admin/';
    }
}

/**
 * Obtém a sessão atual.
 */
export async function getSession() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    } catch (e) {
        console.error('Erro ao buscar sessão:', e);
        return null;
    }
}

/**
 * Obtém o usuário atual autenticado.
 */
export async function getCurrentUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (e) {
        console.error('Erro ao obter usuário:', e);
        return null;
    }
}

/**
 * Guarda de Rota Protegida (AdminGuard)
 * Redireciona para /painel/admin caso o usuário não esteja logado.
 */
export async function requireAuth(onAuthenticated) {
    const session = await getSession();
    if (!session || !session.user) {
        window.location.href = '/painel/admin/';
        return null;
    }

    // Escuta mudanças de auth em tempo real (ex: token expirado, logout em outra aba)
    supabase.auth.onAuthStateChange((event, currentSession) => {
        if (event === 'SIGNED_OUT' || !currentSession) {
            window.location.href = '/painel/admin/';
        }
    });

    if (typeof onAuthenticated === 'function') {
        onAuthenticated(session.user);
    }
    return session.user;
}

/**
 * Redireciona para o painel se o usuário já estiver logado (usado na página de login).
 */
export async function redirectIfAuthenticated() {
    const session = await getSession();
    if (session && session.user) {
        window.location.href = '/painel/';
        return true;
    }
    return false;
}

/**
 * Traduz mensagens comuns de erro do Supabase Auth para português amigável.
 */
function getAuthErrorMessage(message) {
    if (!message) return 'Falha na autenticação. Verifique os dados.';
    const msg = message.toLowerCase();
    if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
        return 'E-mail ou senha incorretos. Verifique suas credenciais.';
    }
    if (msg.includes('email not confirmed')) {
        return 'O e-mail cadastrado ainda não foi confirmado.';
    }
    if (msg.includes('rate limit') || msg.includes('too many requests')) {
        return 'Muitas tentativas em sequência. Aguarde alguns instantes.';
    }
    return message;
}
