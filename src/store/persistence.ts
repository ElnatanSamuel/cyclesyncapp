import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './store';
import { setChores, Chore } from './slices/choreSlice';
import { setCategories, Category } from './slices/categorySlice';

const CHORE_KEY = 'chores';
const CATEGORY_KEY = 'categories';

export const loadChoresFromStorage = async () => {
  try {
    const choreData = await AsyncStorage.getItem(CHORE_KEY);
    if (choreData) {
      store.dispatch(setChores(JSON.parse(choreData)));
    }

    const categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
    if (categoryData) {
      store.dispatch(setCategories(JSON.parse(categoryData)));
    }
  } catch (e) {
    console.error('Failed to load chores or categories:', e);
  }
};

let initialized = false;

export const subscribeToChoreStorage = () => {
  store.subscribe(() => {
    const state = store.getState();

    if (!initialized) {
      // Prevent persisting immediately after loading from storage
      initialized = true;
      return;
    }

    AsyncStorage.setItem(CHORE_KEY, JSON.stringify(state.chores)).catch(console.error);
    AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(state.categories)).catch(console.error);
  });
};
