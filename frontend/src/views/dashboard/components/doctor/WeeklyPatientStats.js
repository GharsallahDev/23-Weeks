import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Icon from '@mui/material/Icon';

const WeeklyPatientStats = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 130,
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
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
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
      color: primary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  const stats = [
    {
      title: 'New Patients',
      subtitle: 'This Week',
      percent: '68',
      color: primary,
      lightcolor: primarylight,
      icon: <Icon>person_add</Icon>,
    },
    {
      title: 'Follow-ups',
      subtitle: 'This Week',
      percent: '45',
      color: theme.palette.success.main,
      lightcolor: theme.palette.success.light,
      icon: <Icon>refresh</Icon>,
    },
    {
      title: 'Procedures',
      subtitle: 'This Week',
      percent: '14',
      color: theme.palette.error.main,
      lightcolor: theme.palette.error.light,
      icon: <Icon>medical_services</Icon>,
    },
  ];

  return (
    <DashboardCard title="Weekly Patient Stats" subtitle="Average patients">
      <>
        <Stack mt={4}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height="130px"
          />
        </Stack>
        <Stack spacing={3} mt={3}>
          {stats.map((stat, i) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: stat.lightcolor,
                  color: stat.color,
                  width: 42,
                  height: 24,
                  borderRadius: '4px',
                }}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  +{stat.percent}
                </Typography>
              </Avatar>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default WeeklyPatientStats;