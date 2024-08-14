import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton, Stack } from '@mui/material';
import { IconMail } from '@tabler/icons';
import * as dropdownData from './data';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import ProfileImg2 from 'src/assets/images/profile/user-10.jpg';
import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { logout } from 'src/store/auth/AuthSlice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux store
    navigate('/auth/login'); // Redirect to login page
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user.type === 'doctor' ? ProfileImg : ProfileImg2}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                src={user.type === 'doctor' ? ProfileImg : ProfileImg2}
                alt={ProfileImg}
                sx={{ width: 95, height: 95 }}
              />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {user ? user.full_name : 'Full Name'}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {user ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : 'Type'}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {user ? user.email : 'Email'}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Unlimited <br />
                      Access
                    </Typography>
                    <Button variant="contained" color="primary">
                      Upgrade
                    </Button>
                  </Box>
                  <img src={unlimitedImg} alt="unlimited" className="signup-bg" />
                </Box>
              </Box>
              <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
