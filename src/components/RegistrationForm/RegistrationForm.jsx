import { Formik, Form, Field, ErrorMessage } from "formik";  // Імпортуємо компоненти з Formik для роботи з формою
import { useDispatch } from "react-redux";  // Імпортуємо хук для використання dispatch
import { register } from "../../redux/auth/operations";  // Імпортуємо функцію реєстрації з Redux
import css from "./RegistrationForm.module.css";  // Імпортуємо стилі для форми реєстрації
import * as Yup from "yup";  // Імпортуємо Yup для валідації форми
import { useState } from "react";  // Імпортуємо useState для обробки стану помилок сервера

export default function RegistrationForm() {
  const dispatch = useDispatch();  // Ініціалізуємо dispatch для надсилання дій до Redux
  const [serverError, setServerError] = useState("");  // Стан для зберігання помилки сервера

  // Функція для обробки відправки форми
  const handleSubmit = async (values, actions) => {
    setServerError("");  // Очищаємо попередні помилки перед новим запитом

    try {
      await dispatch(register(values)).unwrap();  // Відправляємо запит на реєстрацію
      actions.resetForm();  // Очищаємо форму після успішної реєстрації
    } catch (error) {
      setServerError(error);  // Встановлюємо помилку, якщо вона виникла
      actions.setSubmitting(false);  // Оновлюємо стан форми після обробки помилки
    }
  };

  // Валідація форми за допомогою Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Username is too short")
      .max(50, "Username is too long")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "Email is too short")
      .max(50, "Email is too long")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}  // Початкові значення для полів
      validationSchema={validationSchema}  // Застосовуємо валідацію
      onSubmit={handleSubmit}  // Вказуємо функцію, яка буде викликана при відправці форми
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.form} autoComplete="off">  // Створюємо форму
          {/* Поле для введення імені */}
          <label className={css.label}>
            Username
            <Field type="text" name="name" className={css.input} />  // Поле для імені
            <ErrorMessage name="name" component="div" className={css.error} />  // Показуємо помилку для імені
          </label>

          {/* Поле для введення email */}
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />  // Поле для email
            <ErrorMessage name="email" component="div" className={css.error} />  // Показуємо помилку для email
          </label>

          {/* Поле для введення пароля */}
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />  // Поле для пароля
            <ErrorMessage name="password" component="div" className={css.error} />  // Показуємо помилку для пароля
          </label>

          {/* Виводимо помилку сервера, якщо вона є */}
          {serverError && <div className={css.error}>{serverError}</div>}

          {/* Кнопка для відправки форми */}
          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting || !isValid}  // Дизейбл кнопки, якщо форма в процесі відправки або не валідна
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
