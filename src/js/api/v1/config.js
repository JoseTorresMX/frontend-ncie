export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  ENDPOINTS: {
    AUTH: '/auth/',
    DATA: '/data/'
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'API-Version': 'v1'
  }
}
