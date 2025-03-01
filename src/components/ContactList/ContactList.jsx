import React from "react"; // Імпортуємо React для створення компонентів
import { useDispatch, useSelector } from "react-redux"; // Імпортуємо хуки Redux для роботи зі сховищем
import { deleteContact } from "../../redux/contacts/operations"; // Імпортуємо операцію видалення контакту
import { selectFilteredContacts } from "../../redux/contacts/selectors"; // Імпортуємо селектор для отримання фільтрованих контактів
import ContactItem from "../ContactItem/ContactItem"; // Імпортуємо компонент окремого контакту
import css from "./ContactList.module.css"; // Імпортуємо модульні стилі

// Компонент, що відповідає за відображення списку контактів
const ContactList = () => {
  const dispatch = useDispatch(); // Використовуємо хук для отримання функції dispatch (виконання дій у Redux)
  const contacts = useSelector(selectFilteredContacts); // Отримуємо список відфільтрованих контактів зі сховища Redux

  // Функція для видалення контакту
  const handleDelete = (id, name) => {
    // Підтвердження дії перед видаленням
    if (window.confirm(`Are you sure you want to delete the contact: ${name}?`)) {
      dispatch(deleteContact(id)); // Викликаємо дію Redux для видалення контакту
    }
  };

  return (
    <ul className={css.list}>
      {/* Перевіряємо, чи є контакти */}
      {contacts.length > 0 ? (
        // Якщо є контакти, рендеримо список
        contacts.map((contact) => (
          <ContactItem
            key={contact.id} // Ключ потрібен React для ефективного оновлення списку
            contact={contact} // Передаємо дані контакту у дочірній компонент
            onDelete={() => handleDelete(contact.id, contact.name)} // Передаємо функцію для видалення
          />
        ))
      ) : (
        // Якщо контактів немає, виводимо повідомлення з класом для стилізації
        <p className={css.noContacts}>No contacts found.</p>
      )}
    </ul>
  );
};

export default ContactList; // Експортуємо компонент для використання в інших частинах програми
