const getApiBaseUrl = (): string => {
 if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000'
  }
  
  return import.meta.env.VITE_API_URL || 'http://localhost:8000'
}

export const API_BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
  },
  // Video
  VIDEO: {
    ANALYZE: '/video/analyze',
    SAVE: '/video/save',
    GET_ANALYSES: '/video/analyses',
  },
  // Hooks
  HOOKS: {
    GENERATE: '/video/generate-hooks',
    SAVE: '/video/save-hook',
    LIST: '/video/hooks',
  },
} as const

