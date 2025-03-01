import css from "./PageTitle.module.css";  // Імпортуємо стилі для заголовка сторінки

// Компонент для відображення заголовка сторінки
export default function PageTitle({ children }) {
  // Виводимо заголовок, використовуючи передані діти (текст) та стилі
  return <h1 className={css.heading}>{children}</h1>;
}
