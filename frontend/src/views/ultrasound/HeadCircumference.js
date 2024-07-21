import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/ultrasound.png';

const BCrumb = [
  {
    to: '/',
    title: 'Ultrasound',
  },
  {
    title: 'Head Circumference',
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

const HeadCircumferenceCalculation = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [circumference, setCircumference] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setMaskImage(null);
      setCircumference(null);
      setError(null);
    }
  };

  const calculateCircumference = async () => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', originalImage);

    try {
      const response = await fetch('/api/calculate-circumference', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setCircumference(data.circumference);
      setMaskImage(data.maskImage);
    } catch (err) {
      setError('An error occurred while processing the image.');
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setMaskImage(null);
    setCircumference(null);
    setError(null);
  };

  return (
    <PageContainer title="Head Circumference Calculation">
      <Breadcrumb title="Head Circumference Calculation" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="155px" />
        </Box>
      </Breadcrumb>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Original Image
              </Typography>
              <ImageContainer>
                {originalImage ? (
                  <img
                    src={URL.createObjectURL(originalImage)}
                    alt="Original ultrasound"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">No image uploaded</Typography>
                )}
              </ImageContainer>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Generated Mask
              </Typography>
              <ImageContainer>
                {maskImage ? (
                  <img
                    src={`data:image/png;base64,${maskImage}`}
                    alt="Generated mask"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">
                    {isProcessing ? 'Generating mask...' : 'No mask generated yet'}
                  </Typography>
                )}
              </ImageContainer>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                fullWidth
                onClick={handleReset}
                disabled={!originalImage && !maskImage}
              >
                Reset
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Head Circumference Calculation
              </Typography>
              {!circumference && !isProcessing && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calculateCircumference}
                  disabled={!originalImage}
                  fullWidth
                >
                  Calculate Head Circumference
                </Button>
              )}
              {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              {circumference && (
                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    mt: 2,
                    color: 'success.main',
                  }}
                >
                  {circumference} mm
                </Typography>
              )}
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HeadCircumferenceCalculation;