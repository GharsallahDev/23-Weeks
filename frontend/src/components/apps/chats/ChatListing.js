import React, { useState } from 'react';
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  TextField,
  Box,
  Alert,
  Badge,
  ListItemButton,
  Typography,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import Scrollbar from '../../custom-scroll/Scrollbar';
import { formatDistanceToNowStrict } from 'date-fns';
import { IconChevronDown, IconSearch } from '@tabler/icons';
import chatbotIcon from 'src/assets/images/chat/gpt.png';

// Static list of chats
const staticChats = [
  {
    id: 1,
    name: 'Chat 1',
    messages: [
      {
        senderId: 1,
        msg: 'Hello!',
        type: 'text',
      },
    ],
  },
  {
    id: 2,
    name: 'Chat 2',
    messages: [
      {
        senderId: 2,
        msg: 'How are you?',
        type: 'text',
      },
    ],
  },
];

const ChatListing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filterChats = (chats, searchText) => {
    if (searchText) {
      return chats.filter((chat) => chat.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    return chats;
  };

  const getDetails = (conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? 'You: ' : '';
      const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg;
      return `${sender}${message}`;
    }
    return '';
  };


  const chats = filterChats(staticChats, searchText);

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* Profile */}
      {/* ------------------------------------------- */}
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          overlap="circular"
          color="success"
        >
          <Avatar alt="Gyno" src={chatbotIcon} sx={{ width: 50, height: 50 }} />
        </Badge>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            Dr Gyno
          </Typography>
          <Typography variant="body2">Advanced Prenatal Care Agent</Typography>
        </Box>
      </Box>
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Contact List */}
      {/* ------------------------------------------- */}
      <List sx={{ px: 0 }}>
        <Box px={2.5} pb={1}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Recent Chats <IconChevronDown size="16" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
            <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
          </Menu>
        </Box>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '600px' }}>
          {chats.length ? (
            chats.map((chat) => (
              <ListItemButton
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                sx={{
                  mb: 0.5,
                  py: 2,
                  px: 3,
                  alignItems: 'start',
                }}
                selected={activeChat === chat.id}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {chat.name}
                    </Typography>
                  }
                  secondary={getDetails(chat)}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                No Contacts Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
