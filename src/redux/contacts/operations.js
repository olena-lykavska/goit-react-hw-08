import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базову URL-адресу для всіх запитів API
axios.defaults.baseURL = "https://connections-api.goit.global";

/**
 * Операція для отримання списку контактів.
 * Виконує GET-запит на сервер та повертає масив контактів.
 */
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("/contacts"); // Отримуємо контакти з сервера
    return data; // Повертаємо отримані контакти
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Передаємо помилку в state
  }
});

/**
 * Операція для додавання нового контакту.
 * Виконує POST-запит, передаючи об'єкт нового контакту, і повертає створений контакт.
 */
export const addContact = createAsyncThunk("contacts/add", async (contact, thunkAPI) => {
  try {
    const { data } = await axios.post("/contacts", contact); // Додаємо контакт на сервер
    return data; // Повертаємо створений контакт
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Передаємо помилку в state
  }
});

/**
 * Операція для видалення контакту за його ID.
 * Виконує DELETE-запит та повертає ID видаленого контакту.
 */
export const deleteContact = createAsyncThunk("contacts/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${id}`); // Видаляємо контакт із сервера
    return id; // Повертаємо ID, щоб прибрати контакт зі списку
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Передаємо помилку в state
  }
});
