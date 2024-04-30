// import type { PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CPU } from '../models/cpu/Cpu';

type CpuSlice = {
  current: CPU | undefined;
  thinking: boolean;
};

const initialState: CpuSlice = {
  current: undefined,
  thinking: false,
};

export const cpuSlice = createSlice({
  name: 'cpu',
  initialState,
  reducers: {
    setCPU: (state, action: PayloadAction<CPU | undefined>) => {
      state.current = action.payload;
    },
    setCpuThinking: (state, action: PayloadAction<boolean>) => {
      state.thinking = action.payload;
    },
  },
});

export const { setCPU, setCpuThinking } = cpuSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
