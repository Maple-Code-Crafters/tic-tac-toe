import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { DEFAULT } from '../constants';
import type { Default, Symbols } from '../helpers/storage.helper';
import { DefaultStorage } from '../helpers/storage.helper';
import type { Value } from '../models/Cell';
import type { Level, NumberOfPlayers, PlayerTurn } from '../models/Game';

export type PlayerConfig = {
  name: string;
  value: Value;
  isCpu: boolean;
};

export type GameConfig = {
  id: string;
  player1: PlayerConfig;
  player2: PlayerConfig;
  numberOfPlayers: NumberOfPlayers;
  level: Level;
  initialPlayerTurn: PlayerTurn;
};

type GameSlice = {
  config: GameConfig | undefined;
  default: Default;
  symbols: Symbols;
};

export const retrieveDefaultAsync = createAsyncThunk('game/retrieveDefaultAsync', async () => {
  const storedDefault = await DefaultStorage.get();
  return storedDefault;
});

export const saveDefaultAsync = createAsyncThunk<Default, Default>('game/saveDefaultAsync', async (newDefault) => {
  await DefaultStorage.save(newDefault);
  return newDefault;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(retrieveDefaultAsync.fulfilled, (state, action) => {
        state.default = action.payload;
      })
      .addCase(saveDefaultAsync.fulfilled, (state, action) => {
        state.default = action.payload;
      });
  },
});

export const { setGameConfig, setGameDefault, setGameSymbols } = gameSlice.actions;
