const BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password'); // Aunque no lo guardaremos, lo necesitamos para el submit
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Paso 1: Cargar el email si se guardó previamente
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
        emailInput.value = storedEmail;
        rememberMeCheckbox.checked = true; // Marcar el checkbox si el email estaba guardado
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;

            loginErrorMessage.textContent = ''; // Limpiar mensaje de error

            try {
                const response = await fetch(`${BASE_URL}/api/v1/credential/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);

                    // Paso 2: Guardar o remover el email según el estado del checkbox
                    if (rememberMeCheckbox.checked) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail'); // Eliminar si el usuario desmarca
                    }
                    
                    // Limpiar el campo de contraseña después del login exitoso (opcional, por seguridad)
                    passwordInput.value = '';

                    window.location.href = '../admin/index.html';
                } else {
                    let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
                    if (data.detail) {
                        errorMessage = data.detail;
                    } else if (data.email) {
                        errorMessage = `Email: ${data.email.join(', ')}`;
                    } else if (data.password) {
                        errorMessage = `Contraseña: ${data.password.join(', ')}`;
                    } else if (data.non_field_errors) {
                        errorMessage = data.non_field_errors.join(', ');
                    }
                    loginErrorMessage.textContent = errorMessage;
                }
            } catch (error) {
                loginErrorMessage.textContent = 'No se pudo conectar con el servidor. Verifica tu conexión.';
            }
        });
    }
});