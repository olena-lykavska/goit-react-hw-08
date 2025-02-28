import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Селектор для перевірки авторизації
import css from "./Navigation.module.css"; // Імпортуємо стилі для навігації

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо стан авторизації

  return (
    <nav>
      <NavLink className={css.link} to="/"> {/* Головна сторінка */}
        Home
      </NavLink>
      {/* <NavLink className={css.link} to="/phonebook">
          Contacts
        </NavLink> */}
      {isLoggedIn && ( // Якщо користувач увійшов, відображаємо лінк на Книгу контактів
        <NavLink className={css.link} to="/phonebook">
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
