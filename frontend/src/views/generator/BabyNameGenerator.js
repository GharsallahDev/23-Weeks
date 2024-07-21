import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';
import LoadingAnimation from './components/LoadingAnimation';
import NameList from './components/NameList';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/baby.png';

const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Baby Names',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 600,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const questions = [
  {
    id: 1,
    text: 'Are you expecting a boy or a girl?',
    options: ['Boy', 'Girl', "I don't know yet"],
  },
  {
    id: 2,
    text: "What's your preferred name origin?",
    options: ['African', 'Latin', 'Hebrew', 'Celtic', 'Nordic'],
  },
  {
    id: 3,
    text: 'Do you prefer traditional or modern names?',
    options: ['Traditional', 'Modern', 'A mix of both'],
  },
  {
    id: 4,
    text: 'How many syllables do you prefer?',
    options: ['One', 'Two', 'Three', 'No preference'],
  },
  {
    id: 5,
    text: 'What personality trait do you hope your child will have?',
    options: ['Creative', 'Intelligent', 'Kind', 'Brave', 'Curious'],
  },
  {
    id: 6,
    text: 'What element or aspect of nature inspires you?',
    options: ['Ocean', 'Mountains', 'Forest', 'Sky', 'Desert'],
  },
];

const BabyNameGenerator = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generating, setGenerating] = useState(false);
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = async (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGenerating(true);
      try {
        const response = await fetch('/api/generate-baby-names', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAnswers),
        });

        if (!response.ok) {
          throw new Error('Failed to generate names');
        }

        const data = await response.json();
        setNames(data.names);
      } catch (error) {
        setError('An error occurred while generating names. Please try again.');
        console.error('Error:', error);
      } finally {
        setGenerating(false);
      }
    }
  };

  const handleReset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setNames([]);
    setError(null);
  };

  return (
    <PageContainer title="Baby Name Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Baby Names Generator" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="150px" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h5" align="center">
            AI Baby Name Generator
          </StyledTypography>
          <AnimatePresence mode="wait">
            {!started && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleStart}
                >
                  Start Name Generator
                </Button>
              </motion.div>
            )}
            {started && !generating && names.length === 0 && !error && (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <StyledBox>
                  <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />
                  <ProgressBar current={currentQuestion + 1} total={questions.length} />
                </StyledBox>
              </motion.div>
            )}
            {generating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnimation />
              </motion.div>
            )}
            {names.length > 0 && (
              <motion.div
                key="names"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <StyledBox>
                  <NameList names={names} />
                  <Button variant="outlined" color="primary" fullWidth onClick={handleReset}>
                    Start Over
                  </Button>
                </StyledBox>
              </motion.div>
            )}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typography color="error" align="center">
                  {error}
                </Typography>
                <Button variant="outlined" color="primary" fullWidth onClick={handleReset}>
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default BabyNameGenerator;