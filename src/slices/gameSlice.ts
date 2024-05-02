import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Symbols } from '../helpers/storage.helper';
import type { Value } from '../models/Cell';
import type { Level, NumberOfPlayers } from '../models/Game';

export type SerializableGame = {
  id: string;
  player1Name: string;
  player1Value: Value;
  player2Name: string;
  player2Value: Value;
  numberOfPlayers: NumberOfPlayers;
  level: Level;
  turn: Value;
};

type GameSlice = {
  current: SerializableGame | undefined;
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
    setCurrentGame: (state, action: PayloadAction<SerializableGame | undefined>) => {
      state.current = action.payload;
    },
    setSymbols: (state, action: PayloadAction<Symbols>) => {
      state.symbols = action.payload;
    },
  },
});

export const { setCurrentGame, setSymbols } = gameSlice.actions;
