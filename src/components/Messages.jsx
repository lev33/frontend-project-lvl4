import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '../context/StoreContext.jsx';

const Messages = observer(() => {
  const { chat } = useContext(StoreContext);

  return (
    <div>{chat.currentChannelId}</div>
  );
});

export default Messages;
