import React from "react"; // Імпорт React для використання JSX
import ReactDOM from "react-dom/client"; // Імпорт ReactDOM для рендерингу компонента
import { Provider } from "react-redux"; // Імпорт Provider для надання доступу до Redux store
import { BrowserRouter } from "react-router-dom"; // Імпорт BrowserRouter для налаштування маршрутизації
import { PersistGate } from "redux-persist/integration/react"; // Імпорт PersistGate для інтеграції redux-persist
import { store, persistor } from "./redux/store"; // Імпорт store і persistor для доступу до стану та збереження
import App from "./components/App/App"; // Імпорт основного компонента додатку
import "./index.css"; // Імпорт стилів

// Рендеринг додатку в корінь DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Надає доступ до Redux store всім компонентам */}
    <PersistGate loading={null} persistor={persistor}> {/* Зберігає стан Redux при перезавантаженні сторінки */}
      <BrowserRouter> {/* Налаштовує маршрутизацію для додатку */}
        <App /> {/* Основний компонент додатку */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
