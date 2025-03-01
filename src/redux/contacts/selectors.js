import { createSelector } from "@reduxjs/toolkit";

// Селектори для доступу до контактів, стану завантаження та помилок
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Селектор для фільтрації контактів за ім'ям
export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items,   // Перший параметр: контакти
  (state) => state.filters.name,     // Другий параметр: фільтр за ім'ям
  (contacts, filter) => 
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) // Фільтруємо контакти за ім'ям
    )
);
