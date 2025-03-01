import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

export const register = createAsyncThunk("auth/register", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post("/users/signup", userInfo);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    // Перевірка на помилку MongoDB (code 11000) для вже зареєстрованого емейла
    if (error.response?.data?.code === 11000) {
      return thunkAPI.rejectWithValue("Email already exists");
    }
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const refreshUser = createAsyncThunk("auth/refreshUser", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }

  try {
    const { data } = await axios.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post("/users/login", userData);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return thunkAPI.rejectWithValue("No token found for logout");
  }

  try {
    await axios.post("/users/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token");
    axios.defaults.headers.Authorization = '';
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
