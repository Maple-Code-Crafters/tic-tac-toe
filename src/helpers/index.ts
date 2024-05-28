import * as Sentry from '@sentry/react';

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const logError = (error: unknown, tags: string[]) => {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, { data: tags });
  } else {
    // eslint-disable-next-line no-console
    console.error(error, tags);
  }
};
