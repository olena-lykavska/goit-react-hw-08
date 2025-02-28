import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлення базового URL для API
axios.defaults.baseURL = "https://connections-api.goit.global";

// Функція для налаштування токену
const setAuthHeader = (token) => {
  if (token) {
    localStorage.setItem("token", token); // Зберігаємо токен у localStorage
    axios.defaults.headers.Authorization = `Bearer ${token}`; // Додаємо токен до заголовків
  }
};

// Операція для реєстрації користувача
export const register = createAsyncThunk("auth/register", async (userInfo, thunkAPI) => {
  console.log("Registering with data:", userInfo); // Логування запиту
  try {
    const response = await axios.post("/users/signup", userInfo);
    setAuthHeader(response.data.token); // Налаштовуємо токен
    return response.data; // Повертаємо дані після успішної реєстрації
  } catch (error) {
    console.error("Error during registration:", error.response?.data); // Логування помилки
    return thunkAPI.rejectWithValue(error.response?.data || error.message); // Повертаємо помилку
  }
});


// Операція для оновлення даних користувача
export const refreshUser = createAsyncThunk("auth/refreshUser", async (_, thunkAPI) => {
  const token = localStorage.getItem("token"); // Перевіряємо наявність токену
  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }

  try {
    const { data } = await axios.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`, // Додайте токен
      },
    });
    return data; // Повертаємо дані користувача після оновлення
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для логіну
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post("/users/login", userData); // Перевірте правильний шлях для логіну
    setAuthHeader(data.token); // Налаштовуємо токен після логіну
    return data; // Повертаємо дані після логіну
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для логауту
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const token = localStorage.getItem("token"); // Перевіряємо наявність токену
  if (!token) {
    return thunkAPI.rejectWithValue("No token found for logout");
  }

  try {
    await axios.post("/users/logout", {}, { // Перевірте правильний шлях для логауту
      headers: {
        Authorization: `Bearer ${token}`, // Додайте токен
      },
    });
    localStorage.removeItem("token"); // Видаляємо токен з localStorage
    axios.defaults.headers.Authorization = ''; // Очищаємо заголовок авторизації
    return null; // Повертаємо null після успішного виходу
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});