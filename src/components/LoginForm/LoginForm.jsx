import { Formik, Form, Field, ErrorMessage } from "formik";  // Імпортуємо компоненти з Formik для роботи з формою
import { useDispatch } from "react-redux";  // Імпортуємо хук useDispatch для відправки дій в Redux
import { toast } from "react-hot-toast";  // Імпортуємо toast для відображення повідомлень
import { login } from "../../redux/auth/operations";  // Імпортуємо операцію для логіну з Redux
import css from "./LoginForm.module.css";  // Імпортуємо стилі
import * as Yup from "yup";  // Імпортуємо бібліотеку Yup для валідації форми

export default function LoginForm() {
  const dispatch = useDispatch();  // Ініціалізуємо dispatch для роботи з Redux

  // Обробник відправки форми
  const handleSubmit = (values, actions) => {
    dispatch(login(values))  // Відправляємо значення форми на сервер для логіну
      .unwrap()  // Обробляємо результат
      .then(response => {
        toast.success("Logged in successfully!");  // Якщо логін успішний - показуємо повідомлення
        actions.resetForm();  // Очищаємо форму після успішної відправки
      })
      .catch(error => {
        // Якщо виникла помилка, намагаємось отримати детальне повідомлення з API або використовуємо стандартне
        const errorMessage = error.response?.data?.message || "Login failed, please try again."; 
        toast.error(errorMessage);  // Показуємо конкретну помилку, якщо вона є
      });
  };

  // Валідація форми за допомогою Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")  // Перевірка на валідність email
      .required("Required"),  // Перевірка на обов'язковість поля
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")  // Мінімальна кількість символів для пароля
      .required("Required"),  // Перевірка на обов'язковість поля
  });

  return (
    <Formik
      initialValues={{
        email: "",  // Початкове значення для email
        password: "",  // Початкове значення для пароля
      }}
      validationSchema={validationSchema}  // Додаємо валідацію
      onSubmit={handleSubmit}  // Вказуємо обробник для відправки форми
    >
      {({ isSubmitting, isValid }) => (
        // Формуємо форму
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />  
            <ErrorMessage name="email" component="div" className={css.error} />  
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />  
            <ErrorMessage name="password" component="div" className={css.error} />  
          </label>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}  // Кнопка стає неактивною під час відправки або при невірній валідації
            className={css.button}
          >
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
}
