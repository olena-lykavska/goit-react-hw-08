import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from "./operations";

// Створення слайсу для автентифікації
const authSlice = createSlice({
  name: "auth", // Ім'я слайсу
  initialState: {
    user: { name: null, email: null }, // Початковий стан користувача
    token: null, // Початковий стан токену
    error: null, // Початковий стан помилки
    loading: false, // Чи завантажується запит (логін/логаут/оновлення)
    isRefreshing: false, // Чи оновлюється інформація користувача
    isLoggedIn: false, // Чи користувач залогінений
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка для входу (login)
      .addCase(login.pending, (state) => {
        state.loading = true; // Початок завантаження
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email }; // Оновлюємо дані користувача
        state.token = action.payload.token; // Оновлюємо токен
        state.isLoggedIn = true; // Користувач авторизований
        state.loading = false; // Завершення завантаження
        state.error = null; // Очистка помилки
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; // Завершення завантаження
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка для виходу (logout)
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null }; // Очищуємо дані користувача
        state.token = null; // Очищуємо токен
        state.isLoggedIn = false; // Вихід з системи
        state.loading = false; // Завершення завантаження
        state.error = null; // Очистка помилки
        localStorage.removeItem("token"); // Видаляємо токен з localStorage
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false; // Завершення завантаження
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка для оновлення користувача (refreshUser)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true; // Початок оновлення
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email }; // Оновлюємо дані користувача
        state.isLoggedIn = true; // Користувач авторизований
        state.isRefreshing = false; // Завершення оновлення
        state.error = null; // Очистка помилки
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false; // Завершення оновлення
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export default authSlice.reducer; // Експортуємо редюсер
