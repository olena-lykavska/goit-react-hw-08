import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "../Layout/Layout"; // Імпорт Layout для загальної структури
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations"; // Імпорт операції для оновлення користувача
import { selectIsRefreshing } from "../../redux/auth/selectors"; // Імпорт селектора для перевірки стану оновлення користувача
import RestrictedRoute from "../RestrictedRoute"; // Обмежений маршрут для незалогінених користувачів
import PrivateRoute from "../PrivateRoute"; // Приватний маршрут для залогінених користувачів
import { PersistGate } from "redux-persist/integration/react"; // Імпорт PersistGate для роботи з redux-persist
import { persistor } from "../../redux/store"; // Імпорт persistor, який відповідає за інтеграцію з redux-persist
import css from "./App.module.css"; // Імпорт стилів

// Ліниве завантаження сторінок для покращення продуктивності
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const PhonebookPage = lazy(() => import("../../pages/PhonebookPage/PhonebookPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing); // Отримуємо стан оновлення користувача

  // Викликаємо refreshUser при завантаженні компоненту, щоб отримати актуальну інформацію про користувача
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    // Показуємо лоадер під час оновлення інформації про користувача
    <div className={css.loader}></div>
  ) : (
    // Якщо дані оновлено, обгортаємо додаток у PersistGate для синхронізації з redux-persist
    <PersistGate loading={<div className={css.loader}></div>} persistor={persistor}> 
      <Router>
        <Layout>
          <Suspense fallback={<div className={css.loader}></div>}>
            {/* Оголошуємо маршрути додатка */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute component={<LoginPage />} redirectTo="/phonebook" />
                }
              />
              <Route
                path="/phonebook"
                element={
                  <PrivateRoute component={<PhonebookPage />} redirectTo="/login" />
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </PersistGate> // Завершуємо обгортку PersistGate
  );
}
