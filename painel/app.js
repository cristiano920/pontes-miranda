import { requireAuth, logoutUser } from './auth.js';
import { 
    getAllTags, 
    getTagStats, 
    createTag, 
    updateTag, 
    toggleTagStatus, 
    duplicateTag, 
    deleteTag, 
    TAG_PRESETS 
} from './tags.js';
import {
    getAllLinks,
    getLinkStats,
    createLink,
    updateLink,
    toggleLinkStatus,
    moveLinkOrder,
    duplicateLink,
    resetLinkClicks,
    deleteLink,
    AVAILABLE_ICONS
} from './linksManager.js';
import {
    getAllUsers,
    getCurrentUserProfile,
    getUserStats,
    createUser,
    updateUser,
    toggleUserStatus,
    deleteUser,
    generateStrongPassword,
    SYSTEM_MENUS
} from './usersManager.js';

// Application State
let currentUser = null;
let currentUserProfile = {
    role: 'admin',
    allowed_menus: ['dashboard', 'links', 'tags', 'usuarios']
};
let allTagsList = [];
let allLinksList = [];
let allUsersList = [];

let currentTagToDelete = null;
let currentLinkToDelete = null;
let currentLinkToReset = null;
let currentUserToDelete = null;

// Layout DOM Elements
const navDashboard = document.getElementById('navDashboard');
const navLinks = document.getElementById('navLinks');
const navTags = document.getElementById('navTags');
const navUsers = document.getElementById('navUsers');

const viewDashboard = document.getElementById('viewDashboard');
const viewLinks = document.getElementById('viewLinks');
const viewTags = document.getElementById('viewTags');
const viewUsers = document.getElementById('viewUsers');

const headerTitle = document.getElementById('headerTitle');
const userEmailSpan = document.getElementById('userEmail');
const userAvatarDiv = document.getElementById('userAvatar');
const logoutBtn = document.getElementById('logoutBtn');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const adminSidebar = document.getElementById('adminSidebar');

// Dashboard Elements
const dashTotalClicks = document.getElementById('dashTotalClicks');
const dashActiveLinksDesc = document.getElementById('dashActiveLinksDesc');
const dashTotalLinks = document.getElementById('dashTotalLinks');
const dashTotalTags = document.getElementById('dashTotalTags');
const dashActiveTags = document.getElementById('dashActiveTags');
const dashTotalUsers = document.getElementById('dashTotalUsers');
const dashQuickAddLinkBtn = document.getElementById('dashQuickAddLinkBtn');

// Users Management Elements
const usersTableBody = document.getElementById('usersTableBody');
const userSearchInput = document.getElementById('userSearchInput');
const openAddUserModalBtn = document.getElementById('openAddUserModalBtn');
const userModal = document.getElementById('userModal');
const userModalTitle = document.getElementById('userModalTitle');
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmailInput');
const userPasswordInput = document.getElementById('userPasswordInput');
const userPasswordHint = document.getElementById('userPasswordHint');
const toggleUserPasswordBtn = document.getElementById('toggleUserPasswordBtn');
const generatePasswordBtn = document.getElementById('generatePasswordBtn');
const userRoleSelect = document.getElementById('userRole');
const userIsActiveCheckbox = document.getElementById('userIsActive');
const saveUserBtn = document.getElementById('saveUserBtn');
const saveUserBtnText = document.getElementById('saveUserBtnText');
const saveUserBtnSpinner = document.getElementById('saveUserBtnSpinner');
const closeUserModalBtn = document.getElementById('closeUserModalBtn');
const cancelUserBtn = document.getElementById('cancelUserBtn');

// Delete User Modal Elements
const deleteUserConfirmModal = document.getElementById('deleteUserConfirmModal');
const deleteUserEmailText = document.getElementById('deleteUserEmailText');
const confirmDeleteUserBtn = document.getElementById('confirmDeleteUserBtn');
const closeDeleteUserModalBtn = document.getElementById('closeDeleteUserModalBtn');
const cancelDeleteUserBtn = document.getElementById('cancelDeleteUserBtn');

// Links Management Elements
const linksTableBody = document.getElementById('linksTableBody');
const linkSearchInput = document.getElementById('linkSearchInput');
const openAddLinkModalBtn = document.getElementById('openAddLinkModalBtn');
const linkModal = document.getElementById('linkModal');
const linkModalTitle = document.getElementById('linkModalTitle');
const linkForm = document.getElementById('linkForm');
const linkIdInput = document.getElementById('linkId');
const linkTitleInput = document.getElementById('linkTitle');
const linkUrlInput = document.getElementById('linkUrl');
const linkIconSelect = document.getElementById('linkIcon');
const linkIsFeaturedCheckbox = document.getElementById('linkIsFeatured');
const linkIsActiveCheckbox = document.getElementById('linkIsActive');
const saveLinkBtn = document.getElementById('saveLinkBtn');
const saveLinkBtnText = document.getElementById('saveLinkBtnText');
const saveLinkBtnSpinner = document.getElementById('saveLinkBtnSpinner');
const closeLinkModalBtn = document.getElementById('closeLinkModalBtn');
const cancelLinkBtn = document.getElementById('cancelLinkBtn');

// Delete Link Modal Elements
const deleteLinkConfirmModal = document.getElementById('deleteLinkConfirmModal');
const deleteLinkTitle = document.getElementById('deleteLinkTitle');
const confirmDeleteLinkBtn = document.getElementById('confirmDeleteLinkBtn');
const closeDeleteLinkModalBtn = document.getElementById('closeDeleteLinkModalBtn');
const cancelDeleteLinkBtn = document.getElementById('cancelDeleteLinkBtn');

