import * as Sentry from '@sentry/capacitor';
import * as SentrySibling from '@sentry/react';

import { APP_NAME, APP_VERSION } from './constants';

Sentry.init(
  {
    dsn: import.meta.env.VITE_SENTRY_DNS,
    release: `${APP_NAME}@${APP_VERSION}`,
    dist: '1',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    integrations: SentrySibling.defaultIntegrations,
  },
  // Forward the init method to the sibling Framework.
  SentrySibling.init,
);
