// store/slices/choreSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Chore = {
  title: string;
  category: string;
  recurrence: {
    interval: number;
    unit: string;
  };
};

const initialState: Chore[] = [];

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {
    addChore: (state, action: PayloadAction<Chore>) => {
      state.push(action.payload);
    },
    setChores: (_state, action: PayloadAction<Chore[]>) => {
      return action.payload;
    },
    deleteChore: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addChore, setChores, deleteChore } = choreSlice.actions;
export const selectChores = (state: RootState) => state.chores;
export default choreSlice.reducer;
