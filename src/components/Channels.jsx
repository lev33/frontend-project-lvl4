import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button, ButtonGroup, FormGroup, ListGroup, Dropdown, Modal, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import StoreContext from '../context/StoreContext.jsx';
import SocketContext from '../context/SocketContext.jsx';

const Channels = observer(() => {
  const { chat } = useContext(StoreContext);
  const { newChannel } = useContext(SocketContext);
  const { removeChannel } = useContext(SocketContext);
  const { renameChannel } = useContext(SocketContext);
  // const { newChannel, renameChannel } = socket;
  const { channels, currentChannelId } = chat;
  const channelsNames = channels.map((el) => el.name);

  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const textInput = useRef(null);

  const handleChangeChannel = (id) => () => chat.setCurrentChannelId(id);
  const handleAddChannel = () => {
    setAction('add');
    handleShow();
  };
  const handleRemoveChannel = (id) => () => {
    chat.setCurrentChannelId(id);
    setAction('remove');
    handleShow();
  };
  const handleRenameChannel = (id) => () => {
    chat.setCurrentChannelId(id);
    setAction('rename');
    handleShow();
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validateOnChange: false,
    validationSchema: action !== 'remove' && Yup.object({
      channelName: Yup.string().trim()
        .min(2, 'error')
        .max(20, 'error')
        .notOneOf(channelsNames, 'error')
        .required('required'),
    }),
    onSubmit: async (initialValues) => {
      const name = initialValues.channelName.trim();
      try {
        if (action === 'add') {
          await newChannel({ name });
        }
        if (action === 'remove') {
          console.log('remove', name, currentChannelId);
          await removeChannel({ id: currentChannelId });
        }
        if (action === 'rename') {
          console.log('rename', name, currentChannelId);
          await renameChannel({ id: currentChannelId, name });
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
        <span>channels</span>
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
                      <Dropdown.Item onClick={handleRemoveChannel(id)}>remove</Dropdown.Item>
                      <Dropdown.Item onClick={handleRenameChannel(id)}>rename</Dropdown.Item>
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
              action === 'add' ? 'add' : (action === 'remove' ? 'remove' : 'rename')
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'remove' ? (
            'Confirm?'
          ) : (
            <Form onSubmit={formik.handleSubmit}>
              <InputGroup noValidate className="mt-auto">
                <FormControl
                  ref={textInput}
                  name="channelName"
                  required
                  placeholder={action === 'rename' ? 'enter new name' : 'addChannel'}
                  maxLength={20}
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  disabled={formik.isSubmitting}
                />
              </InputGroup>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default Channels;
