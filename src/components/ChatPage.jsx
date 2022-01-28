import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import AuthorizationContext from '../context/AuthorizationContext.jsx';
import StoreContext from '../context/StoreContext.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getAuthorizationHeader, logOut } = useContext(AuthorizationContext);
  const { chat } = useContext(StoreContext);
  const [loaded, setLoaded] = useState(false);

  const f = async ({ header }) => {
    try {
      const { data } = await axios.get('/api/v1/data', { headers: header });
      console.log(data);
      chat.setChannels(data.channels);
      chat.setMessages(data.messages);
      chat.setCurrentChannelId(data.currentChannelId);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        logOut();
        return;
      }
      if (error.isAxiosError && error.response.status === 500) {
        toast(t('errors.networkError'));
      }
      toast(t('errors.error'));
    }
  };

  useEffect(() => {
    setLoaded(true);
    const header = getAuthorizationHeader();
    f({ header, logOut });
  }, []);

  if (!loaded) {
    return (
      <>
        <Spinner animation="grow" variant="primary" />
        <span>Loading</span>
      </>
    );
  }

  return (
    <Container>
      <div className="row">
        <Channels />
        <Messages />
      </div>
    </Container>
  );
};

export default ChatPage;
