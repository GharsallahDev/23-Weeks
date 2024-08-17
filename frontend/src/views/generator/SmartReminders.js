import React, { useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Alert,
  AlertTitle
} from '@mui/material';
import { IconTrash, IconEdit, IconMicrophone } from '@tabler/icons';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ParentCard from '../../components/shared/ParentCard';

const columns = [
  { id: 'event', label: 'Event', minWidth: 150 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'time', label: 'Time', minWidth: 100 },
  { id: 'day', label: 'Day', minWidth: 100 },
  { id: 'occurrence', label: 'Occurrence', minWidth: 150 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Pregnancy Reminders' },
];

const PregnancyRemindersTable = () => {
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [alert, setAlert] = useState('');

  const handleRecord = () => {
    if (recording) {
      setRecording(false);
      return;
    }
    setRecording(true);
    startRecording();
  };

  const startRecording = () => {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          audioChunks = [];
          sendAudioToServer(audioBlob);
        };

        // Stop recording after 5 seconds
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        setResult(`Error: ${error.message}`);
        setRecording(false); // Stop recording if there's an error
      });
  };

  const sendAudioToServer = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_data', audioBlob);

    fetch('http://127.0.0.1:5000/api/speech-to-text', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Network response was not ok: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data && data.extracted_data && data.extracted_data.events) {
        setData(prevData => [...prevData, ...data.extracted_data.events]); // Append new reminders
        setResult('');
        setAlert('Reminder set with success!'); // Set success alert
      } else {
        setResult('Error: No events data returned from the server.');
        console.log('Response Data:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setResult(`Error: ${error.message}`);
    });
    

  const formatTime = (time) => {
    if (!time) return '';
    
    let [hour, minute] = time.split(':');
    let ampm = 'AM';
    
    if (parseInt(hour, 10) >= 12) {
      ampm = 'PM';
      if (parseInt(hour, 10) > 12) {
        hour -= 12;
      }
    } else if (hour === '0') {
      hour = 12; // Midnight case
    }
    
    return `${hour}`;
  };

  const getDayOfWeek = (dateString) => {
    if (!dateString) return '';
    
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <PageContainer title="Pregnancy Reminders" description="Manage your pregnancy reminders">
      <Breadcrumb title="Pregnancy Reminders" items={BCrumb} />
      <ParentCard title="Pregnancy Reminders">
        <Paper variant="outlined">
          <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography variant="h6" fontWeight="500">
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography variant="h6">{row.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.time ? formatTime(row.time) : ''}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.date ? getDayOfWeek(row.date) : ''}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.recurrence}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} direction="row" alignItems="center">
                        <IconButton>
                          <IconEdit width={18} />
                        </IconButton>
                        <IconButton>
                          <IconTrash width={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <IconButton onClick={handleRecord} color={recording ? 'error' : 'primary'}>
              <IconMicrophone width={24} />
            </IconButton>
            <Typography variant="h6" mt={2}>
              {recording ? 'Recording...' : 'Record Voice'}
            </Typography>
            <Box mt={2}>
              {alert && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {alert}
                </Alert>
              )}
              <Typography variant="h6">{result}</Typography>
            </Box>
          </Box>
        </Paper>
      </ParentCard>
    </PageContainer>
  );
};

export default PregnancyRemindersTable;
