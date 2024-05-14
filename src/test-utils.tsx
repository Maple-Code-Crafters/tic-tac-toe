import { act } from 'react';
import { createMemoryHistory } from 'history';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { getConfig, IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { RenderOptions } from '@testing-library/react';
import { configure, render as rtlRender } from '@testing-library/react';

import { createStore } from './store';

configure({
  ...getConfig(),
  reactStrictMode: true,
});

const render = (
  ui: ReactElement,
  customStore = createStore(),
  customHistory = createMemoryHistory(),
  renderOptions?: RenderOptions,
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={customStore}>
        <IonApp>
          <IonReactRouter history={customHistory}>{children}</IonReactRouter>
        </IonApp>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const safeAct = () => act(async () => await Promise.resolve());

// re-export everything
export * from '@testing-library/react';

// override render method
export { render, safeAct, createMemoryHistory as createTestHistory, createStore as createTestStore };
