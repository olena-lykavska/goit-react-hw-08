import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлення базового URL для API
axios.defaults.baseURL = "https://connections-api.goit.global";

// Операція для отримання контактів
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("/contacts", { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для додавання нового контакту
export const addContact = createAsyncThunk("contacts/add", async (contact, thunkAPI) => {
  try {
    const { data } = await axios.post("/contacts", contact, { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Операція для видалення контакту
export const deleteContact = createAsyncThunk("contacts/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${id}`, { // Вказуємо правильний шлях
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
