// ============================================================================
// NEON SDK CLIENT CONFIGURATION
// ============================================================================

import { createClient } from '@neondatabase/neon-js';

// Create full client with both auth and database capabilities
export const neonClient = createClient({
  auth: {
    url: import.meta.env.VITE_NEON_AUTH_URL,
  },
  dataApi: {
    url: import.meta.env.VITE_NEON_DATA_API_URL,
  },
});

// Export auth-only client for simple auth needs
export const neonAuth = neonClient.auth;

export default neonClient;
