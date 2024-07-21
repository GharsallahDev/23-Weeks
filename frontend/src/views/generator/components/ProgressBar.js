import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="caption" align="center" display="block">
        Question {current} of {total}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
