import PageTitle from "../../components/PageTitle/PageTitle";  // Імпортуємо компонент заголовка сторінки
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";  // Імпортуємо компонент форми реєстрації

export default function RegisterPage() {
  return (
    <div>
      <PageTitle>Register Your Account</PageTitle>  {/* Заголовок для сторінки реєстрації */}
      <RegistrationForm />  {/* Компонент форми реєстрації */}
    </div>
  );
}
