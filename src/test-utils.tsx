import { act } from 'react';
import { createMemoryHistory } from 'history';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { getConfig, IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { RenderOptions } from '@testing-library/react';
import { configure, fireEvent, render as rtlRender } from '@testing-library/react';

import { DefaultProvider } from './providers/DefaultProvider';
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
        <DefaultProvider>
          <IonApp>
            <IonReactRouter history={customHistory}>{children}</IonReactRouter>
          </IonApp>
        </DefaultProvider>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const safeAct = () => act(async () => await Promise.resolve());

const ionChange = (element: Document | Element | Window, value: string) => {
  fireEvent(element, new CustomEvent('ionChange', { detail: { value } }));
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { ionChange, render, safeAct, createMemoryHistory as createTestHistory, createStore as createTestStore };
