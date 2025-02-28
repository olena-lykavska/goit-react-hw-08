import { Toaster } from "react-hot-toast";
import AppBar from "../AppBar/AppBar"; // Ти вже створила AppBar, тож залишаємо імпорт
import css from "./Layout.module.css"; // Залишаємо імпорт стилів для компонента Layout

export default function Layout({ children }) {
  return (
    <div className={css.container}> {/* Контейнер для всього компонента */}
      <AppBar /> {/* Вставляємо AppBar */}
      {children} {/* Відображаємо дочірні компоненти */}
      <Toaster position="top-center" reverseOrder={false} /> {/* Повідомлення Toast */}
    </div>
  );
}
