import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Button } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const PatientStatistics = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 4,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: 'Appointments',
      data: [20, 25, 30, 35, 40, 15, 10],
    },
    {
      name: 'Procedures',
      data: [10, 15, 20, 25, 18, 8, 5],
    },
  ];

  return (
    <DashboardCard title="Patient Statistics" subtitle="Weekly Overview">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="370px"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" fontWeight="700">
                175
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Total Patients This Week
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1" color="textSecondary">
                Appointments
              </Typography>
              <Typography variant="h5">135</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1" color="textSecondary">
                Procedures
              </Typography>
              <Typography variant="h5">40</Typography>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth>
            View Full Report
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default PatientStatistics;
