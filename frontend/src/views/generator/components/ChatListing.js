import React from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import chatbotIcon from 'src/assets/images/chat/gpt.png';

const ChatListing = ({ onStartChat, isChatActive }) => {
  return (
    <div>
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Avatar alt="Dr Gyno" src={chatbotIcon} sx={{ width: 50, height: 50 }} />
        <Box>
          <Typography variant="body1" fontWeight={600}>
            Dr Gyno
          </Typography>
          <Typography variant="body2">Advanced Prenatal Care Agent</Typography>
        </Box>
      </Box>
      <Box px={3} py={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onStartChat}
          disabled={isChatActive}
        >
          {isChatActive ? 'Chat Active' : 'Start Chat'}
        </Button>
      </Box>
    </div>
  );
};

export default ChatListing;