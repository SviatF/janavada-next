import 'server-only';
import { createClient } from '@base44/sdk';

const appId = process.env.BASE44_APP_ID || '6a2b3ec4c430dbb80ac96a13';

export const base44 = createClient({
  appId,
  token: undefined,
  functionsVersion: process.env.BASE44_FUNCTIONS_VERSION || 'preview',
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl: process.env.BASE44_APP_BASE_URL || undefined,
});
