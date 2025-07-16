import * as Sentry from '@sentry/nextjs';

const REPLAY_INIT_FLAG = '__SENTRY_REPLAY_INIT__';

declare global {
  interface Window {
    [REPLAY_INIT_FLAG]?: boolean;
  }
}

if (typeof window !== 'undefined') {
  if (window[REPLAY_INIT_FLAG]) {
    console.warn('Sentry Replay is already initialized.');
  } else {
    window[REPLAY_INIT_FLAG] = true;

    Sentry.init({
      dsn: 'https://99a51cbb60fe4500038402817f62f135@o4509672760410112.ingest.de.sentry.io/4509672763883600', // replace with your DSN
      integrations: [
        Sentry.replayIntegration(),
        Sentry.feedbackIntegration({
          colorScheme: 'system',
          buttonOptions: {
            position: 'bottom-right', // or your preferred position
          },
        }),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      debug: false,
    });
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
