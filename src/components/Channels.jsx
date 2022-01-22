import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '../context/StoreContext.jsx';
import Channel from './Channel.jsx';

const Channels = observer(() => {
  const { chat } = useContext(StoreContext);
  const { channels } = chat;

  return (
    <div className="col-3">
      {channels.map((channel) => {
        const { id } = channel;
        return (
          <Channel
            key={id}
            channel={channel}
          />
        );
      })}
    </div>

  );
});

export default Channels;
