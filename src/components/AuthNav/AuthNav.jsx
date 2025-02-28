import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css"; // Імпортуємо стилі

export default function AuthNav() {
  return (
    <div className={css.authNav}> {/* Додано клас для контейнера */}
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
      <NavLink className={css.link} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
