import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Stack, Typography, Box } from '@mui/material';
import Icon from '@mui/material/Icon';

const MonthlyPatientCount = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 70,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: 'Patients',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard>
      <>
        <Stack direction="row" spacing={1} alignItems="center" mb={3}>
          <Typography variant="h3" fontWeight="700">
            620
          </Typography>
          <Stack direction="row" spacing={1} mt={1} mb={2} alignItems="center">
            <Icon color="primary" icon="solar:alt-arrow-up-bold-duotone" width="20" />
            <Typography variant="subtitle2" color="textSecondary">
              +9%
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary">
          Monthly Patient Count
        </Typography>
        <Box mt={3}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height="70px"
          />
        </Box>
      </>
    </DashboardCard>
  );
};

export default MonthlyPatientCount;
