import 'server-only';
import { createClient } from '@base44/sdk';

const appId = process.env.BASE44_APP_ID || '6a2b3ec4c430dbb80ac96a13';

const config = {
  appId,
};

if (process.env.BASE44_APP_BASE_URL) {
  config.appBaseUrl = process.env.BASE44_APP_BASE_URL;
}

export const base44 = createClient(config);
