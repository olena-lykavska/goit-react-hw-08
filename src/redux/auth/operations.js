import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

const clearAuthHeader = () => {
  localStorage.removeItem("token");
  axios.defaults.headers.Authorization = "";
};

// **Реєстрація**
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
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const { data } = await axios.get("/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue("Session expired, please log in again");
    }
  }
);

// **Логін**
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

// **Логаут**
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
