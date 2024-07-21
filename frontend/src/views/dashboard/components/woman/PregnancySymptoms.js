import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Stack,
} from '@mui/material';

const PregnancySymptoms = () => {
  const [week, setWeek] = React.useState('18');

  const handleChange = (event) => {
    setWeek(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionschart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 35,
      width: 100,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [theme.palette.primary.light],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };

  const symptoms = [
    { name: 'Morning Sickness', severity: '25%', status: 'Low', trend: [30, 25, 35, 20, 30] },
    { name: 'Fatigue', severity: '60%', status: 'Medium', trend: [40, 35, 45, 30, 40] },
    { name: 'Back Pain', severity: '40%', status: 'Low', trend: [20, 15, 25, 10, 20] },
    { name: 'Swelling', severity: '30%', status: 'Low', trend: [10, 15, 20, 25, 30] },
  ];

  return (
    <DashboardCard
      title="Pregnancy Symptoms"
      action={
        <CustomSelect
          labelId="week-dd"
          id="week-dd"
          size="small"
          value={week}
          onChange={handleChange}
        >
          <MenuItem value={18}>Week 18</MenuItem>
          <MenuItem value={19}>Week 19</MenuItem>
          <MenuItem value={20}>Week 20</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Symptom
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Severity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trend
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {symptoms.map((symptom, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {symptom.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {symptom.severity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette[
                          symptom.status === 'Low'
                            ? 'success'
                            : symptom.status === 'Medium'
                            ? 'warning'
                            : 'error'
                        ].light,
                      color: (theme) =>
                        theme.palette[
                          symptom.status === 'Low'
                            ? 'success'
                            : symptom.status === 'Medium'
                            ? 'warning'
                            : 'error'
                        ].main,
                      borderRadius: '6px',
                      p: '3px 8px',
                      display: 'inline-block',
                    }}
                  >
                    {symptom.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chart
                    options={optionschart}
                    series={[{ data: symptom.trend }]}
                    type="area"
                    height="35px"
                    width="100px"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default PregnancySymptoms;