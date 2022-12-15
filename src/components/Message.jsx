import React from 'react';

const Message = ({ message, classN }) => {
  return (
    <div>
      <div className={classN}>{message}</div>
    </div>
  );
};

export default Message;
