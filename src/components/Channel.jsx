import React from 'react';

const Channel = ({
  channel,
}) => {
  const { name } = channel;

  return (
    <div>{name}</div>
  );
};

export default Channel;
