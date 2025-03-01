import { useSelector } from "react-redux";  // Імпортуємо хук для доступу до Redux-стану
import { selectIsLoggedIn } from "../redux/auth/selectors";  // Селектор для перевірки, чи авторизований користувач
import { Navigate } from "react-router-dom";  // Імпортуємо компонент для редиректу

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);  // Отримуємо стан авторизації користувача з Redux

  // Якщо користувач авторизований, відображаємо переданий компонент.
  // Якщо ні — редиректимо на зазначену сторінку
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
