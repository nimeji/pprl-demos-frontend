import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { ArrowUpward, Delete } from '@material-ui/icons';


function RecordHistory({history, onRestoreIndex, onDeleteIndex}) {
  return (
    <Box height="100%" position="relative">
      <Box overflow="auto" position="absolute" top="0" bottom="0" left="0" right="0">
        <List dense>
          {
            history.map((entry, i) => (
              <ListItem key={i} button onClick={() => onRestoreIndex(i)}>
                <ListItemText>
                  {Array.from(entry, ([key, value]) => value).join(', ')}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => onDeleteIndex(i)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Box>
  );
}

RecordHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onRestoreIndex: PropTypes.func,
  onDeleteIndex: PropTypes.func,
};

RecordHistory.defaultProps = {
  onRestoreIndex: () => {},
  onDeleteIndex: () => {},
};

export default RecordHistory;