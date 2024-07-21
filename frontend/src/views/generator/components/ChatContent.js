import React from 'react';
import { Typography, Avatar, ListItemAvatar, Box } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import chatIcon from 'src/assets/images/chat/gpt.png';
import { keyframes } from '@emotion/react';

// Keyframes for the typing animation
const typingAnimation = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const ChatContent = ({ toggleChatSidebar, messages, isChatActive, isBotTyping }) => {
  return (
    <Box sx={{ height: '650px', display: 'flex', flexDirection: 'column' }}>
      {isChatActive ? (
        <Scrollbar sx={{ flexGrow: 1, overflow: 'auto', maxHeight: '100%' }}>
          <Box p={3}>
            {messages.map((message, index) => (
              <Box key={index} mb={2}>
                {message.sender === 'bot' ? (
                  <Box display="flex">
                    <ListItemAvatar>
                      <Avatar alt="Dr Gyno" src={chatIcon} sx={{ width: 40, height: 40 }} />
                    </ListItemAvatar>
                    <Box>
                      <Typography variant="body2" color="grey.400" mb={1}>
                        Dr Gyno
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: 'grey.100',
                          borderRadius: '10px',
                          maxWidth: '80%',
                        }}
                      >
                        <Typography>{message.content}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: 'primary.light',
                        borderRadius: '10px',
                        maxWidth: '80%',
                      }}
                    >
                      <Typography>{message.content}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            {isBotTyping && (
              <Box display="flex" alignItems="center" mb={2}>
                <ListItemAvatar>
                  <Avatar alt="Dr Gyno" src={chatIcon} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <Box
                  sx={{
                    width: 60, // Set a fixed width for the box
                    height: 30, // Set a fixed height for the box
                    backgroundColor: 'grey.100',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <Box
                      key={dot}
                      component="span"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'grey.500',
                        mx: 0.5,
                        animation: `${typingAnimation} 1s infinite ${dot * 0.3}s`,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Scrollbar>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
          <Typography variant="h4">No active chat. Start a conversation with Dr. Gyno!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
