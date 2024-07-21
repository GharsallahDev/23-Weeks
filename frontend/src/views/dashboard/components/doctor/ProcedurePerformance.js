import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from '@mui/material';

const ProcedurePerformance = () => {
  const [month, setMonth] = React.useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionschart = {
    chart: {
      type: 'bar',
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
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return val + ' procedures';
        },
      },
    },
  };

  const procedures = [
    {
      name: 'Ultrasound',
      success: '78.5%',
      status: 'Excellent',
      total: 3190,
      growth: [30, 25, 35, 20, 30],
    },
    {
      name: 'C-Section',
      success: '58.6%',
      status: 'Good',
      total: 2190,
      growth: [20, 25, 15, 30, 20],
    },
    {
      name: 'Natural Birth',
      success: '90%',
      status: 'Excellent',
      total: 5190,
      growth: [35, 35, 35, 35, 35],
    },
    {
      name: 'Gynecological Exam',
      success: '82.3%',
      status: 'Very Good',
      total: 4190,
      growth: [30, 30, 30, 30, 30],
    },
  ];

  return (
    <DashboardCard
      title="Procedure Performance"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
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
                  Procedure
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Success Rate
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Total
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
            {procedures.map((procedure, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {procedure.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {procedure.success}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette[procedure.status === 'Excellent' ? 'success' : procedure.status === 'Good' ? 'primary' : 'secondary'].light,
                      color: (theme) =>
                        theme.palette[procedure.status === 'Excellent' ? 'success' : procedure.status === 'Good' ? 'primary' : 'secondary'].main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={procedure.status}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{procedure.total}</Typography>
                </TableCell>
                <TableCell>
                  <Chart options={optionschart} series={[{ data: procedure.growth }]} type="bar" height="35px" width="100px" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ProcedurePerformance;