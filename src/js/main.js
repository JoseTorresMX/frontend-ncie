// Configuración API
import { API_CONFIG } from './api/v1/config.js'

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  console.log('App iniciada con API:', API_CONFIG.BASE_URL)
  
  // Tu código aquí
  document.getElementById('app').innerHTML = '<h1>¡Estructura lista!</h1>'
})
