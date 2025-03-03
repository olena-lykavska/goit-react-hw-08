import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базову URL-адресу для всіх запитів
axios.defaults.baseURL = "https://connections-api.goit.global";

// **Функція для встановлення токена в заголовок авторизації**
// Якщо токен існує, він зберігається в localStorage і додається до заголовка запиту
const setAuthHeader = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

// **Функція для очищення токена**
// Видаляємо токен з localStorage та прибираємо його з заголовка авторизації
const clearAuthHeader = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.Authorization;
};

// **Реєстрація користувача**
// Створює нового користувача, отримує токен, оновлює дані про нього
export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userInfo);
      setAuthHeader(response.data.token);
      const refreshedUser = await thunkAPI.dispatch(refreshUser()).unwrap();
      return refreshedUser;
    } catch (error) {
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue("Email already exists or invalid data");
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// **Оновлення користувача**
// Отримує актуальні дані користувача, якщо є збережений токен
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token); // Використовуємо setAuthHeader, щоб задати токен глобально

    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Session expired, please log in again");
    }
  }
);

// **Логін користувача**
// Виконує вхід користувача, отримує токен та оновлює його дані
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", userData);
      setAuthHeader(data.token);
      const refreshedUser = await thunkAPI.dispatch(refreshUser()).unwrap();
      return refreshedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Invalid email or password");
    }
  }
);

// **Логаут користувача**
// Вихід з акаунта, очищення токена
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);