// Reset Clicks Modal Elements
const resetClicksModal = document.getElementById('resetClicksModal');
const resetClicksLinkTitle = document.getElementById('resetClicksLinkTitle');
const confirmResetClicksBtn = document.getElementById('confirmResetClicksBtn');
const closeResetClicksModalBtn = document.getElementById('closeResetClicksModalBtn');
const cancelResetClicksBtn = document.getElementById('cancelResetClicksBtn');

// Tags Table & Filters Elements
const tagsTableBody = document.getElementById('tagsTableBody');
const tagSearchInput = document.getElementById('tagSearchInput');
const locationFilter = document.getElementById('locationFilter');
const openAddTagModalBtn = document.getElementById('openAddTagModalBtn');

// Tag Create/Edit Modal Elements
const tagModal = document.getElementById('tagModal');
const tagModalTitle = document.getElementById('tagModalTitle');
const tagForm = document.getElementById('tagForm');
const tagIdInput = document.getElementById('tagId');
const tagProviderSelect = document.getElementById('tagProvider');
const tagNameInput = document.getElementById('tagName');
const presetIdGroup = document.getElementById('presetIdGroup');
const presetIdInput = document.getElementById('presetIdInput');
const presetIdLabel = document.getElementById('presetIdLabel');
const generatePresetBtn = document.getElementById('generatePresetBtn');
const tagLocationSelect = document.getElementById('tagLocation');
const tagTargetPagesSelect = document.getElementById('tagTargetPages');
const tagCodeTextarea = document.getElementById('tagCode');
const tagIsActiveCheckbox = document.getElementById('tagIsActive');
const saveTagBtn = document.getElementById('saveTagBtn');
const saveTagBtnText = document.getElementById('saveTagBtnText');
const saveTagBtnSpinner = document.getElementById('saveTagBtnSpinner');
const closeTagModalBtn = document.getElementById('closeTagModalBtn');
const cancelTagBtn = document.getElementById('cancelTagBtn');

// View Code Modal Elements
const viewCodeModal = document.getElementById('viewCodeModal');
const viewCodeTitle = document.getElementById('viewCodeTitle');
const viewCodeContent = document.getElementById('viewCodeContent');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const closeViewCodeBtn = document.getElementById('closeViewCodeBtn');
const closeViewCodeFooterBtn = document.getElementById('closeViewCodeFooterBtn');

// Delete Tag Confirm Modal Elements
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const deleteTagName = document.getElementById('deleteTagName');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();

    // 1. Check Authentication Guard
    currentUser = await requireAuth((authUser) => {
        currentUser = authUser;
    });

    if (!currentUser) return; // Will redirect

    // 2. Load User Profile & Allowed Menus
    const profileRes = await getCurrentUserProfile(currentUser.id);
    if (profileRes.success && profileRes.data) {
        currentUserProfile = profileRes.data;
    }

    setupUserInterface(currentUser, currentUserProfile);

    // 3. Setup Navigation & Permissions
    setupNavigation();
    setupModals();
    setupUserEvents();
    setupLinkEvents();
    setupTagEvents();
    setupFilters();

    // 4. Load Initial Data
    await refreshAllData();
});

function setupUserInterface(user, profile) {
    if (userEmailSpan) {
        const displayName = profile?.name ? `${profile.name} (${user.email})` : user.email;
        userEmailSpan.textContent = displayName || 'Administrador';
        const initials = ((profile?.name || user.email || 'PM').substring(0, 2)).toUpperCase();
        userAvatarDiv.textContent = initials;
    }

    // Apply allowed_menus filter to sidebar navigation items
    const allowed = profile?.allowed_menus || ['dashboard'];
    
    if (navDashboard) navDashboard.style.display = allowed.includes('dashboard') ? 'flex' : 'none';
    if (navLinks) navLinks.style.display = allowed.includes('links') ? 'flex' : 'none';
    if (navTags) navTags.style.display = allowed.includes('tags') ? 'flex' : 'none';
    if (navUsers) navUsers.style.display = allowed.includes('usuarios') ? 'flex' : 'none';

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente encerrar a sessão do painel?')) {
                logoutUser();
            }
        });
    }

    if (mobileSidebarToggle && adminSidebar) {
        mobileSidebarToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                adminSidebar.classList.contains('open') && 
                !adminSidebar.contains(e.target) && 
                !mobileSidebarToggle.contains(e.target)) {
                adminSidebar.classList.remove('open');
            }
        });
    }
}

// Navigation & Tab Switching with Permission Enforcement
function setupNavigation() {
    const allowed = currentUserProfile?.allowed_menus || ['dashboard'];

    function switchView(viewName) {
        // Enforce permission: if user is not allowed to view this menu, fallback to first allowed menu
        if (!allowed.includes(viewName)) {
            viewName = allowed[0] || 'dashboard';
        }

        [navDashboard, navLinks, navTags, navUsers].forEach(n => n && n.classList.remove('active'));
        [viewDashboard, viewLinks, viewTags, viewUsers].forEach(v => v && v.classList.remove('active'));

        if (viewName === 'links' && allowed.includes('links')) {
            navLinks.classList.add('active');
            viewLinks.classList.add('active');
            headerTitle.textContent = 'Página de Links (/links)';
            window.location.hash = 'links';
        } else if (viewName === 'tags' && allowed.includes('tags')) {
            navTags.classList.add('active');
            viewTags.classList.add('active');
            headerTitle.textContent = 'Tags & Scripts';
            window.location.hash = 'tags';
        } else if (viewName === 'usuarios' && allowed.includes('usuarios')) {
            navUsers.classList.add('active');
            viewUsers.classList.add('active');
            headerTitle.textContent = 'Usuários & Permissões';
            window.location.hash = 'usuarios';
        } else {
            navDashboard.classList.add('active');
            viewDashboard.classList.add('active');
            headerTitle.textContent = 'Dashboard';
            window.location.hash = 'dashboard';
        }

        if (window.innerWidth <= 768) {
            adminSidebar.classList.remove('open');
        }
        lucide.createIcons();
    }

    if (navDashboard) navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('dashboard'); });
    if (navLinks) navLinks.addEventListener('click', (e) => { e.preventDefault(); switchView('links'); });
    if (navTags) navTags.addEventListener('click', (e) => { e.preventDefault(); switchView('tags'); });
    if (navUsers) navUsers.addEventListener('click', (e) => { e.preventDefault(); switchView('usuarios'); });

    if (dashQuickAddLinkBtn) {
        dashQuickAddLinkBtn.addEventListener('click', () => {
            switchView('links');
            openLinkModal();
        });
    }

    // Determine initial view according to current hash and allowed permissions
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && allowed.includes(initialHash)) {
        switchView(initialHash);
    } else {
        switchView(allowed[0] || 'dashboard');
    }
}

