// La URL base de tu API (debe coincidir con la de login.js)
const BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const totalUsersElement = document.getElementById('totalUsers');
    const activePostsElement = document.getElementById('activePosts');
    const pendingRequestsElement = document.getElementById('pendingRequests');

    // --- 1. Verificación de Autenticación al cargar la página ---
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        // Si no hay token, redirigir al login
        window.location.href = '../auth/login.html'; 
        return; // Detener la ejecución del script
    }

    // Opcional: Verificar la validez del token con una petición a un endpoint protegido
    // Esto es más robusto para manejar tokens caducados, pero añade una petición extra.
    // Por ahora, asumiremos que si existe en localStorage, es válido.
    // Una alternativa es que cada petición protegida maneje el 401 y redirija.

    // --- 2. Funcionalidad de Cierre de Sesión ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    await fetch(`${BASE_URL}/api/v1/credential/blacklist/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}` // Usar el access token actual
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });
                    // La respuesta de blacklist no es crucial; simplemente limpiaremos tokens.
                } catch (error) {
                    console.error('Error al intentar blacklisear el refresh token:', error);
                    // No bloquear el logout si falla la blacklisting
                }
            }

            // Eliminar todos los tokens del almacenamiento local
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('rememberedEmail'); // También el email recordado

            // Redirigir al usuario a la página de login
            window.location.href = '../auth/login.html';
        });
    }

    // --- 3. Sidebar Responsive (Hamburguesa) ---
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Opcional: Cerrar sidebar al hacer clic fuera de él en móviles
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // --- 4. Cargar Datos Iniciales para Widgets (Ejemplo) ---
    async function loadDashboardData() {
        // Ejemplo: Obtener el conteo de usuarios
        try {
            const usersResponse = await fetch(`${BASE_URL}/api/v1/users/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                // Suponiendo que la API de users devuelve una lista
                if (totalUsersElement) {
                    totalUsersElement.textContent = usersData.length; // O data.count si tu API lo tiene
                }
            } else if (usersResponse.status === 401) {
                // Token expirado o inválido, redirigir al login
                alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
                window.location.href = '../auth/login.html';
            } else {
                console.error('Error al cargar usuarios:', usersResponse.status);
                if (totalUsersElement) totalUsersElement.textContent = 'N/A';
            }
        } catch (error) {
            console.error('Error de red al cargar datos del dashboard:', error);
            if (totalUsersElement) totalUsersElement.textContent = 'Error';
        }

        // Puedes añadir más llamadas a la API para 'activePosts', 'pendingRequests'
        // Simplemente duplica la estructura del fetch y ajusta la URL y el elemento HTML.
        if (activePostsElement) activePostsElement.textContent = '0'; // Placeholder
        if (pendingRequestsElement) pendingRequestsElement.textContent = '0'; // Placeholder
    }

    // Cargar datos cuando el dashboard esté listo
    loadDashboardData();
});