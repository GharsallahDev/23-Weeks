import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const NameList = ({ names }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Suggested Names:
      </Typography>
      <List>
        {names.map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem>
              <ListItemText primary={name} />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Paper>
  );
};

export default NameList;
