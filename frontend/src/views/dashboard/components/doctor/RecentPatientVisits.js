import React from 'react';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const RecentPatientVisits = () => {
  return (
    <DashboardCard title="Recent Patient Visits">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
              paddingLeft: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sarah Johnson - Prenatal checkup</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Emily Davis - Ultrasound</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>11:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Lisa Brown - Postpartum follow-up</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>01:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Amanda Wilson - First trimester screening</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>02:30 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Rachel Green - Gynecological exam</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>04:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Emma Thompson - Fertility consultation</TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentPatientVisits;
