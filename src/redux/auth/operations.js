import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базовий URL для всіх запитів до API
axios.defaults.baseURL = "https://connections-api.goit.global";

// **Функція для встановлення токена в заголовок**
// Якщо токен існує, ми його зберігаємо в localStorage і додаємо до заголовка запиту
const setAuthHeader = (token) => {
  if (token) {
    localStorage.setItem("token", token); // Зберігаємо токен у localStorage
    axios.defaults.headers.Authorization = `Bearer ${token}`; // Додаємо токен до заголовка авторизації
  }
};

// **Функція для очищення заголовка авторизації**
// Видаляємо токен з localStorage та очищуємо заголовок
const clearAuthHeader = () => {
  localStorage.removeItem("token"); // Видаляємо токен з localStorage
  axios.defaults.headers.Authorization = ""; // Очищаємо заголовок авторизації
};

// **Реєстрація користувача**
// Ця асинхронна операція реєструє нового користувача, отримує токен і оновлює користувача
export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userInfo); // Відправка запиту на реєстрацію
      setAuthHeader(response.data.token); // Встановлюємо токен в заголовок після успішної реєстрації

      // Оновлюємо інформацію про користувача після реєстрації
      const refreshedUser = await thunkAPI.dispatch(refreshUser()).unwrap();
      return refreshedUser;
    } catch (error) {
      // Обробка помилки, якщо статус 400 (неправні дані або вже існуючий email)
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue("Email already exists or invalid data");
      }
      // Відправляємо повідомлення про загальну помилку реєстрації
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// **Оновлення користувача**
// Ця операція отримує актуальні дані про користувача з сервера, використовуючи токен
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token"); // Отримуємо токен з localStorage
    if (!token) {
      return thunkAPI.rejectWithValue("No token found"); // Якщо токен не знайдено, повертаємо помилку
    }

    try {
      const { data } = await axios.get("/users/current", {
        headers: { Authorization: `Bearer ${token}` }, // Відправляємо токен для авторизації
      });
      return data; // Повертаємо актуальні дані користувача
    } catch (error) {
      // Якщо сталася помилка (наприклад, токен більше не дійсний), очищуємо заголовок авторизації
      clearAuthHeader();
      // Повідомляємо про помилку, якщо сесія завершена або токен недійсний
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Session expired, please log in again");
    }
  }
);

// **Логін користувача**
// Ця операція здійснює логін, отримує токен і оновлює інформацію про користувача
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", userData); // Відправляємо дані для логіну
      setAuthHeader(data.token); // Встановлюємо токен в заголовок після успішного логіну

      // Оновлюємо інформацію про користувача після логіну
      const refreshedUser = await thunkAPI.dispatch(refreshUser()).unwrap();
      return refreshedUser;
    } catch (error) {
      // Обробка помилок для невірних email чи паролів
      return thunkAPI.rejectWithValue("Invalid email or password");
    }
  }
);

// **Логаут користувача**
// Ця операція здійснює вихід користувача з системи
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout"); // Відправляємо запит на вихід
      clearAuthHeader(); // Очищаємо токен після виходу
      return null; // Повертаємо null після успішного виходу
    } catch (error) {
      // Обробка помилок при виході
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);
