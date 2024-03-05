// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { setupIonicReact } from '@ionic/react';

import '@testing-library/jest-dom/vitest';

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
