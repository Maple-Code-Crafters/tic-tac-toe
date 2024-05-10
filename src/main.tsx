import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './sentry';

import App from './App';
import { DefaultProvider } from './providers/DefaultProvider';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DefaultProvider>
        <App />
      </DefaultProvider>
    </Provider>
  </React.StrictMode>,
);
