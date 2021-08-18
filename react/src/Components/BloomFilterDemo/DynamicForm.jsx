import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';

function DynamicForm({
  names,
  values,
  required,
  onChange,
  onConfirm,
}) {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleChange = (key, value) => {
    onChange(key, value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    setSubmitDisabled(true);
    await onConfirm();
    setSubmitDisabled(false);
  }

  const fields = Array.from(values, ([k, v]) => (
    <TextField
      key={k}
      name={k}
      label={names.get(k)}
      value={v}
      required={required && required.get(k)}
      onChange={(event) => handleChange(k, event.target.value)}
      fullWidth
    />
  ));

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" flexDirection="column" justifyContent="flex-start" padding={3}>
        {fields}
        <Box justifySelf="flex-end" alignSelf="flex-end" mt={2}>
          <Button variant="contained" type="submit">Senden</Button>
        </Box>
      </Box>
    </form>
  );
}

DynamicForm.propTypes = {
  values: PropTypes.instanceOf(Map).isRequired,
  names: PropTypes.instanceOf(Map).isRequired,
  required: PropTypes.instanceOf(Map),
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
};

DynamicForm.defaultProps = {
  required: undefined,
  onChange: () => {},
  onConfirm: () => {},
};

export default DynamicForm;
