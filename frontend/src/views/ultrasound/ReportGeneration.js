import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  CircularProgress,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [{ to: '/', title: 'Ultrasound' }, { title: 'AI Report Generator' }];

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

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
  border: `3px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '400px',
  objectFit: 'contain',
  marginBottom: '20px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.divider}`,
}));

const ReportContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  height: 'calc(100vh - 300px)',
  overflowY: 'auto',
  position: 'relative',
  '& h1, & h2, & h3': {
    color: theme.palette.primary.main,
  },
}));

const ReportHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
}));

const FloatingActionButton = styled(Button)(({ theme }) => ({
  position: 'sticky',
  bottom: theme.spacing(2),
  float: 'right',
  marginTop: theme.spacing(2),
}));

const UltrasoundReportGenerator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [report, setReport] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setReport('');
      setPdfLink('');
      setError(null);
      setActiveStep(1);
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setReport(data.report);
      setPdfLink(data.pdfLink);
      setActiveStep(2);
    } catch (err) {
      setError('An error occurred while generating the report.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setReport('');
    setPdfLink('');
    setError(null);
    setActiveStep(0);
  };

  const handleDownload = () => {
    if (pdfLink) {
      window.open(pdfLink, '_blank');
    }
  };

  const steps = ['Upload Image', 'Generate Report', 'View Results'];

  return (
    <PageContainer title="AI Ultrasound Report Generator">
      <Breadcrumb title="AI Ultrasound Report Generator" items={BCrumb} />

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Fade in={true}>
          <ImageContainer>
            <Typography variant="h6" gutterBottom>
              Upload Ultrasound Image
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              size="large"
            >
              Select Image
              <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
            </Button>
          </ImageContainer>
        </Fade>
      )}

      {activeStep === 1 && (
        <Fade in={true}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ImagePreview
              component="img"
              src={URL.createObjectURL(image)}
              alt="Uploaded ultrasound"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={generateReport}
              disabled={isGenerating}
              size="large"
            >
              {isGenerating ? <CircularProgress size={24} /> : 'Generate Report'}
            </Button>
          </Box>
        </Fade>
      )}

      {activeStep === 2 && report && (
        <Fade in={true}>
          <ReportContainer elevation={3}>
            <ReportHeader>
              <Typography variant="body2" color="textSecondary">
                Generated on: {new Date().toLocaleString()}
              </Typography>
            </ReportHeader>
            <div dangerouslySetInnerHTML={{ __html: report }} />
            {pdfLink && (
              <FloatingActionButton
                variant="contained"
                color="primary"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
              >
                Download PDF
              </FloatingActionButton>
            )}
          </ReportContainer>
        </Fade>
      )}

      {error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Box>
      )}

      {activeStep > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            onClick={handleReset}
            color="primary"
            startIcon={<RefreshIcon />}
            variant="outlined"
          >
            Start Over
          </Button>
        </Box>
      )}
    </PageContainer>
  );
};

export default UltrasoundReportGenerator;