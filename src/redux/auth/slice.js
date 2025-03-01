import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from "./operations";

// Створення слайсу для автентифікації
const authSlice = createSlice({
  name: "auth",  // Назва слайсу
  initialState: {
    // Початковий стан
    user: {
      name: null,  // Ім'я користувача (спочатку немає)
      email: null, // Email користувача (спочатку немає)
    },
    token: null,      // Токен авторизації (спочатку немає)
    error: null,      // Повідомлення про помилку (спочатку немає)
    loading: false,   // Стан завантаження (спочатку false)
    isRefreshing: false,  // Стан оновлення даних користувача (спочатку false)
    isLoggedIn: false,    // Чи користувач авторизований (спочатку false)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка для входу (login)
      .addCase(login.pending, (state) => {
        state.loading = true;  // Поки йде запит на логін, ставимо loading в true
      })
      .addCase(login.fulfilled, (state, action) => {
        // Якщо логін успішний
        state.user = { name: action.payload.name, email: action.payload.email };  // Оновлюємо інформацію про користувача
        state.token = action.payload.token;  // Зберігаємо токен
        state.isLoggedIn = true;  // Користувач залогінений
        state.loading = false;  // Завантаження завершено
        state.error = null;  // Очищаємо помилку
      })
      .addCase(login.rejected, (state, action) => {
        // Якщо логін не вдалося виконати
        state.loading = false;  // Завантаження завершено
        state.error = action.payload;  // Зберігаємо помилку
      })
      
      // Логіка для виходу (logout)
      .addCase(logout.pending, (state) => {
        state.loading = true;  // Поки йде запит на логаут, ставимо loading в true
      })
      .addCase(logout.fulfilled, (state) => {
        // Якщо логаут успішний
        state.user = { name: null, email: null };  // Очищаємо інформацію про користувача
        state.token = null;  // Очищаємо токен
        state.isLoggedIn = false;  // Користувач вийшов
        state.loading = false;  // Завантаження завершено
        state.error = null;  // Очищаємо помилку
      })
      .addCase(logout.rejected, (state, action) => {
        // Якщо логаут не вдалося виконати
        state.loading = false;  // Завантаження завершено
        state.error = action.payload;  // Зберігаємо помилку
      })
      
      // Логіка для оновлення користувача (refreshUser)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;  // Поки йде запит на оновлення даних, ставимо isRefreshing в true
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // Якщо оновлення успішне
        state.user = { name: action.payload.name, email: action.payload.email };  // Оновлюємо інформацію про користувача
        state.token = action.payload.token;  // Зберігаємо токен
        state.isLoggedIn = true;  // Користувач залогінений
        state.isRefreshing = false;  // Оновлення завершено
        state.error = null;  // Очищаємо помилку
      })
      .addCase(refreshUser.rejected, (state, action) => {
        // Якщо оновлення не вдалося
        state.isRefreshing = false;  // Оновлення завершено
        state.error = action.payload;  // Зберігаємо помилку
      });
  },
});

export default authSlice.reducer;
