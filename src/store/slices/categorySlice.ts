import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Category = string;

const initialState: Category[] = [
  'Personal',
  'Work',
  'Study',
  'Fitness',
  'Hobbies',
  'Household',
  'Other',
];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      const trimmed = action.payload.trim();
      if (trimmed && !state.includes(trimmed)) {
        state.push(trimmed);
      }
    },
    setCategories: (_state, action: PayloadAction<Category[]>) => {
      return action.payload;
    },
  },
});

export const { addCategory, setCategories } = categorySlice.actions;
export const selectCategories = (state: RootState) => state.categories;
export default categorySlice.reducer;
