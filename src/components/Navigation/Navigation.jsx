import { NavLink } from "react-router-dom";  // Імпортуємо компонент NavLink для навігації
import { useSelector } from "react-redux";  // Імпортуємо хук useSelector для доступу до стану Redux
import { selectIsLoggedIn } from "../../redux/auth/selectors";  // Селектор для перевірки статусу авторизації
import css from "./Navigation.module.css";  // Імпортуємо стилі для навігації

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);  // Отримуємо статус авторизації з Redux

  return (
    <nav>
      {/* Лінк на головну сторінку */}
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      {/* Якщо користувач увійшов, показуємо лінк на Книгу контактів */}
      {isLoggedIn && (
        <NavLink className={css.link} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
