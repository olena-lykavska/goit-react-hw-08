import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { 
    items: [],    // Масив контактів
    loading: false, // Статус завантаження
    error: null,    // Помилка, якщо вона є
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка запиту на отримання контактів
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;    // Початок завантаження
        state.error = null;      // Очищення помилки
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload; // Збереження контактів в стейт
        state.loading = false;        // Завершення завантаження
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;       // Завершення завантаження при помилці
        state.error = action.error.message; // Збереження помилки
      })
      
      // Обробка запиту на додавання нового контакту
      .addCase(addContact.pending, (state) => {
        state.loading = true; // Початок завантаження
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload); // Додавання нового контакту
        state.loading = false;            // Завершення завантаження
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;            // Завершення завантаження при помилці
        state.error = action.error.message; // Збереження помилки
      })

      // Обробка запиту на видалення контакту
      .addCase(deleteContact.pending, (state) => {
        state.loading = true; // Початок завантаження
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        // Видалення контакту з масиву
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false; // Завершення завантаження
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false; // Завершення завантаження при помилці
        state.error = action.error.message; // Збереження помилки
      });
  },
});

export default contactsSlice.reducer;
