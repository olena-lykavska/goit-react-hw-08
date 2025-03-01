import { Toaster } from "react-hot-toast"; // Імпортуємо Toaster для виведення сповіщень (toast)
import AppBar from "../AppBar/AppBar"; // Імпортуємо компонент верхньої навігаційної панелі (AppBar)
import css from "./Layout.module.css"; // Імпортуємо модульні стилі для компонента Layout

// Головний компонент Layout, який визначає структуру сторінки
export default function Layout({ children }) {
  return (
    <div className={css.container}> {/* Основний контейнер для компонента Layout */}
      <AppBar /> {/* Відображаємо AppBar (верхню навігаційну панель) */}
      {children} {/* Відображаємо дочірні компоненти (контент сторінки) */}
      <Toaster position="top-center" reverseOrder={false} /> {/* Додаємо тости для сповіщень */}
    </div>
  );
}