// Refresh Data across modules
async function refreshAllData() {
    const allowed = currentUserProfile?.allowed_menus || ['dashboard'];
    const tasks = [loadDashboardStats()];

    if (allowed.includes('links')) tasks.push(loadLinksList());
    if (allowed.includes('tags')) tasks.push(loadTagsList());
    if (allowed.includes('usuarios')) tasks.push(loadUsersList());

    await Promise.all(tasks);
}

async function loadDashboardStats() {
    const [tagStatsRes, linkStatsRes, userStatsRes] = await Promise.all([
        getTagStats(),
        getLinkStats(),
        getUserStats()
    ]);

    if (tagStatsRes.success) {
        dashTotalTags.textContent = tagStatsRes.stats.total;
        dashActiveTags.textContent = `${tagStatsRes.stats.activeTotal} scripts ativos`;
    }

    if (linkStatsRes.success) {
        dashTotalClicks.textContent = linkStatsRes.stats.totalClicks;
        dashActiveLinksDesc.textContent = `${linkStatsRes.stats.activeCount} botões ativos`;
        dashTotalLinks.textContent = linkStatsRes.stats.total;
    }

    if (userStatsRes.success && dashTotalUsers) {
        dashTotalUsers.textContent = userStatsRes.stats.total;
    }
}

// ==========================================================================
// 👥 USERS & PERMISSIONS MODULE
// ==========================================================================
async function loadUsersList() {
    const res = await getAllUsers();
    if (!res.success) {
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--adm-accent-rose); padding: 30px;">
                    ${res.error}
                </td>
            </tr>
        `;
        return;
    }

    allUsersList = res.data;
    renderUsersTable();
}

function renderUsersTable() {
    const query = userSearchInput.value.toLowerCase().trim();

    const filtered = allUsersList.filter(user => {
        return !query || 
            (user.name && user.name.toLowerCase().includes(query)) || 
            user.email.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i data-lucide="users"></i>
                        <p style="font-weight: 600; color: var(--adm-text-primary); margin-bottom: 4px;">Nenhum usuário encontrado</p>
                        <p style="font-size: 0.85rem;">Clique em "Novo Usuário" para cadastrar uma nova conta de acesso.</p>
                    </div>
                </td>
            </tr>
        `;
        lucide.createIcons();
        return;
    }

    usersTableBody.innerHTML = filtered.map(user => {
        const isMaster = user.email === 'pontesmirandaadvogados@gmail.com';
        const roleLabel = isMaster ? 'Super Admin' : (user.role === 'admin' ? 'Administrador' : 'Editor');
        const roleClass = isMaster ? 'badge-role-superadmin' : (user.role === 'admin' ? 'badge-role-admin' : 'badge-role-editor');
        const initials = ((user.name || user.email || 'PM').substring(0, 2)).toUpperCase();

        const menuBadges = (user.allowed_menus || []).map(m => {
            const menuDef = SYSTEM_MENUS.find(sm => sm.id === m);
            return `<span class="badge-menu"><i data-lucide="${menuDef?.icon || 'check'}" style="width: 11px; height: 11px;"></i> ${escapeHtml(menuDef?.name || m)}</span>`;
        }).join(' ');

        return `
            <tr data-id="${user.id}">
                <td>
                    <div class="tag-name-cell">
                        <div class="user-avatar" style="width: 34px; height: 34px; font-size: 0.82rem;">${escapeHtml(initials)}</div>
                        <div>
                            <div class="tag-meta-name">${escapeHtml(user.name || 'Sem nome')} ${isMaster ? '⭐' : ''}</div>
                            <div class="tag-meta-sub">${escapeHtml(user.email)}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge ${roleClass}">${roleLabel}</span>
                </td>
                <td>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${menuBadges || '<span style="color: var(--adm-text-muted); font-size: 0.8rem;">Nenhum menu liberado</span>'}
                    </div>
                </td>
                <td>
                    <label class="switch" title="${user.is_active ? 'Conta Ativa' : 'Conta Inativa'}">
                        <input type="checkbox" class="user-status-toggle" data-id="${user.id}" ${user.is_active ? 'checked' : ''} ${isMaster ? 'disabled' : ''}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td style="text-align: right;">
                    <div class="action-buttons-group" style="justify-content: flex-end;">
                        <button class="btn-icon-action edit-user-btn" data-id="${user.id}" title="Editar Usuário e Permissões">
                            <i data-lucide="edit-3" style="width: 15px; height: 15px;"></i>
                        </button>
                        ${!isMaster ? `
                        <button class="btn-icon-action danger delete-user-btn" data-id="${user.id}" title="Excluir Usuário">
                            <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    lucide.createIcons();
    attachUserTableEvents();
}

function attachUserTableEvents() {
    document.querySelectorAll('.user-status-toggle').forEach(toggle => {
        toggle.addEventListener('change', async (e) => {
            const id = e.target.getAttribute('data-id');
            const isActive = e.target.checked;
            
            const res = await toggleUserStatus(id, isActive);
            if (res.success) {
                showToast(isActive ? 'Usuário ativado com sucesso!' : 'Acesso do usuário suspenso!', 'success');
                const user = allUsersList.find(u => u.id === id);
                if (user) user.is_active = isActive;
                loadDashboardStats();
            } else {
                showToast(res.error || 'Erro ao alterar status', 'error');
                e.target.checked = !isActive;
            }
        });
    });

    document.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const user = allUsersList.find(u => u.id === id);
            if (!user) return;
            openUserModal(user);
        });
    });

    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const user = allUsersList.find(u => u.id === id);
            if (!user) return;

            currentUserToDelete = user;
            deleteUserEmailText.textContent = `${user.name ? user.name + ' (' + user.email + ')' : user.email}`;
            deleteUserConfirmModal.classList.add('active');
        });
    });
}

