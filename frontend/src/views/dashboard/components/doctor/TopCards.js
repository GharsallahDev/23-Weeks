import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import icon1 from 'src/assets/images/svgs/icon-connect.svg';
import icon2 from 'src/assets/images/svgs/icon-user-male.svg';
import icon3 from 'src/assets/images/svgs/icon-briefcase.svg';
import icon4 from 'src/assets/images/svgs/icon-mailbox.svg';
import icon5 from 'src/assets/images/svgs/icon-favorites.svg';
import icon6 from 'src/assets/images/svgs/icon-speech-bubble.svg';

const topcards = [
  {
    href: '/appointments',
    icon: icon4,
    title: 'Appointments',
    digits: '12',
    bgcolor: 'primary',
  },
  {
    href: '/patients',
    icon: icon2,
    title: 'Patients',
    digits: '3,685',
    bgcolor: 'secondary',
  },
  {
    href: '/ultrasounds',
    icon: icon5,
    title: 'Ultrasounds',
    digits: '256',
    bgcolor: 'success',
  },
  {
    href: '/procedures',
    icon: icon3,
    title: 'Procedures',
    digits: '932',
    bgcolor: 'warning',
  },
  {
    href: '/lab-results',
    icon: icon1,
    title: 'Lab Results',
    digits: '48',
    bgcolor: 'error',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3} justifyContent="center" mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item key={i} xs={12} sm={4} lg={2} justifyContent="center">
          <Link to={topcard.href} style={{ textDecoration: 'none' }}>
            <Box
              bgcolor={topcard.bgcolor + '.light'}
              textAlign="center"
              borderRadius={2}
              boxShadow={1}
              p={2}
            >
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
