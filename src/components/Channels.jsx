import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button, ButtonGroup, FormGroup, ListGroup, Dropdown, Modal, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import StoreContext from '../context/StoreContext.jsx';
import SocketContext from '../context/SocketContext.jsx';

const Channels = observer(() => {
  const { t } = useTranslation();
  const { chat } = useContext(StoreContext);
  const { newChannel } = useContext(SocketContext);
  const { removeChannel } = useContext(SocketContext);
  const { renameChannel } = useContext(SocketContext);
  const { channels, currentChannelId } = chat;
  const channelsNames = channels.map((el) => el.name);

  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');
  const [title, setTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const textInput = useRef(null);
  useEffect(() => {
    if (textInput.current) textInput.current.focus();
  });

  const handleChangeChannel = (id) => () => chat.setCurrentChannelId(id);
  const handleAddChannel = () => {
    setAction('add');
    setTitle(t('addTitle'));
    handleShow();
  };
  const handleRemoveChannel = (id) => () => {
    chat.setCurrentChannelId(id);
    setAction('remove');
    setTitle(t('removeTitle'));
    handleShow();
  };
  const handleRenameChannel = (id) => () => {
    chat.setCurrentChannelId(id);
    setAction('rename');
    setTitle(t('renameTitle'));
    handleShow();
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validateOnChange: false,
    validationSchema: action !== 'remove' && Yup.object({
      channelName: Yup.string().trim()
        .min(3, t('errors.length'))
        .max(20, t('errors.length'))
        .notOneOf(channelsNames, t('errors.channelExists'))
        .required(t('errors.required')),
    }),
    onSubmit: async (initialValues) => {
      const name = initialValues.channelName.trim();
      try {
        if (action === 'add') {
          await newChannel({ name });
          toast.success(t('channels.toastNew'));
        }
        if (action === 'remove') {
          await removeChannel({ id: currentChannelId });
          toast.success(t('channels.toastRemove'));
        }
        if (action === 'rename') {
          await renameChannel({ id: currentChannelId, name });
          toast.success(t('channels.toastRename'));
        }
        handleClose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-ligth">
      <FormGroup className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <Button
          type="button"
          variant="outline-primary"
          onClick={handleAddChannel}
        >
          <span>+</span>
        </Button>
      </FormGroup>
      <FormGroup>
        <ListGroup className="nav">
          {channels.map((channel) => {
            const { id, name, removable } = channel;
            const variant = id === currentChannelId ? 'secondary' : 'light';
            return (
              <li key={id} className="nav-item">
                {
              !removable
                ? (
                  <Button
                    variant={variant}
                    onClick={handleChangeChannel(id)}
                  >
                    <span># </span>
                    {name}
                  </Button>
                )
                : (
                  <Dropdown as={ButtonGroup}>
                    <Button
                      variant={variant}
                      onClick={handleChangeChannel(id)}
                    >
                      <span># </span>
                      {name}
                    </Button>
                    <Dropdown.Toggle split variant={variant} />
                    <Dropdown.Menu variant={variant}>
                      <Dropdown.Item onClick={handleRemoveChannel(id)}>{t('channels.remove')}</Dropdown.Item>
                      <Dropdown.Item onClick={handleRenameChannel(id)}>{t('channels.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
            }
              </li>
            );
          })}
        </ListGroup>
      </FormGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {
              title
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'remove' ? (
            <span>{t('confirmation')}</span>
          ) : (
            <Form onSubmit={formik.handleSubmit}>
              <InputGroup noValidate className="mt-auto">
                <FormControl
                  ref={textInput}
                  name="channelName"
                  required
                  placeholder={action === 'rename' ? 'enter new name' : t('channels.name')}
                  maxLength={20}
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  disabled={formik.isSubmitting}
                  aria-label={t('channels.name')}
                />
              </InputGroup>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancelButton')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {action === 'remove' ? t('removeButton') : t('submitButton')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default Channels;
