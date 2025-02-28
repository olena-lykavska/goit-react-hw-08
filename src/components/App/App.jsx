import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // Додаємо BrowserRouter
import Layout from "../Layout/Layout"; // Виправлено шлях
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations"; // Виправлено шлях
import { selectIsRefreshing } from "../../redux/auth/selectors"; // Виправлено шлях
import RestrictedRoute from "../RestrictedRoute"; // Виправлено шлях
import PrivateRoute from "../PrivateRoute"; // Виправлено шлях

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const PhonebookPage = lazy(() => import("../../pages/PhonebookPage/PhonebookPage")); // Було TasksPage

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user please wait...</p>
  ) : (
    <Router> {/* Додаємо BrowserRouter тут */}
      <Layout>
        <Suspense fallback={null}>
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
  );
}
