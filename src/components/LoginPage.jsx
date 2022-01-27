import React, { useContext, useEffect, useRef } from 'react';
import {
  NavLink, useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card,
} from 'react-bootstrap';

import AuthorizationContext from '../context/AuthorizationContext.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
  }, [nameInput]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (value) => {
      try {
        const { data } = await axios.post('/api/v1/login', value);
        logIn(data);
        navigate('/');
      } catch (err) {
        console.log(err.response);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card id="logIn" className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                Picture
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.logIn')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={nameInput}
                    type="text"
                    id="username"
                    name="username"
                    className=""
                    autoComplete="username"
                    placeholder={t('login.nickname')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <FormLabel htmlFor="username" />
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    className=""
                    autoComplete="current-password"
                    placeholder={t('login.password')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <FormLabel htmlFor="password" />
                </FormGroup>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">{t('login.logIn')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">{t('login.noAccount')}</span>
                <NavLink to="/signup">{t('login.signup')}</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