function setupUserEvents() {
    if (openAddUserModalBtn) openAddUserModalBtn.addEventListener('click', () => openUserModal());
    if (closeUserModalBtn) closeUserModalBtn.addEventListener('click', () => userModal.classList.remove('active'));
    if (cancelUserBtn) cancelUserBtn.addEventListener('click', () => userModal.classList.remove('active'));

    // Olho mágico toggle password visibility
    if (toggleUserPasswordBtn && userPasswordInput) {
        toggleUserPasswordBtn.addEventListener('click', () => {
            const isPass = userPasswordInput.type === 'password';
            userPasswordInput.type = isPass ? 'text' : 'password';
            toggleUserPasswordBtn.innerHTML = isPass 
                ? '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>' 
                : '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>';
            lucide.createIcons();
        });
    }

    // Generate strong password
    if (generatePasswordBtn && userPasswordInput) {
        generatePasswordBtn.addEventListener('click', () => {
            const pass = generateStrongPassword();
            userPasswordInput.type = 'text';
            userPasswordInput.value = pass;
            if (toggleUserPasswordBtn) {
                toggleUserPasswordBtn.innerHTML = '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>';
                lucide.createIcons();
            }
            showToast('Senha forte gerada!', 'info');
        });
    }

    // Delete User Confirm
    if (closeDeleteUserModalBtn) closeDeleteUserModalBtn.addEventListener('click', () => deleteUserConfirmModal.classList.remove('active'));
    if (cancelDeleteUserBtn) cancelDeleteUserBtn.addEventListener('click', () => deleteUserConfirmModal.classList.remove('active'));

    if (confirmDeleteUserBtn) {
        confirmDeleteUserBtn.addEventListener('click', async () => {
            if (!currentUserToDelete) return;
            confirmDeleteUserBtn.disabled = true;

            const res = await deleteUser(currentUserToDelete.id);
            confirmDeleteUserBtn.disabled = false;
            deleteUserConfirmModal.classList.remove('active');

            if (res.success) {
                showToast('Usuário excluído com sucesso!', 'success');
                currentUserToDelete = null;
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao excluir usuário', 'error');
            }
        });
    }

    // User Form Submit
    if (userForm) {
        userForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = userIdInput.value;
            const name = userNameInput.value.trim();
            const email = userEmailInput.value.trim();
            const password = userPasswordInput.value;
            const role = userRoleSelect.value;
            const isActive = userIsActiveCheckbox.checked;

            // Collect selected menus
            const allowed_menus = [];
            if (document.getElementById('perm_dashboard').checked) allowed_menus.push('dashboard');
            if (document.getElementById('perm_links').checked) allowed_menus.push('links');
            if (document.getElementById('perm_tags').checked) allowed_menus.push('tags');
            if (document.getElementById('perm_usuarios').checked) allowed_menus.push('usuarios');

            if (allowed_menus.length === 0) {
                showToast('Selecione pelo menos um menu permitido para o usuário.', 'error');
                return;
            }

            if (!id && (!password || password.length < 6)) {
                showToast('A senha inicial é obrigatória (mínimo 6 caracteres).', 'error');
                return;
            }

            saveUserBtn.disabled = true;
            saveUserBtnText.style.display = 'none';
            saveUserBtnSpinner.style.display = 'inline-block';

            let res;
            if (id) {
                res = await updateUser(id, { name, email, password, role, allowed_menus, is_active: isActive });
            } else {
                res = await createUser({ name, email, password, role, allowed_menus });
            }

            saveUserBtn.disabled = false;
            saveUserBtnText.style.display = 'inline-block';
            saveUserBtnSpinner.style.display = 'none';

            if (res.success) {
                showToast(id ? 'Usuário atualizado com sucesso!' : 'Novo usuário criado e auto-confirmado!', 'success');
                userModal.classList.remove('active');
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao salvar usuário', 'error');
            }
        });
    }
}

