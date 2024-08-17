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
    title: 'Enhancement',
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

const ImageQualityEnhancement = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setEnhancedImage(null);
      setError(null);
    }
  };

  const enhanceImage = async () => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', originalImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/enhance-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      if (!data.enhancedImage) {
        throw new Error('No enhanced image received');
      }
      setEnhancedImage(data.enhancedImage);
    } catch (err) {
      setError(`An error occurred while processing the image: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setError(null);
  };

  return (
    <PageContainer title="Image Quality Enhancement">
      <Breadcrumb title="Image Quality Enhancement" items={BCrumb}>
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
                Enhanced Image
              </Typography>
              <ImageContainer>
                {enhancedImage ? (
                  <img
                    src={`data:image/png;base64,${enhancedImage}`}
                    alt="Enhanced image"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">
                    {isProcessing ? 'Enhancing image...' : 'No enhanced image yet'}
                  </Typography>
                )}
              </ImageContainer>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                fullWidth
                onClick={handleReset}
                disabled={!originalImage && !enhancedImage}
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
                Enhance Image Quality
              </Typography>
              {!enhancedImage && !isProcessing && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={enhanceImage}
                  disabled={!originalImage}
                  fullWidth
                >
                  Enhance Image
                </Button>
              )}
              {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress />
                </Box>
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

export default ImageQualityEnhancement;
