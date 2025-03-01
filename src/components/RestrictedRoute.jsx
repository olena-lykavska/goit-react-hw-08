import { useSelector } from "react-redux";  // Імпортуємо хук для доступу до Redux-стану
import { selectIsLoggedIn } from "../redux/auth/selectors";  // Селектор для перевірки, чи авторизований користувач
import { Navigate } from "react-router-dom";  // Імпортуємо компонент для редиректу

export default function RestrictedRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);  // Отримуємо стан авторизації користувача з Redux

  // Якщо користувач авторизований, редиректимо його на вказану сторінку
  // Якщо не авторизований, відображаємо переданий компонент
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
