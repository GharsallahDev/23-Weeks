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
import { Typography } from '@mui/material';

const RecentCheckUps = () => {
  return (
    <DashboardCard title="Recent Check-ups">
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
              flex: 0.5,
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
            <TimelineContent>Blood pressure check - 120/80</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Ultrasound scan completed</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Glucose test scheduled</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>02:30 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Prenatal vitamin prescription renewed</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>04:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Next appointment scheduled</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>05:30 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Nutrition consultation completed</TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentCheckUps;
