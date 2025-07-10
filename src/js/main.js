// Configuración API
import { API_CONFIG } from './api/v1/config.js'
//import { AuthService } from './api/v1/auth.js';

// Inicialización
/*document.addEventListener('DOMContentLoaded', () => {
  console.log('App iniciada con API:', API_CONFIG.BASE_URL)
  
  // Tu código aquí
  document.getElementById('app').innerHTML = '<h1>¡Estructura lista!</h1>'
})*/
document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo: Evento para el botón CTA
  document.querySelector('.cta-button').addEventListener('click', () => {
    console.log('Botón clickeado');
    // Lógica aquí (ej: redirección o llamada API)
  });
});
