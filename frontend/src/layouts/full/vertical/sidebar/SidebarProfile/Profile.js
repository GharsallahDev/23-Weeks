import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-10.jpg';
import { IconPower } from '@tabler/icons';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="User Image" src={user.type === 'doctor' ? img1 : img2} />

          <Box>
            <Typography variant="h6" color="textPrimary">
              {user ? user.full_name : 'Full Name'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : 'Type'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="/auth/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
