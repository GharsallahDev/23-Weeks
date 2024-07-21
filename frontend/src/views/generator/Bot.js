import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';
import ChatMsgSent from './components/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Chat Bot',
  },
];

const Bot = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleStartChat = () => {
    setIsChatActive(true);
  };

  const handleSendMessage = async (message) => {
    if (!isChatActive) return;

    // Add user message
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: message }]);

    // Set bot typing to true
    setIsBotTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add bot response
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: data.content }]);
      } else {
        console.error('Error from chatbot API');
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    } finally {
      // Set bot typing to false after response is received
      setIsBotTyping(false);
    }
  };

  return (
    <PageContainer title="Chat Bot" description="Dr. Gyno Chat Bot">
      <Breadcrumb title="Chat Bot" items={BCrumb} />
      <AppCard>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          onStartChat={handleStartChat}
          isChatActive={isChatActive}
        />
        <Box flexGrow={1} display="flex" flexDirection="column">
          <ChatContent
            toggleChatSidebar={() => setMobileSidebarOpen(true)}
            messages={messages}
            isChatActive={isChatActive}
            isBotTyping={isBotTyping}
          />
          <Divider />
          <ChatMsgSent onSendMessage={handleSendMessage} isChatActive={isChatActive} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Bot;