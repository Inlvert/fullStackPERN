import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: "user1@mail.com",
  password: "12345user",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, formikBag) => {
    dispatch(login(values));

    formikBag.resetForm();
  };

  return (
    <div>
      <h3>LoginForm</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LOGIN_SCHEMA}
      >
        <Form>
          <Field name="email" type="email" placeholder="email" />
          <Field name="password" type="password" placeholder="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