function openUserModal(user = null) {
    userForm.reset();

    if (user) {
        userModalTitle.textContent = 'Editar Usuário e Permissões';
        userIdInput.value = user.id;
        userNameInput.value = user.name || '';
        userEmailInput.value = user.email;
        userPasswordInput.value = '';
        userPasswordInput.required = false;
        userPasswordHint.textContent = 'Deixe a senha em branco para manter a senha atual do usuário.';
        userRoleSelect.value = user.role || 'editor';
        userIsActiveCheckbox.checked = user.is_active;

        const menus = user.allowed_menus || [];
        document.getElementById('perm_dashboard').checked = menus.includes('dashboard');
        document.getElementById('perm_links').checked = menus.includes('links');
        document.getElementById('perm_tags').checked = menus.includes('tags');
        document.getElementById('perm_usuarios').checked = menus.includes('usuarios');
    } else {
        userModalTitle.textContent = 'Cadastrar Novo Usuário';
        userIdInput.value = '';
        userNameInput.value = '';
        userEmailInput.value = '';
        userPasswordInput.value = '';
        userPasswordInput.required = true;
        userPasswordHint.textContent = 'Mínimo de 6 caracteres. A conta será auto-confirmada no Supabase.';
        userRoleSelect.value = 'editor';
        userIsActiveCheckbox.checked = true;

        document.getElementById('perm_dashboard').checked = true;
        document.getElementById('perm_links').checked = true;
        document.getElementById('perm_tags').checked = true;
        document.getElementById('perm_usuarios').checked = false;
    }

    userPasswordInput.type = 'password';
    if (toggleUserPasswordBtn) {
        toggleUserPasswordBtn.innerHTML = '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>';
    }

    userModal.classList.add('active');
    lucide.createIcons();
}

