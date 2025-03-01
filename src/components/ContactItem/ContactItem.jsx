import React from "react";
import toast from "react-hot-toast"; // Підключаємо бібліотеку для сповіщень
import css from "./ContactItem.module.css"; // Імпортуємо стилі

const ContactItem = ({ contact, onDelete }) => {
  // Функція для видалення контакту
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the contact: ${contact.name}?`
    ); // Підтвердження видалення контакту
    if (confirmed) {
      onDelete(); // Викликаємо передану функцію видалення
      toast.success(`Contact ${contact.name} deleted successfully!`); // Відображаємо повідомлення про успішне видалення
    }
  };

  return (
    <li className={css.item}> {/* Контейнер для елемента списку */}
      <div className={css.contactInfo}> {/* Блок з інформацією про контакт */}
        <span className={css.contactName}>{contact.name}</span>:{" "}
        <span className={css.contactNumber}>{contact.number}</span>
      </div>
      <button onClick={handleDelete} className={css.deleteButton}>
        Delete {/* Кнопка видалення контакту */}
      </button>
    </li>
  );
};

export default ContactItem;
