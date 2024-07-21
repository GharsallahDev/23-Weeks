import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingAnimation = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <CircularProgress size={60} />
      <Typography variant="h6">Generating perfect names for your baby...</Typography>
    </Box>
  );
};

export default LoadingAnimation;