import * as Sentry from '@sentry/capacitor';
import * as SentrySibling from '@sentry/react';

import { APP_NAME, APP_VERSION } from './constants';

if (import.meta.env.PROD) {
  Sentry.init(
    {
      dsn: 'https://d0b9228405b42b1ffbe0a9764b4c9e67@o943187.ingest.us.sentry.io/4507031480631296',
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
}
