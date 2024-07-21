import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledBox = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Question = ({ question, onAnswer }) => {
  return (
    <StyledBox>
      <Typography variant="h6">
        {question.text}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StyledButton variant="outlined" fullWidth onClick={() => onAnswer(option)}>
              {option}
            </StyledButton>
          </motion.div>
        ))}
      </Box>
    </StyledBox>
  );
};

export default Question;