import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { DEFAULT } from '../constants';
import type { Default } from '../helpers/storage.helper';
import { DefaultStorage } from '../helpers/storage.helper';
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

export const { setGameConfig, setGameDefault } = gameSlice.actions;
