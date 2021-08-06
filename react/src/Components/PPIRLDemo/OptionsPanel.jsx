import {
  Box, Divider, FormControlLabel, Paper, Switch, Typography, Slider,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import MaskSelect from './MaskSelect';

function OptionsPanel(props) {
  const {
    similarityRange, highlight, mask,
    onSimilarityRangeChange, onHighlightChange, onMaskChange,
  } = props;

  return (
    <Box p={5}>
      <Paper rounded="true" elevation={5}>
        <Box p={1}>
          <Typography variant="h5">Optionen</Typography>
        </Box>
        <Divider />
        <Box p={3} display="flex" justifyContent="flex-end">
          <Box width="200px" mx={5}>
            <Typography id="similarity-range-label" gutterBottom>
              Ähnlichkeit
            </Typography>
            <Slider
              step={0.01}
              min={0}
              max={1}
              marks={[{ value: 0, label: 'verschieden' }, { value: 1, label: 'gleich' }]}
              valueLabelDisplay="auto"
              value={similarityRange}
              aria-labelledby="similarity-range-label"
              onChange={(event, newValue) => onSimilarityRangeChange(newValue)}
            />
          </Box>

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
  similarityRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  highlight: PropTypes.bool.isRequired,
  mask: PropTypes.string.isRequired,
  onSimilarityRangeChange: PropTypes.func,
  onHighlightChange: PropTypes.func,
  onMaskChange: PropTypes.func,
};

OptionsPanel.defaultProps = {
  onSimilarityRangeChange: undefined,
  onHighlightChange: () => {},
  onMaskChange: () => {},
};

export default OptionsPanel;
