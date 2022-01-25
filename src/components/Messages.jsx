import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, FormGroup } from 'react-bootstrap';

import StoreContext from '../context/StoreContext.jsx';
import MessageForm from './MessageForm.jsx';

const Messages = observer(() => {
  const { chat } = useContext(StoreContext);

  const { channels, messages, currentChannelId } = chat;
  const numberOfMessages = messages.length;

  const name = currentChannelId ? channels.find((el) => el.id === currentChannelId).name : '';

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            {'# '}
            <b>{name}</b>
          </p>
          <span className="text-muted">{`${numberOfMessages} posts`}</span>
        </div>
        <FormGroup id="message-box" className="chat-messages overflow-auto px-5">
          {messages.map(({ user, text, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{user}</b>
              {': '}
              {text}
            </div>
          ))}
        </FormGroup>
        <MessageForm />
      </div>
    </Col>
  );
});

export default Messages;