// ==========================================================================
// 🔗 LINKS MANAGER MODULE
// ==========================================================================
async function loadLinksList() {
    const res = await getAllLinks();
    if (!res.success) {
        linksTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--adm-accent-rose); padding: 30px;">
                    ${res.error}
                </td>
            </tr>
        `;
        return;
    }

    allLinksList = res.data;
    renderLinksTable();
}

function renderLinksTable() {
    const query = linkSearchInput.value.toLowerCase().trim();

    const filtered = allLinksList.filter(link => {
        return !query || 
            link.title.toLowerCase().includes(query) || 
            link.url.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
        linksTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i data-lucide="link-2"></i>
                        <p style="font-weight: 600; color: var(--adm-text-primary); margin-bottom: 4px;">Nenhum botão de link cadastrado</p>
                        <p style="font-size: 0.85rem;">Clique em "Adicionar Novo Botão" para criar o primeiro link da sua bio.</p>
                    </div>
                </td>
            </tr>
        `;
        lucide.createIcons();
        return;
    }

    linksTableBody.innerHTML = filtered.map((link, index) => {
        const iconDef = AVAILABLE_ICONS.find(i => i.id === link.icon) || { iconName: 'link', name: 'Link' };
        const isFirst = index === 0;
        const isLast = index === filtered.length - 1;

        return `
            <tr data-id="${link.id}">
                <td style="text-align: center;">
                    <div class="order-btn-group">
                        <button class="btn-order-action move-up-btn" data-index="${index}" ${isFirst ? 'disabled' : ''} title="Mover para cima">
                            <i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button class="btn-order-action move-down-btn" data-index="${index}" ${isLast ? 'disabled' : ''} title="Mover para baixo">
                            <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <div class="tag-name-cell">
                        <div class="provider-icon-badge" title="${escapeHtml(iconDef.name)}">
                            <i data-lucide="${iconDef.iconName}" style="width: 17px; height: 17px;"></i>
                        </div>
                        <div>
                            <div class="tag-meta-name">${escapeHtml(link.title)}</div>
                            <div class="tag-meta-sub" style="max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                <a href="${escapeHtml(link.url)}" target="_blank" style="color: var(--adm-text-muted);">${escapeHtml(link.url)}</a>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="clicks-badge">
                            <i data-lucide="mouse-pointer-click"></i>
                            <span>${link.clicks_count || 0}</span>
                        </span>
                        <button class="btn-icon-action reset-clicks-btn" data-id="${link.id}" title="Zerar Cliques">
                            <i data-lucide="rotate-ccw" style="width: 13px; height: 13px;"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <span class="badge ${link.is_featured ? 'badge-featured' : 'badge-standard'}">
                        ${link.is_featured ? '⭐ Destaque' : 'Padrão'}
                    </span>
                </td>
                <td>
                    <label class="switch" title="${link.is_active ? 'Link Ativo na Página' : 'Link Oculto'}">
                        <input type="checkbox" class="link-status-toggle" data-id="${link.id}" ${link.is_active ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td style="text-align: right;">
                    <div class="action-buttons-group" style="justify-content: flex-end;">
                        <button class="btn-icon-action duplicate-link-btn" data-id="${link.id}" title="Duplicar Botão">
                            <i data-lucide="copy" style="width: 15px; height: 15px;"></i>
                        </button>
                        <button class="btn-icon-action edit-link-btn" data-id="${link.id}" title="Editar Botão">
                            <i data-lucide="edit-3" style="width: 15px; height: 15px;"></i>
                        </button>
                        <button class="btn-icon-action danger delete-link-btn" data-id="${link.id}" title="Excluir Botão">
                            <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    lucide.createIcons();
    attachLinkTableEvents();
}

function attachLinkTableEvents() {
    document.querySelectorAll('.move-up-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-index'), 10);
            const res = await moveLinkOrder(allLinksList, idx, 'up');
            if (res.success) {
                await loadLinksList();
            } else {
                showToast(res.error || 'Erro ao reordenar', 'error');
            }
        });
    });

    document.querySelectorAll('.move-down-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-index'), 10);
            const res = await moveLinkOrder(allLinksList, idx, 'down');
            if (res.success) {
                await loadLinksList();
            } else {
                showToast(res.error || 'Erro ao reordenar', 'error');
            }
        });
    });

    document.querySelectorAll('.link-status-toggle').forEach(toggle => {
        toggle.addEventListener('change', async (e) => {
            const id = e.target.getAttribute('data-id');
            const isActive = e.target.checked;
            
            const res = await toggleLinkStatus(id, isActive);
            if (res.success) {
                showToast(isActive ? 'Botão ativado no site!' : 'Botão ocultado!', 'success');
                const link = allLinksList.find(l => l.id === id);
                if (link) link.is_active = isActive;
                loadDashboardStats();
            } else {
                showToast(res.error || 'Erro ao alterar status', 'error');
                e.target.checked = !isActive;
            }
        });
    });

    document.querySelectorAll('.reset-clicks-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const link = allLinksList.find(l => l.id === id);
            if (!link) return;

            currentLinkToReset = link;
            resetClicksLinkTitle.textContent = link.title;
            resetClicksModal.classList.add('active');
        });
    });

    document.querySelectorAll('.duplicate-link-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const link = allLinksList.find(l => l.id === id);
            if (!link) return;

            btn.disabled = true;
            const res = await duplicateLink(link);
            btn.disabled = false;

            if (res.success) {
                showToast('Botão duplicado com sucesso!', 'success');
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao duplicar link', 'error');
            }
        });
    });

    document.querySelectorAll('.edit-link-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const link = allLinksList.find(l => l.id === id);
            if (!link) return;

            openLinkModal(link);
        });
    });

    document.querySelectorAll('.delete-link-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const link = allLinksList.find(l => l.id === id);
            if (!link) return;

            currentLinkToDelete = link;
            deleteLinkTitle.textContent = link.title;
            deleteLinkConfirmModal.classList.add('active');
        });
    });
}

function setupLinkEvents() {
    if (openAddLinkModalBtn) openAddLinkModalBtn.addEventListener('click', () => openLinkModal());
    if (closeLinkModalBtn) closeLinkModalBtn.addEventListener('click', () => linkModal.classList.remove('active'));
    if (cancelLinkBtn) cancelLinkBtn.addEventListener('click', () => linkModal.classList.remove('active'));

    if (closeDeleteLinkModalBtn) closeDeleteLinkModalBtn.addEventListener('click', () => deleteLinkConfirmModal.classList.remove('active'));
    if (cancelDeleteLinkBtn) cancelDeleteLinkBtn.addEventListener('click', () => deleteLinkConfirmModal.classList.remove('active'));

    if (confirmDeleteLinkBtn) {
        confirmDeleteLinkBtn.addEventListener('click', async () => {
            if (!currentLinkToDelete) return;
            confirmDeleteLinkBtn.disabled = true;

            const res = await deleteLink(currentLinkToDelete.id);
            confirmDeleteLinkBtn.disabled = false;
            deleteLinkConfirmModal.classList.remove('active');

            if (res.success) {
                showToast('Botão excluído com sucesso!', 'success');
                currentLinkToDelete = null;
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao excluir link', 'error');
            }
        });
    }

    if (closeResetClicksModalBtn) closeResetClicksModalBtn.addEventListener('click', () => resetClicksModal.classList.remove('active'));
    if (cancelResetClicksBtn) cancelResetClicksBtn.addEventListener('click', () => resetClicksModal.classList.remove('active'));

    if (confirmResetClicksBtn) {
        confirmResetClicksBtn.addEventListener('click', async () => {
            if (!currentLinkToReset) return;
            confirmResetClicksBtn.disabled = true;

            const res = await resetLinkClicks(currentLinkToReset.id);
            confirmResetClicksBtn.disabled = false;
            resetClicksModal.classList.remove('active');

            if (res.success) {
                showToast('Contador de cliques zerado!', 'success');
                currentLinkToReset = null;
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao zerar cliques', 'error');
            }
        });
    }

    if (linkForm) {
        linkForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = linkIdInput.value;
            const title = linkTitleInput.value.trim();
            const url = linkUrlInput.value.trim();
            const icon = linkIconSelect.value;
            const isFeatured = linkIsFeaturedCheckbox.checked;
            const isActive = linkIsActiveCheckbox.checked;

            if (!title || !url) {
                showToast('Preencha os campos obrigatórios.', 'error');
                return;
            }

            saveLinkBtn.disabled = true;
            saveLinkBtnText.style.display = 'none';
            saveLinkBtnSpinner.style.display = 'inline-block';

            let res;
            if (id) {
                res = await updateLink(id, { title, url, icon, is_featured: isFeatured, is_active: isActive });
            } else {
                res = await createLink({ title, url, icon, is_featured: isFeatured, is_active: isActive });
            }

            saveLinkBtn.disabled = false;
            saveLinkBtnText.style.display = 'inline-block';
            saveLinkBtnSpinner.style.display = 'none';

            if (res.success) {
                showToast(id ? 'Botão atualizado com sucesso!' : 'Novo botão cadastrado com sucesso!', 'success');
                linkModal.classList.remove('active');
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao salvar botão', 'error');
            }
        });
    }
}

function openLinkModal(link = null) {
    linkForm.reset();

    if (link) {
        linkModalTitle.textContent = 'Editar Botão de Link';
        linkIdInput.value = link.id;
        linkTitleInput.value = link.title;
        linkUrlInput.value = link.url;
        linkIconSelect.value = link.icon || 'link';
        linkIsFeaturedCheckbox.checked = link.is_featured || false;
        linkIsActiveCheckbox.checked = link.is_active;
    } else {
        linkModalTitle.textContent = 'Cadastrar Novo Botão';
        linkIdInput.value = '';
        linkIconSelect.value = 'whatsapp';
        linkIsFeaturedCheckbox.checked = false;
        linkIsActiveCheckbox.checked = true;
    }

    linkModal.classList.add('active');
    lucide.createIcons();
}

// ==========================================================================
// 🏷️ TAGS & SCRIPTS MODULE
// ==========================================================================
async function loadTagsList() {
    const res = await getAllTags();
    if (!res.success) {
        tagsTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--adm-accent-rose); padding: 30px;">
                    ${res.error}
                </td>
            </tr>
        `;
        return;
    }

    allTagsList = res.data;
    renderTagsTable();
}

