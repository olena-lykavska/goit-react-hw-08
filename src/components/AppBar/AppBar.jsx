// src/components/AppBar/AppBar.jsx
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import css from "./AppBar.module.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Перевірка статусу аутентифікації
  const filteredContacts = useSelector(selectFilteredContacts); // Отримуємо фільтровані контакти

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />} {/* Меню залежно від авторизації */}
      
      {/* Якщо є фільтровані контакти, але користувач не авторизований */}
      {filteredContacts.length > 0 && !isLoggedIn && (
        <div className={css.contactsMessage}>Please log in to view or manage your contacts.</div>
      )}
    </header>
  );
}
