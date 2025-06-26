import { configureStore } from '@reduxjs/toolkit';
import choreReducer from './slices/choreSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    chores: choreReducer,
     categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
