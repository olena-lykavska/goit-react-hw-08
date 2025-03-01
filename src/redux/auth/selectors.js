
// Селектор для отримання інформації про користувача
export const selectUser = (state) => state.auth.user;

// Селектор для перевірки, чи користувач аутентифікований (якщо є користувач, то аутентифікований)
export const selectIsAuthenticated = (state) => !!state.auth.user;  // Використовуємо !! для перетворення значення в булевий тип

// Селектор для отримання помилки автентифікації
export const selectAuthError = (state) => state.auth.error;

// Селектор для перевірки, чи користувач залогінений
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Селектор для перевірки, чи триває процес оновлення (наприклад, оновлення даних користувача)
export const selectIsRefreshing = (state) => state.auth.loading;
