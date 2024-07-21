import React from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/baby-inside-woman-womb.png';
import { useSelector } from 'react-redux';

const WelcomeCard = () => {
  const user = useSelector((state) => state.auth.user);

  const pregnancyWeek = 12;
  const babySize = 'a lime';

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        minHeight: 'auto', // Reduce card height
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 }, // Reduced padding
          '&:last-child': { pb: { xs: 2, sm: 2.5 } }, // Reduced padding
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom>
                {' '}
                {/* Increased from h6 to h5 */}
                Welcome back {user ? user.full_name : 'Full Name'}!
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {' '}
                {/* Increased from body2 to body1 */}
                Week {pregnancyWeek}: Your baby is about the size of {babySize}.
              </Typography>
              <Button variant="contained" color="primary" size="medium">
                {' '}
                {/* Increased from small to medium */}
                Track Progress
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}
          >
            <img
              src={welcomeImg}
              alt="Pregnancy visual"
              style={{ maxWidth: '130px', width: '100%', height: 'auto' }} // Slightly reduced max-width
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;