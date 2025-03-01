import LoginForm from "../../components/LoginForm/LoginForm";  // Імпортуємо компонент форми логіну
import PageTitle from "../../components/PageTitle/PageTitle";  // Імпортуємо компонент заголовка

export default function LoginPage() {
  return (
    <div>
      {/* Заголовок сторінки */}
      <PageTitle>Log In to Your Account</PageTitle>
      {/* Компонент форми логіну */}
      <LoginForm />
    </div>
  );
}
