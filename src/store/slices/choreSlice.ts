import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Chore = {
  title: string;
  category: string;
  recurrence: {
    interval: number;
    unit: string;
  };
};

type ChoreState = {
  items: Chore[];
};

const initialState: ChoreState = {
  items: [],
};

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {
    addChore: (state, action: PayloadAction<Chore>) => {
      state.items.push(action.payload);
    },
    removeChore: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { addChore, removeChore } = choreSlice.actions;
export default choreSlice.reducer;
