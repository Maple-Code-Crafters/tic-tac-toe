import { configureStore } from '@reduxjs/toolkit';

import { gameSlice } from './slices/gameSlice';

export const createStore = () => {
  const store = configureStore({
    reducer: {
      game: gameSlice.reducer,
    },
  });
  return store;
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
