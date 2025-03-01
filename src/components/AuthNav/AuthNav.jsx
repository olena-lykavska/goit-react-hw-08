import { NavLink } from "react-router-dom"; // Імпортуємо NavLink для навігації між сторінками
import css from "./AuthNav.module.css"; // Імпортуємо стилі для компонента AuthNav

export default function AuthNav() {
  return (
    <div className={css.authNav}> {/* Контейнер для меню авторизації */}
      <NavLink className={css.link} to="/register"> {/* Посилання на сторінку реєстрації */}
        Register
      </NavLink>
      <NavLink className={css.link} to="/login"> {/* Посилання на сторінку входу */}
        Log In
      </NavLink>
    </div>
  );
}
