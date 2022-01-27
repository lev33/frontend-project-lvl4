import React, { useContext } from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import AuthorizationContext from '../context/AuthorizationContext.jsx';

const LoginPage = () => {
  const { logIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  return (
    <>
      <main>
        <h2>Login page</h2>
        <Formik
          initialValues={{ name: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          })}
          onSubmit={async (value) => {
            try {
              const { data } = await axios.post('/api/v1/login', value);
              logIn(data);
              navigate('/');
            } catch (err) {
              console.log(err.response);
            }
          }}
        >
          <Form>
            <label htmlFor="username">User Name</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" />

            <label htmlFor="password">Password</label>
            <Field name="password" type="text" />
            <ErrorMessage name="password" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <nav>
        <Link to="/signup">signup</Link>
      </nav>
    </>
  );
};

export default LoginPage;
