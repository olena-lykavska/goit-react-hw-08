import React from "react";
import { useDispatch, useSelector } from "react-redux";  // Імпортуємо хуки для роботи з Redux
import { changeFilter } from "../../redux/filters/slice";  // Імпортуємо дію для зміни фільтру
import { selectNameFilter } from "../../redux/filters/selectors";  // Імпортуємо селектор для отримання поточного фільтру
import css from "./SearchBox.module.css";  // Імпортуємо стилі для компонента

const SearchBox = () => {
  const dispatch = useDispatch();  // Ініціалізуємо dispatch для надсилання дій
  const filter = useSelector(selectNameFilter);  // Отримуємо поточний фільтр з Redux-стану

  return (
    <input
      type="text"  // Тип поля вводу
      value={filter}  // Прив'язуємо значення інпуту до фільтру з Redux
      onChange={(e) => dispatch(changeFilter(e.target.value))}  // Відправляємо дію для оновлення фільтру
      placeholder="Search contacts by name"  // Текст-підказка для поля вводу
      className={css.input}  // Стилі для інпуту
    />
  );
};

export default SearchBox;
