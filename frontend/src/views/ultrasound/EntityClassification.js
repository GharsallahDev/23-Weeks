import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/ultrasound.png';

const BCrumb = [
  {
    to: '/',
    title: 'Ultrasound',
  },
  {
    title: 'Classification',
  },
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FixedHeightCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const FixedHeightCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const ImageContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
  border: '2px dashed #ccc',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
});

const UltrasoundClassification = () => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setResults(null);
      setError(null);
    }
  };

  const processImage = async () => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/classify-ultrasound', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('An error occurred while processing the image.');
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
    setError(null);
  };

  const renderClassificationResults = (classification, title) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Main Class
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">
          {classification.mainClass}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" fontWeight="medium" sx={{ mr: 1 }}>
          Accuracy:
        </Typography>
        <Typography variant="body1">{`${(classification.accuracy * 100).toFixed(2)}%`}</Typography>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <LinearProgress
            variant="determinate"
            value={classification.accuracy * 100}
            color={
              classification.accuracy > 0.7
                ? 'success'
                : classification.accuracy > 0.5
                ? 'warning'
                : 'error'
            }
          />
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        All Classes:
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {classification.allClasses.map((cls) => (
          <ListItem key={cls.name} disablePadding>
            <ListItemIcon>
              {cls.name === classification.mainClass ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight={cls.name === classification.mainClass ? 'bold' : 'regular'}
                >
                  {cls.name}
                </Typography>
              }
              secondary={`Probability: ${(cls.probability * 100).toFixed(2)}%`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <PageContainer title="Ultrasound Classification">
      <Breadcrumb title="Ultrasound Classification" items={BCrumb}>
        <Box sx={{ marginTop: '-33px' }}>
          <img src={breadcrumbImg} alt="Ultrasound" height="190px" width="auto" />
        </Box>
      </Breadcrumb>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Upload Ultrasound Image
              </Typography>
              <ImageContainer>
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded ultrasound"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">No image uploaded</Typography>
                )}
              </ImageContainer>
            </FixedHeightCardContent>
            <CardActions>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
              </Button>
            </CardActions>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Classification Results
              </Typography>
              {!results && !isProcessing && !error && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={processImage}
                    disabled={!image}
                  >
                    Classify Image
                  </Button>
                </Box>
              )}
              {isProcessing && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <LinearProgress />
                  <Typography align="center" sx={{ mt: 1 }}>
                    Processing...
                  </Typography>
                </Box>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              {results && (
                <>
                  {renderClassificationResults(results.mainClassification, 'Main Classification')}
                  {results.brainClassification &&
                    renderClassificationResults(
                      results.brainClassification,
                      'Brain Classification',
                    )}
                </>
              )}
            </FixedHeightCardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                fullWidth
                onClick={handleReset}
                disabled={!image && !results}
              >
                Reset
              </Button>
            </CardActions>
          </FixedHeightCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UltrasoundClassification;