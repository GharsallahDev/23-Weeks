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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
  border: '2px dashed #ccc',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  backgroundColor: '#f9f9f9',
  position: 'relative', // Ensure the container allows child elements to be positioned correctly
});

const MaskImage = styled('img')({
  maxWidth: '100%', // Ensure the image scales with the container width
  maxHeight: '100%', // Ensure the image scales with the container height
  objectFit: 'contain', // Maintain aspect ratio of the image
  width: '100%', // Make the image container fill the available width
  height: 'auto', // Adjust height based on width to maintain aspect ratio
});

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ButtonGroup = styled(Box)({
  marginTop: 16,
});

const MeasurementCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HeadCircumferenceCalculator = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [circumference, setCircumference] = useState(null);
  const [pixelValue, setPixelValue] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Define the pixel size in millimeters
  const pixelSizeInMm = 1.2; // Example value: adjust based on your actual pixel size

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setCircumference(null);
      setPixelValue(null);
      setMaskImage(null);
      setError(null);
    }
  };

  const calculateCircumference = async () => {
    setIsProcessing(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('image', originalImage);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/calculate-circumference', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
  
      const data = await response.json();
  
      if (data.circumference !== undefined) {
        // Convert circumference from pixels to millimeters
        const circumferenceInMm = data.circumference * pixelSizeInMm;
        setCircumference(circumferenceInMm);
        setPixelValue(data.pixelValue);
        setMaskImage(`data:image/png;base64,${data.maskImage}`);
      } else {
        throw new Error('No circumference data received');
      }
    } catch (err) {
      setError(`An error occurred while processing the image: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCircumference(null);
    setPixelValue(null);
    setMaskImage(null);
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
                Mask Image
              </Typography>
              <ImageContainer>
                {maskImage ? (
                  <MaskImage
                    src={maskImage}
                    alt="Mask"
                  />
                ) : (
                  <Typography color="textSecondary">
                    {isProcessing ? 'Generating mask...' : 'No mask generated yet'}
                  </Typography>
                )}
              </ImageContainer>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12}>
          <MeasurementCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Head Circumference
              </Typography>
              <CenteredBox>
                {circumference !== null ? (
                  <Typography variant="h4">
                    Head Circumference: {circumference.toFixed(2)} mm
                  </Typography>
                ) : (
                  isProcessing ? (
                    <CircularProgress />
                  ) : (
                    <Typography color="textSecondary">
                      No circumference calculated yet
                    </Typography>
                  )
                )}
              </CenteredBox>
              <ButtonGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calculateCircumference}
                  disabled={!originalImage || isProcessing}
                  fullWidth
                >
                  {isProcessing ? <CircularProgress size={24} /> : 'Calculate Circumference'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<RestartAltIcon />}
                  onClick={handleReset}
                  disabled={!originalImage && circumference === null}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Reset
                </Button>
              </ButtonGroup>
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </MeasurementCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HeadCircumferenceCalculator;
