import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// Import components
import TopCards from './components/doctor/TopCards';
import PatientStatistics from 'src/views/dashboard/components/doctor/PatientStatistics';
import UltrasoundQualityOverview from 'src/views/dashboard/components/doctor/UltrasoundQualityOverview';
import WeeklyPatientStats from 'src/views/dashboard/components/doctor/WeeklyPatientStats';
import ProcedurePerformance from 'src/views/dashboard/components/doctor/ProcedurePerformance';
import RecentPatientVisits from 'src/views/dashboard/components/doctor/RecentPatientVisits';
import YearlyPatientGrowth from 'src/views/dashboard/components/doctor/YearlyPatientGrowth';

const DoctorDashboard = () => {
  return (
    <PageContainer title="Doctor Dashboard">
      <Box mt={3}>
        <TopCards />
        <Grid container spacing={3} mt={1}>
          {/* Patient Statistics */}
          <Grid item xs={12} lg={8} style={{ display: 'flex' }}>
            <PatientStatistics style={{ flexGrow: 1 }} />
          </Grid>

          {/* Ultrasound Quality Overview */}
          <Grid item xs={12} lg={4} style={{ display: 'flex' }}>
            <UltrasoundQualityOverview style={{ flexGrow: 1 }} />
          </Grid>

          {/* Weekly Patient Stats */}
          <Grid item xs={12} lg={4} style={{ display: 'flex' }}>
            <WeeklyPatientStats style={{ flexGrow: 1 }} />
          </Grid>

          {/* Procedure Performance */}
          <Grid item xs={12} lg={8} style={{ display: 'flex' }}>
            <ProcedurePerformance style={{ flexGrow: 1 }} />
          </Grid>

          {/* Recent Patient Visits */}
          <Grid item xs={12} lg={6} style={{ display: 'flex' }}>
            <RecentPatientVisits style={{ flexGrow: 1 }} />
          </Grid>

          {/* Yearly Patient Growth */}
          <Grid item xs={12} lg={6} style={{ display: 'flex' }}>
            <YearlyPatientGrowth style={{ flexGrow: 1 }} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default DoctorDashboard;
