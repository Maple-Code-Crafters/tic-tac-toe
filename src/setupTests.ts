// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import type { PreferencesPlugin } from '@capacitor/preferences';
import { setupIonicReact } from '@ionic/react';

import '@testing-library/jest-dom/vitest';

import { DEFAULT } from './constants';
import { fakeResults } from './pages/Results.test';

setupIonicReact();

// Mock scrollBy
window.HTMLElement.prototype.scrollBy = function () {};

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

vi.mock('@capacitor/preferences', async (importOriginal) => {
  const { Preferences } = await importOriginal<{ Preferences: PreferencesPlugin }>();
  return {
    Preferences: {
      ...Preferences,
      get: ({ key }: { key: string }) => {
        switch (key) {
          case 'defaults':
            return Promise.resolve({ value: JSON.stringify(DEFAULT) });
          case 'results':
            return Promise.resolve({ value: JSON.stringify(fakeResults) });
          default:
            return Promise.resolve({ value: '' });
        }
      },
      set: () => Promise.resolve(),
    },
  };
});
