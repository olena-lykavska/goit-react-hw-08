import { lazy, Suspense, useEffect } from "react"; // Імпорт функцій для лінивого завантаження та обробки асинхронних компонентів
import { Route, Routes } from "react-router-dom"; // Імпорт для роботи з маршрутами та рендерингом компонентів
import Layout from "../Layout/Layout"; // Імпорт компонента Layout, який визначає загальну структуру сторінки
import { useDispatch, useSelector } from "react-redux"; // Імпорт хуків для роботи з Redux
import { refreshUser } from "../../redux/auth/operations"; // Імпорт дії для оновлення користувача
import { selectIsRefreshing } from "../../redux/auth/selectors"; // Імпорт селектора для перевірки стану оновлення
import RestrictedRoute from "../RestrictedRoute"; // Імпорт компонента для обмежених маршрутів
import PrivateRoute from "../PrivateRoute"; // Імпорт компонента для приватних маршрутів
import css from "./App.module.css"; // Імпорт стилів для компонента App

// Ліниве завантаження сторінок (вони будуть завантажуватися тільки при необхідності)
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const PhonebookPage = lazy(() => import("../../pages/PhonebookPage/PhonebookPage"));

export default function App() {
  const dispatch = useDispatch(); // Ініціалізація dispatch для відправки дій у Redux
  const isRefreshing = useSelector(selectIsRefreshing); // Отримання стану оновлення користувача з Redux

  // Виконання запиту на оновлення користувача при завантаженні додатку
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]); // Запуск тільки при зміні dispatch

  // Якщо відбувається оновлення користувача, показуємо лоадер
  return isRefreshing ? (
    <div className={css.loader}></div> // Показуємо індикатор завантаження, поки оновлюється користувач
  ) : (
    // Основна структура додатку
    <Layout>
      {/* Використовуємо Suspense для лінивого завантаження сторінок */}
      <Suspense fallback={<div className={css.loader}></div>}> {/* Показуємо лоадер під час завантаження компонентів */}
        <Routes>
          {/* Маршрут для домашньої сторінки */}
          <Route path="/" element={<HomePage />} />
          
          {/* Маршрути для сторінок реєстрації та входу з обмеженням доступу */}
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegisterPage />} redirectTo="/login" />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />}
          />
          
          {/* Приватний маршрут для сторінки телефонної книги */}
          <Route
            path="/contacts"
            element={<PrivateRoute component={<PhonebookPage />} redirectTo="/login" />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