function renderTagsTable() {
    const query = tagSearchInput.value.toLowerCase().trim();
    const locFilter = locationFilter.value;

    const filtered = allTagsList.filter(tag => {
        const matchesQuery = !query || 
            tag.name.toLowerCase().includes(query) || 
            (tag.provider && tag.provider.toLowerCase().includes(query)) ||
            (tag.code && tag.code.toLowerCase().includes(query));
        
        const matchesLoc = locFilter === 'all' || tag.location === locFilter;

        return matchesQuery && matchesLoc;
    });

    if (filtered.length === 0) {
        tagsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i data-lucide="tags"></i>
                        <p style="font-weight: 600; color: var(--adm-text-primary); margin-bottom: 4px;">Nenhuma tag encontrada</p>
                        <p style="font-size: 0.85rem;">Clique em "Adicionar Nova Tag" para cadastrar pixels e scripts.</p>
                    </div>
                </td>
            </tr>
        `;
        lucide.createIcons();
        return;
    }

    tagsTableBody.innerHTML = filtered.map(tag => {
        const isHead = tag.location === 'head';
        const locLabel = isHead ? '&lt;head&gt;' : (tag.location === 'body_start' ? '&lt;body&gt; Início' : '&lt;body&gt; Fim');
        const locBadgeClass = isHead ? 'badge-head' : 'badge-body';
        const providerName = TAG_PRESETS[tag.provider]?.name || tag.provider || 'Personalizado';
        const initial = (tag.provider || 'C').substring(0, 2).toUpperCase();

        const pagesLabel = tag.target_pages === 'all' || !tag.target_pages ? 'Todas as páginas' : tag.target_pages;

        return `
            <tr data-id="${tag.id}">
                <td>
                    <div class="tag-name-cell">
                        <div class="provider-icon-badge">${escapeHtml(initial)}</div>
                        <div>
                            <div class="tag-meta-name">${escapeHtml(tag.name)}</div>
                            <div class="tag-meta-sub">${escapeHtml(providerName)}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge ${locBadgeClass}">${locLabel}</span>
                </td>
                <td>
                    <span style="font-size: 0.85rem; color: var(--adm-text-secondary);">${escapeHtml(pagesLabel)}</span>
                </td>
                <td>
                    <label class="switch" title="${tag.is_active ? 'Tag Ativa' : 'Tag Inativa'}">
                        <input type="checkbox" class="tag-status-toggle" data-id="${tag.id}" ${tag.is_active ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td style="text-align: right;">
                    <div class="action-buttons-group" style="justify-content: flex-end;">
                        <button class="btn-icon-action view-code-btn" data-id="${tag.id}" title="Visualizar Código">
                            <i data-lucide="eye" style="width: 15px; height: 15px;"></i>
                        </button>
                        <button class="btn-icon-action duplicate-tag-btn" data-id="${tag.id}" title="Duplicar Tag">
                            <i data-lucide="copy" style="width: 15px; height: 15px;"></i>
                        </button>
                        <button class="btn-icon-action edit-tag-btn" data-id="${tag.id}" title="Editar Tag">
                            <i data-lucide="edit-3" style="width: 15px; height: 15px;"></i>
                        </button>
                        <button class="btn-icon-action danger delete-tag-btn" data-id="${tag.id}" title="Excluir Tag">
                            <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    lucide.createIcons();
    attachTagTableEvents();
}

function attachTagTableEvents() {
    document.querySelectorAll('.tag-status-toggle').forEach(toggle => {
        toggle.addEventListener('change', async (e) => {
            const id = e.target.getAttribute('data-id');
            const isActive = e.target.checked;
            
            const res = await toggleTagStatus(id, isActive);
            if (res.success) {
                showToast(isActive ? 'Tag ativada com sucesso!' : 'Tag desativada!', 'success');
                const tag = allTagsList.find(t => t.id === id);
                if (tag) tag.is_active = isActive;
                loadDashboardStats();
            } else {
                showToast(res.error || 'Erro ao alterar status', 'error');
                e.target.checked = !isActive;
            }
        });
    });

    document.querySelectorAll('.view-code-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const tag = allTagsList.find(t => t.id === id);
            if (!tag) return;

            viewCodeTitle.textContent = `Código: ${tag.name}`;
            viewCodeContent.textContent = tag.code;
            viewCodeModal.classList.add('active');
            lucide.createIcons();
        });
    });

    document.querySelectorAll('.duplicate-tag-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const tag = allTagsList.find(t => t.id === id);
            if (!tag) return;

            btn.disabled = true;
            const res = await duplicateTag(tag);
            btn.disabled = false;

            if (res.success) {
                showToast('Tag duplicada com sucesso!', 'success');
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao duplicar tag', 'error');
            }
        });
    });

    document.querySelectorAll('.edit-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const tag = allTagsList.find(t => t.id === id);
            if (!tag) return;

            openTagModal(tag);
        });
    });

    document.querySelectorAll('.delete-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const tag = allTagsList.find(t => t.id === id);
            if (!tag) return;

            currentTagToDelete = tag;
            deleteTagName.textContent = tag.name;
            deleteConfirmModal.classList.add('active');
        });
    });
}

