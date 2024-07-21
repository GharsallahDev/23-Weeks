import React, { useState } from 'react';
import { IconButton, InputBase, Box } from '@mui/material';
import { IconSend } from '@tabler/icons';

const ChatMsgSent = ({ onSendMessage, isChatActive }) => {
  const [msg, setMsg] = useState('');

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    if (msg.trim() && isChatActive) {
      onSendMessage(msg.trim());
      setMsg('');
    }
  };

  return (
    <Box p={2}>
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder={isChatActive ? 'Type a Message' : 'Start chat to send messages'}
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange}
          disabled={!isChatActive}
        />
        <IconButton
          aria-label="send"
          onClick={onChatMsgSubmit}
          disabled={!msg.trim() || !isChatActive}
          color="primary"
          type="submit"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;