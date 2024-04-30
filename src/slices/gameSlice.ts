// import type { PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Symbols } from '../helpers/storage.helper';
import type { Game } from '../models/Game';

type GameSlice = {
  current: Game | undefined;
  symbols: Symbols;
  isStoredGame: boolean;
};

const initialState: GameSlice = {
  current: undefined,
  symbols: { X: 'X', O: 'O' },
  isStoredGame: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game | undefined>) => {
      state.current = action.payload;
    },
    setSymbols: (state, action: PayloadAction<Symbols>) => {
      state.symbols = action.payload;
    },
    setIsStoredGame: (state, action: PayloadAction<boolean>) => {
      state.isStoredGame = action.payload;
    },
  },
});

export const { setCurrentGame, setIsStoredGame, setSymbols } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
