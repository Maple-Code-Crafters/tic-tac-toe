import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT } from '../constants';
import type { Default, Symbols } from '../helpers/storage.helper';
import type { Value } from '../models/Cell';
import type { Level, NumberOfPlayers } from '../models/Game';

export type GameConfig = {
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
  config: GameConfig | undefined;
  default: Default;
  symbols: Symbols;
};

const initialState: GameSlice = {
  config: undefined,
  default: DEFAULT,
  symbols: DEFAULT.symbols,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameConfig: (state, action: PayloadAction<GameConfig | undefined>) => {
      state.config = action.payload;
    },
    setGameDefault: (state, action: PayloadAction<Default>) => {
      state.default = action.payload;
    },
    setGameSymbols: (state, action: PayloadAction<Symbols>) => {
      state.symbols = action.payload;
    },
  },
});

export const { setGameConfig, setGameDefault, setGameSymbols } = gameSlice.actions;
