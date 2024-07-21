import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { IconCalendarEvent } from '@tabler/icons';
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

const PregnancyProgress = () => {
  const [trimester, setTrimester] = React.useState('2');

  const handleChange = (event) => {
    setTrimester(event.target.value);
  };

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
      max: 40,
      tickAmount: 4,
    },
    xaxis: {
      categories: ['Week 13', 'Week 14', 'Week 15', 'Week 16', 'Week 17', 'Week 18'],
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
      name: 'Baby Growth (cm)',
      data: [7.4, 8.7, 10.1, 11.6, 13, 14.2],
    },
    {
      name: 'Weight Gain (lbs)',
      data: [2, 3, 4, 5, 6, 7],
    },
  ];

  return (
    <DashboardCard
      title="Pregnancy Progress"
      subtitle="Overview of Trimesters"
      action={
        <CustomSelect
          labelId="trimester-dd"
          id="trimester-dd"
          value={trimester}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>First Trimester</MenuItem>
          <MenuItem value={2}>Second Trimester</MenuItem>
          <MenuItem value={3}>Third Trimester</MenuItem>
        </CustomSelect>
      }
    >
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
              <Box
                width={40}
                height={40}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="primary" variant="h6" display="flex">
                  <IconCalendarEvent width={21} />
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" fontWeight="700">
                  Week 18
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Current Week
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Baby Size
                </Typography>
                <Typography variant="h5">14.2 cm</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Weight Gain
                </Typography>
                <Typography variant="h5">7 lbs</Typography>
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth>
            View Detailed Report
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default PregnancyProgress;
