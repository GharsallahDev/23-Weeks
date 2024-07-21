import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons';

import DashboardCard from 'src/components/shared/DashboardCard';

const BabyDevelopment = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",

      toolbar: {
        show: false,
      },
      height: 275,
    },
    labels: ['Weight', 'Length', 'Head Circumference'],
    colors: [primary, primarylight, secondary],
    plotOptions: {
      pie: {
        donut: {
          size: '89%',
          background: 'transparent',

          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: textColor,
              fontSize: '20px',
              fontWeight: '600',
              label: 'Week 20',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [55, 55, 55];

  return (
    <DashboardCard title="Baby Development" subtitle="Current Week">
      <>
        <Box mt={3}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="275px"
          />
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-between" mt={7}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="primary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />{' '}
              </Typography>{' '}
            </Box>{' '}
            <Box>
              <Typography variant="h6" fontWeight="600">
                500 g{' '}
              </Typography>{' '}
              <Typography variant="subtitle2" color="textSecondary">
                Weight{' '}
              </Typography>{' '}
            </Box>{' '}
          </Stack>{' '}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="secondary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="secondary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />{' '}
              </Typography>{' '}
            </Box>{' '}
            <Box>
              <Typography variant="h6" fontWeight="600">
                25 cm{' '}
              </Typography>{' '}
              <Typography variant="subtitle2" color="textSecondary">
                Length{' '}
              </Typography>{' '}
            </Box>{' '}
          </Stack>{' '}
        </Stack>{' '}
      </>{' '}
    </DashboardCard>
  );
};

export default BabyDevelopment;
