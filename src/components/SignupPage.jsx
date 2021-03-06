import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, Form, FormControl, FormGroup, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthorizationContext from '../context/AuthorizationContext.jsx';

const SignupPage = () => {
  const { logIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const nameInput = useRef();
  useEffect(() => {
    nameInput.current.focus();
  }, [nameInput]);

  const validationSchema = Yup.object({
    username: Yup.string().trim()
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .required('errors.required'),
    password: Yup.string().trim()
      .min(6, t('errors.passwordTooShort'))
      .max(20, t('errors.passwordLength'))
      .required(t('errors.required')),
    passwordConfirm: Yup.string().trim()
      .oneOf([Yup.ref('password'), null], t('errors.passwordNotMatch'))
      .min(6, 'error')
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: async (value) => {
      try {
        const { username, password } = value;
        const { data } = await axios.post('/api/v1/signup', { username, password });
        logIn(data);
        navigate('/');
      } catch (err) {
        console.log(err);
        nameInput.current.select();
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                Picture
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={nameInput}
                    type="text"
                    id="username"
                    name="username"
                    className=""
                    autoComplete="username"
                    placeholder={t('signup.username')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username && formik.touched.username}
                  />
                  <FormLabel className="form-label" htmlFor="username">{t('signup.username')}</FormLabel>
                  {formik.touched.username && formik.errors.username && (
                    <Form.Control.Feedback type="invalid">
                      {t('errors.length')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    className=""
                    autoComplete="current-password"
                    placeholder={t('signup.password')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.errors.password && formik.touched.password}
                  />
                  <FormLabel className="form-label" htmlFor="password">{t('signup.password')}</FormLabel>
                  {formik.touched.password && formik.errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {t('errors.passwordTooShort')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <FormGroup className="form-floating mb-4">
                  <FormControl
                    type="password"
                    ??
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className=""
                    autoComplete="password-confirm"
                    placeholder={t('signup.confirm')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    isInvalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                  />
                  <FormLabel className="form-label" htmlFor="passwordConfirm">{t('signup.confirm')}</FormLabel>
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                    <Form.Control.Feedback type="invalid">
                      {t('errors.passwordNotMatch')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">{t('signup.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
