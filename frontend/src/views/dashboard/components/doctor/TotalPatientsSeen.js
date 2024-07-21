import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const TotalPatientsSeen = () => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 55,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    colors: [secondary],
    plotOptions: {
      bar: {
        columnWidth: '60%',
        barHeight: '20%',
        borderRadius: 3,
      },
    },
    stroke: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false,
      },
    },
  };
  const seriescolumnchart = [
    {
      name: 'Patients',
      data: [25, 35, 35, 35, 40, 40, 50],
    },
  ];

  return (
    <DashboardCard>
      <>
        <Typography variant="subtitle2" color="textSecondary">
          Total Patients Seen
        </Typography>
        <Typography variant="h4">2,845</Typography>
        <Box mt={5}>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="55px" />
        </Box>
      </>
    </DashboardCard>
  );
};

export default TotalPatientsSeen;
