import React, { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup, InputGroup, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import StoreContext from '../context/StoreContext.jsx';
import SocketContext from '../context/SocketContext.jsx';
import AuthorizationContext from '../context/AuthorizationContext.jsx';

const MessageForm = () => {
  const { t } = useTranslation();
  const { chat } = useContext(StoreContext);
  const { sendMessage } = useContext(SocketContext);
  const { user } = useContext(AuthorizationContext);
  const textInput = useRef(null);

  const { username } = user;
  const { currentChannelId } = chat;
  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object({
      message: Yup.string().trim()
        .max(400, 'Must be 400 characters or less')
        .required('Required'),
    }),
    onSubmit: async (initialValues, { resetForm }) => {
      const message = {
        user: username,
        channelId: currentChannelId,
        text: initialValues.message,
      };

      try {
        await sendMessage(message);
        resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    textInput.current.focus();
  });

  return (
    <FormGroup className="mt-auto py-3 px-5">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <InputGroup>
          <FormControl
            ref={textInput}
            name="message"
            required
            data-testid="new-message"
            placeholder="New message..."
            maxLength={400}
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          />
          <Button
            type="submit"
            variant="outline-secondary"
            className="ml-2"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" role="status" />
                <span className="ms-2">{(t('sending'))}</span>
              </>
            ) : <b>{(t('send'))}</b>}
          </Button>
        </InputGroup>
      </Form>
    </FormGroup>
  );
};
export default MessageForm;
