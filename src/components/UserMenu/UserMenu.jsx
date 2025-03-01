import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  // Імпортуємо хуки для роботи з Redux
import { selectUser } from "../../redux/auth/selectors";  // Селектор для отримання інформації про користувача
import { refreshUser, logout } from "../../redux/auth/operations";  // Операції для оновлення і виходу користувача
import css from "./UserMenu.module.css";  // Імпортуємо стилі для компоненту

export default function UserMenu() {
  const dispatch = useDispatch();  // Ініціалізуємо dispatch для надсилання дій
  const user = useSelector(selectUser);  // Отримуємо інформацію про користувача з Redux

  // Викликаємо оновлення користувача при першому рендері, якщо він є в localStorage
  useEffect(() => {
    if (!user) {  // Якщо користувач ще не завантажений (не авторизований)
      dispatch(refreshUser());  // Викликаємо операцію для оновлення користувача
    }
  }, [dispatch, user]);  // Залежності: при зміні dispatch або user

  const handleLogout = () => {
    dispatch(logout());  // Вихід користувача
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user?.name || user?.email || "Guest"}</p>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
