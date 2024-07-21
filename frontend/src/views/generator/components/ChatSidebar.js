import React from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import ChatListing from './ChatListing';

const drawerWidth = 320;

const ChatSidebar = ({ isMobileSidebarOpen, onSidebarClose, onStartChat, isChatActive }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: 'relative' },
      }}
    >
      <ChatListing onStartChat={onStartChat} isChatActive={isChatActive} />
    </Drawer>
  );
};

export default ChatSidebar;