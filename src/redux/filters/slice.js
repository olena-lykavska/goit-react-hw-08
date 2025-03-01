import { createSlice } from "@reduxjs/toolkit";

// Створення Slice для фільтрів
const filtersSlice = createSlice({
  name: "filters", // Назва slice
  initialState: { name: "" }, // Початковий стан, де фільтр за замовчуванням - порожній рядок
  reducers: {
    // Редюсер для зміни значення фільтру
    changeFilter(state, action) {
      state.name = action.payload; // Оновлює стан фільтру з payload дії
    },
  },
});

// Експортуємо дію changeFilter
export const { changeFilter } = filtersSlice.actions;

// Експортуємо редюсер для підключення до основного store
export default filtersSlice.reducer;
