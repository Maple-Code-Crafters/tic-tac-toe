import { configureStore } from '@reduxjs/toolkit';

import { cpuSlice } from './slices/cpuSlice';
import { gameSlice } from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    cpu: cpuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
