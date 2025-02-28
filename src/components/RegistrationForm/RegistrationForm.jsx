import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .then(() => {
        actions.resetForm();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Валідація форми
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
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Username
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage 
              name="name" 
              component="div" 
              className={css.error} 
            />
          </label>

          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage 
              name="email" 
              component="div" 
              className={css.error} 
            />
          </label>

          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage 
              name="password" 
              component="div" 
              className={css.error} 
            />
          </label>

          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting || !isValid} // Кнопка неактивна, поки форма не валідна
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