function setupTagEvents() {
    if (openAddTagModalBtn) openAddTagModalBtn.addEventListener('click', () => openTagModal());
    if (closeTagModalBtn) closeTagModalBtn.addEventListener('click', () => tagModal.classList.remove('active'));
    if (cancelTagBtn) cancelTagBtn.addEventListener('click', () => tagModal.classList.remove('active'));

    if (closeViewCodeBtn) closeViewCodeBtn.addEventListener('click', () => viewCodeModal.classList.remove('active'));
    if (closeViewCodeFooterBtn) closeViewCodeFooterBtn.addEventListener('click', () => viewCodeModal.classList.remove('active'));

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(viewCodeContent.textContent || '').then(() => {
                showToast('Código copiado para a área de transferência!', 'info');
            });
        });
    }

    if (closeDeleteModalBtn) closeDeleteModalBtn.addEventListener('click', () => deleteConfirmModal.classList.remove('active'));
    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => deleteConfirmModal.classList.remove('active'));

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if (!currentTagToDelete) return;
            confirmDeleteBtn.disabled = true;

            const res = await deleteTag(currentTagToDelete.id);
            confirmDeleteBtn.disabled = false;
            deleteConfirmModal.classList.remove('active');

            if (res.success) {
                showToast('Tag excluída com sucesso!', 'success');
                currentTagToDelete = null;
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao excluir tag', 'error');
            }
        });
    }

    if (tagProviderSelect) {
        tagProviderSelect.addEventListener('change', () => {
            const provider = tagProviderSelect.value;
            const preset = TAG_PRESETS[provider];

            if (preset && provider !== 'custom') {
                presetIdGroup.style.display = 'block';
                presetIdLabel.textContent = `ID do ${preset.name}`;
                presetIdInput.placeholder = preset.placeholder || 'Ex: ID do Pixel ou Conta';
                tagLocationSelect.value = preset.location || 'head';
                if (!tagNameInput.value || tagNameInput.value.startsWith('Nova Tag')) {
                    tagNameInput.value = preset.name;
                }
            } else {
                presetIdGroup.style.display = 'none';
            }
        });
    }

    if (generatePresetBtn) {
        generatePresetBtn.addEventListener('click', () => {
            const provider = tagProviderSelect.value;
            const preset = TAG_PRESETS[provider];
            const idVal = presetIdInput.value.trim();

            if (!idVal) {
                showToast('Por favor, informe o ID antes de gerar o código.', 'error');
                return;
            }

            if (preset && typeof preset.generateCode === 'function') {
                tagCodeTextarea.value = preset.generateCode(idVal);
                showToast(`Script gerado para ${preset.name}!`, 'info');
            }
        });
    }

    if (tagForm) {
        tagForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = tagIdInput.value;
            const name = tagNameInput.value.trim();
            const provider = tagProviderSelect.value;
            const location = tagLocationSelect.value;
            const targetPages = tagTargetPagesSelect.value;
            const code = tagCodeTextarea.value.trim();
            const isActive = tagIsActiveCheckbox.checked;

            if (!name || !code) {
                showToast('Preencha todos os campos obrigatórios.', 'error');
                return;
            }

            saveTagBtn.disabled = true;
            saveTagBtnText.style.display = 'none';
            saveTagBtnSpinner.style.display = 'inline-block';

            let res;
            if (id) {
                res = await updateTag(id, { name, provider, location, target_pages: targetPages, code, is_active: isActive });
            } else {
                res = await createTag({ name, provider, location, target_pages: targetPages, code, is_active: isActive });
            }

            saveTagBtn.disabled = false;
            saveTagBtnText.style.display = 'inline-block';
            saveTagBtnSpinner.style.display = 'none';

            if (res.success) {
                showToast(id ? 'Tag atualizada com sucesso!' : 'Nova tag cadastrada com sucesso!', 'success');
                tagModal.classList.remove('active');
                await refreshAllData();
            } else {
                showToast(res.error || 'Erro ao salvar tag', 'error');
            }
        });
    }
}

function openTagModal(tag = null) {
    tagForm.reset();

    if (tag) {
        tagModalTitle.textContent = 'Editar Tag';
        tagIdInput.value = tag.id;
        tagNameInput.value = tag.name;
        tagProviderSelect.value = tag.provider || 'custom';
        tagLocationSelect.value = tag.location || 'head';
        tagTargetPagesSelect.value = tag.target_pages || 'all';
        tagCodeTextarea.value = tag.code;
        tagIsActiveCheckbox.checked = tag.is_active;

        if (tag.provider !== 'custom' && TAG_PRESETS[tag.provider]) {
            presetIdGroup.style.display = 'block';
            presetIdLabel.textContent = `ID do ${TAG_PRESETS[tag.provider].name}`;
            presetIdInput.value = '';
        } else {
            presetIdGroup.style.display = 'none';
        }
    } else {
        tagModalTitle.textContent = 'Cadastrar Nova Tag';
        tagIdInput.value = '';
        tagProviderSelect.value = 'custom';
        presetIdGroup.style.display = 'none';
        tagLocationSelect.value = 'head';
        tagTargetPagesSelect.value = 'all';
        tagIsActiveCheckbox.checked = true;
    }

    tagModal.classList.add('active');
    lucide.createIcons();
}

// Global Filters
function setupFilters() {
    if (tagSearchInput) tagSearchInput.addEventListener('input', () => renderTagsTable());
    if (locationFilter) locationFilter.addEventListener('change', () => renderTagsTable());
    if (linkSearchInput) linkSearchInput.addEventListener('input', () => renderLinksTable());
    if (userSearchInput) userSearchInput.addEventListener('input', () => renderUsersTable());
}

function setupModals() {
    // Only confirmation dialogs close when clicking on backdrop.
    // Form modals (userModal, linkModal, tagModal) will NOT close on outside clicks to prevent data loss.
    [
        viewCodeModal, 
        deleteConfirmModal, 
        deleteLinkConfirmModal, 
        resetClicksModal, 
        deleteUserConfirmModal
    ].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
        <i data-lucide="${iconName}" style="width: 18px; height: 18px; flex-shrink: 0;"></i>
        <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
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
