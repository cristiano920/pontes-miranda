import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://oviczdqgrcnvobunwihz.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aWN6ZHFncmNudm9idW53aWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NDM4NzIsImV4cCI6MjEwMzUxOTg3Mn0.jEu1rEELQZkzkyASaGTl7QNyP0SHu1kF1_RqonLXrXk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Salva um novo lead recebido pelo formulário de contato.
 * @param {Object} leadData
 * @param {string} leadData.nome
 * @param {string} leadData.whatsapp
 * @param {string} [leadData.email]
 * @param {string} [leadData.servico]
 * @param {string} [leadData.mensagem]
 */
export async function saveLead(leadData) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    nome: leadData.nome,
                    whatsapp: leadData.whatsapp,
                    email: leadData.email || null,
                    servico: leadData.servico || null,
                    mensagem: leadData.mensagem || null,
                    status: 'novo',
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.error('Erro ao salvar lead no Supabase:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Exceção ao conectar com Supabase:', err);
        return { success: false, error: err };
    }
}
