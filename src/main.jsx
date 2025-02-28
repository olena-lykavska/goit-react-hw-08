import React from "react"; // Імпортуємо React для використання JSX
import ReactDOM from "react-dom/client"; // Імпортуємо ReactDOM для рендерингу компонента в DOM
import { Provider } from "react-redux"; // Імпортуємо Provider з Redux для доступу до store
import { store } from "./redux/store"; // Імпортуємо налаштований Redux store
import App from "./components/App/App"; // Імпортуємо головний компонент додатка (App)
import "./index.css"; // Імпортуємо глобальні стилі

// Рендеримо додаток в DOM за допомогою ReactDOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Залишаємо store доступним для всіх компонентів додатка */}
    <App /> {/* Головний компонент додатка */}
  </Provider>
);