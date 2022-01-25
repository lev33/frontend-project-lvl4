import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button, ButtonGroup, FormGroup, ListGroup, Dropdown,
} from 'react-bootstrap';

import StoreContext from '../context/StoreContext.jsx';

const handleAddChannel = () => {};
const handleRemoveChannel = () => {};
const handleRenameChannel = () => {};


const Channels = observer(() => {
  const { chat } = useContext(StoreContext);
  const { channels, currentChannelId } = chat;

  const handleChangeChannel = (id) => () => chat.setCurrentChannelId(id);

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
                    <span>#</span>
                    {name}
                  </Button>
                )
                : (
                  <Dropdown as={ButtonGroup}>
                    <Button
                      variant={variant}
                      onClick={handleChangeChannel}
                    >
                      <span>#</span>
                      {name}
                    </Button>
                    <Dropdown.Toggle split variant={variant} />
                    <Dropdown.Menu variant={variant}>
                      <Dropdown.Item onClick={handleRemoveChannel}>remove</Dropdown.Item>
                      <Dropdown.Item onClick={handleRenameChannel}>rename</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
            }
              </li>
            );
          })}
        </ListGroup>
      </FormGroup>
    </div>
  );
});

export default Channels;
