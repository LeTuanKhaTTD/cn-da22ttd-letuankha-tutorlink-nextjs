/**
 * ============================================
 * ENVIRONMENT CONFIGURATION
 * Cấu hình môi trường từ .env
 * ============================================
 */

export const env = {
  // App
  appName: import.meta.env.VITE_APP_NAME || 'TutorLink',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Hệ thống kết nối gia sư TVU',

  // API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // Authentication
  jwtSecret: import.meta.env.VITE_JWT_SECRET || '',
  jwtExpiresIn: import.meta.env.VITE_JWT_EXPIRES_IN || '7d',

  // Cloudinary
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  cloudinaryUploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',

  // Socket.io
  socketUrl: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',

  // Email
  emailServiceUrl: import.meta.env.VITE_EMAIL_SERVICE_URL || '',

  // Google Maps
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',

  // Analytics
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',

  // Feature Flags
  enableChat: import.meta.env.VITE_ENABLE_CHAT === 'true',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  enablePayment: import.meta.env.VITE_ENABLE_PAYMENT === 'true',

  // Development
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  devMode: import.meta.env.VITE_DEV_MODE === 'true',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
} as const

// Validate required env variables
const requiredEnvVars = ['VITE_API_BASE_URL']

export function validateEnv() {
  const missing = requiredEnvVars.filter(key => !import.meta.env[key])

  if (missing.length > 0 && env.isProd) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  if (missing.length > 0 && env.isDev) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`)
  }
}
