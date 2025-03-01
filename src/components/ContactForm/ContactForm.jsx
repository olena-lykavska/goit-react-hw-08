import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Імпортуємо компоненти для форми
import { nanoid } from "nanoid"; // Генератор унікальних ідентифікаторів
import * as Yup from "yup"; // Бібліотека для валідації
import toast from "react-hot-toast"; // Додаємо тости для повідомлень
import css from "./ContactForm.module.css"; // Імпортуємо стилі
import { useDispatch, useSelector } from "react-redux"; // Підключаємо Redux
import { addContact } from "../../redux/contacts/operations"; // Дія для додавання контакту
import { selectLoading } from "../../redux/contacts/selectors"; // Вибір стану завантаження

const ContactForm = () => {
  const dispatch = useDispatch(); // Отримуємо функцію dispatch для виклику екшенів
  const loading = useSelector(selectLoading); // Отримуємо стан завантаження з Redux

  // Схема валідації форми
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is too short") // Мінімальна довжина 3 символи
      .max(50, "Name is too long") // Максимальна довжина 50 символів
      .required("Required"), // Поле обов'язкове
    number: Yup.string()
      .matches(/^\d+$/, "Only numbers") // Дозволяємо тільки цифри
      .min(3, "Phone number is too short") // Мінімальна довжина 3 цифри
      .max(15, "Phone number is too long") // Максимальна довжина 15 цифр
      .required("Required"), // Поле обов'язкове
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }} // Початкові значення форми
      validationSchema={validationSchema} // Додаємо схему валідації
      onSubmit={(values, { resetForm }) => {
        const contact = { id: nanoid(), ...values }; // Створюємо новий контакт
        dispatch(addContact(contact)) // Відправляємо дію в Redux
          .unwrap() // Очікуємо завершення `addContact`
          .then(() => {
            toast.success(`Contact ${values.name} added successfully!`); // Повідомлення про успіх
            resetForm(); // Очищаємо форму після додавання
          })
          .catch(() => {
            toast.error("Failed to add contact. Please try again."); // Повідомлення про помилку
          });
      }}
    >
      {({ isValid, dirty }) => ( // Деструктуруємо пропси для перевірки стану форми
        <Form className={css.form}> {/* Форма з класом для стилів */}
          <div className={css.formGroup}>
            <label className={css.label} htmlFor="name">Name:</label> {/* Поле для введення імені */}
            <Field id="name" name="name" type="text" autoComplete="name" className={css.input} />
            <ErrorMessage className={css.error} name="name" component="div" /> {/* Відображення помилок */}
          </div>

          <div className={css.formGroup}>
            <label className={css.label} htmlFor="number">Number:</label> {/* Поле для введення номера */}
            <Field id="number" name="number" type="text" autoComplete="tel" className={css.input} />
            <ErrorMessage className={css.error} name="number" component="div" /> {/* Відображення помилок */}
          </div>

          <button type="submit" className={css.button} disabled={loading || !isValid || !dirty}>
            {loading ? "Adding..." : "Add Contact"} {/* Кнопка відправки */}
          </button>
          {loading && <div className={css.loader}></div>} {/* Індикатор завантаження */}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm; // Експортуємо компонент
