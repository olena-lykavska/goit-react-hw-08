import { useSelector } from "react-redux"; // Імпортуємо useSelector для доступу до стану Redux
import Navigation from "../Navigation/Navigation"; // Імпортуємо компонент навігації
import UserMenu from "../UserMenu/UserMenu"; // Імпортуємо меню користувача
import AuthNav from "../AuthNav/AuthNav"; // Імпортуємо меню для аутентифікації
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Імпортуємо селектор для перевірки статусу авторизації
import { selectFilteredContacts } from "../../redux/contacts/selectors"; // Імпортуємо селектор для отримання фільтрованих контактів
import css from "./AppBar.module.css"; // Імпортуємо стилі для AppBar

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації з Redux
  const filteredContacts = useSelector(selectFilteredContacts); // Отримуємо фільтровані контакти з Redux

  return (
    <header className={css.header}>
      <Navigation /> {/* Виводимо компонент навігації */}
      
      {/* В залежності від статусу авторизації відображаємо меню користувача або меню для аутентифікації */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
      
      {/* Якщо є фільтровані контакти і користувач не авторизований, показуємо повідомлення */}
      {filteredContacts.length > 0 && !isLoggedIn && (
        <div className={css.contactsMessage}>Please log in to view or manage your contacts.</div>
      )}
    </header>
  );
}
