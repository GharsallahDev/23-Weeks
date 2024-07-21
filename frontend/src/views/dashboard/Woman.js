import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import PregnancyProgress from './components/woman/PregnancyProgress';
import BabyDevelopment from './components/woman/BabyDevelopment';
import FetalMovement from './components/woman/FetalMovement';
import PregnancySymptoms from './components/woman/PregnancySymptoms';
import RecentCheckUps from './components/woman/RecentCheckUps';

const PregnancyDashboard = () => {
  return (
    <PageContainer title="Pregnancy Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {' '}
          {/* Welcome Card */}{' '}
          <Grid item xs={12} lg={12}>
            <WelcomeCard />
          </Grid>
          {/* Pregnancy Progress */}{' '}
          <Grid item xs={12} lg={8} style={{ display: 'flex' }}>
            <PregnancyProgress style={{ flexGrow: 1 }} />{' '}
          </Grid>
          {/* Baby Development */}{' '}
          <Grid item xs={12} lg={4} style={{ display: 'flex' }}>
            <BabyDevelopment style={{ flexGrow: 1 }} />{' '}
          </Grid>
          {/* Pregnancy Symptoms */}{' '}
          <Grid item xs={12} lg={12} style={{ display: 'flex' }}>
            <PregnancySymptoms style={{ flexGrow: 1 }} />{' '}
          </Grid>
          {/* Recent Check-ups */}{' '}
          <Grid item xs={12} lg={6} style={{ display: 'flex' }}>
            <RecentCheckUps style={{ flexGrow: 1 }} />{' '}
          </Grid>
          {/* Fetal Movement */}{' '}
          <Grid item xs={12} lg={6} style={{ display: 'flex' }}>
            <FetalMovement style={{ flexGrow: 1 }} />{' '}
          </Grid>{' '}
        </Grid>{' '}
      </Box>{' '}
    </PageContainer>
  );
};

export default PregnancyDashboard;
