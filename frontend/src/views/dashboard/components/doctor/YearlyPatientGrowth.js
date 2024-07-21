import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Stack, Typography, Box } from '@mui/material';

const YearlyPatientGrowth = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 360,
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
      max: 1000,
      tickAmount: 4,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      name: 'New Patients',
      data: [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390, 180],
    },
    {
      name: 'Returning Patients',
      data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250, 310],
    },
  ];

  return (
    <DashboardCard title="Yearly Patient Growth">
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="360px"
      />
      <Stack direction="row" spacing={2} justifyContent="end" mt={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box bgcolor={primary} width="12px" height="12px" borderRadius="50%" />
          <Typography variant="subtitle2" color="textSecondary">New Patients</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box bgcolor={secondary} width="12px" height="12px" borderRadius="50%" />
          <Typography variant="subtitle2" color="textSecondary">Returning Patients</Typography>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default YearlyPatientGrowth;