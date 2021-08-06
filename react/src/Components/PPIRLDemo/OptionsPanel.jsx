import {
  Box, Divider, FormControlLabel, Paper, Switch, Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import MaskSelect from './MaskSelect';
import IntegerField from './IntegerField';

function OptionsPanel(props) {
  const {
    id, highlight, mask,
    onIdChange, onHighlightChange, onMaskChange,
  } = props;

  return (
    <Box p={5}>
      <Paper rounded="true" elevation={5}>
        <Box p={1}>
          <Typography variant="h5">Optionen</Typography>
        </Box>
        <Divider />
        <Box p={3} display="flex" justifyContent="flex-end">
          <IntegerField defaultValue={id} onChange={onIdChange} />
          <FormControlLabel
            value="top"
            control={<Switch color="primary" onChange={(event) => onHighlightChange(event.target.checked)} checked={highlight} />}
            label="Highlighting"
            labelPlacement="top"
          />
          <MaskSelect mask={mask} onChange={onMaskChange} />
        </Box>
      </Paper>
    </Box>
  );
}

OptionsPanel.propTypes = {
  id: PropTypes.number.isRequired,
  highlight: PropTypes.bool.isRequired,
  mask: PropTypes.string.isRequired,
  onIdChange: PropTypes.func,
  onHighlightChange: PropTypes.func,
  onMaskChange: PropTypes.func,
};

OptionsPanel.defaultProps = {
  onIdChange: () => {},
  onHighlightChange: () => {},
  onMaskChange: () => {},
};

export default OptionsPanel;
