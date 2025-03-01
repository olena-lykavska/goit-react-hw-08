import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice"; // Редюсер для управління контактами
import filtersReducer from "./filters/slice"; // Редюсер для фільтрів
import authReducer from "./auth/slice"; // Редюсер для автентифікації
import { persistStore, persistReducer } from "redux-persist"; // Імпортуємо інструменти для persist
import storage from "redux-persist/lib/storage"; // Використовуємо локальне сховище для persist

// Конфігурація для redux-persist, що дозволяє зберігати токен в локальному сховищі
const persistConfig = {
  key: "auth", // Ключ для збереження у локальному сховищі
  storage, // Тип сховища (локальне)
  whitelist: ["token"], // Зберігаємо тільки token, інші частини стану не зберігаються
};

// Обгортання редюсера auth для збереження токену за допомогою persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // Редюсер для контактів
    filters: filtersReducer, // Редюсер для фільтрів
    auth: persistedAuthReducer, // Редюсер для автентифікації з persist
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ігноруємо перевірку серіалізованості для діючих action від persist
      },
    }),
});

export const persistor = persistStore(store); // Створюємо persistor для синхронізації стану з локальним сховищем
