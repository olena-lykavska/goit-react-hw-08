import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import * as Yup from "yup";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(response => {
        toast.success("Logged in successfully!");
        actions.resetForm();
      })
      .catch(error => {
        toast.error("Login failed, please try again.");
      });
  };

  // Валідація форми
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
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
            disabled={isSubmitting || !isValid}
            className={css.button}
          >
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
}
