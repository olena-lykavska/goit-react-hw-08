import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлення базового URL для API
axios.defaults.baseURL = "https://connections-api.goit.global";

// Операція для отримання контактів
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    // Виконуємо запит на отримання всіх контактів
    const { data } = await axios.get("/contacts", { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Додаємо токен для авторизації
      },
    });
    return data;  // Повертаємо отримані дані
  } catch (error) {
    // Якщо сталася помилка, повертаємо її повідомлення
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для додавання нового контакту
export const addContact = createAsyncThunk("contacts/add", async (contact, thunkAPI) => {
  try {
    // Виконуємо запит на додавання нового контакту
    const { data } = await axios.post("/contacts", contact, { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Додаємо токен для авторизації
      },
    });
    return data;  // Повертаємо дані нового контакту
  } catch (error) {
    // Якщо сталася помилка, повертаємо її повідомлення
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для видалення контакту
export const deleteContact = createAsyncThunk("contacts/delete", async (id, thunkAPI) => {
  try {
    // Виконуємо запит на видалення контакту за id
    await axios.delete(`/contacts/${id}`, { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Додаємо токен для авторизації
      },
    });
    return id;  // Повертаємо id видаленого контакту для оновлення стану
  } catch (error) {
    // Якщо сталася помилка, повертаємо її повідомлення
    return thunkAPI.rejectWithValue(error.message);
  }
});
