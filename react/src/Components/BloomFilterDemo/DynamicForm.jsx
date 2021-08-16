import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';

function DynamicForm({
  names,
  values,
  onChange,
  onConfirm,
}) {
  const handleChange = (key, value) => {
    onChange(key, value);
  };

  const fields = Array.from(values, ([k, v]) => (
    <TextField
      key={k}
      name={k}
      label={names.get(k)}
      value={v}
      onChange={(event) => handleChange(k, event.target.value)}
      fullWidth
    />
  ));

  return (
    <form>
      <Box display="flex" flexDirection="column" justifyContent="flex-start" padding={3}>
        {fields}
        <Box justifySelf="flex-end" alignSelf="flex-end">
          <Button variant="contained" onClick={onConfirm}>Senden</Button>
        </Box>
      </Box>
    </form>
  );
}

DynamicForm.propTypes = {
  values: PropTypes.instanceOf(Map).isRequired,
  names: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
};

DynamicForm.defaultProps = {
  onChange: () => {},
  onConfirm: () => {},
};

export default DynamicForm;
