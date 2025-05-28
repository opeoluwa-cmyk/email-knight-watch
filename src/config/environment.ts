
// Environment configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};

// Validate required environment variables
export const validateEnvironment = () => {
  const required = ['VITE_API_BASE_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
};
