import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';

const display = {
  firstname: 'Vorname',
  surname: 'Nachname',
  postalcode: 'Postleitzahl',
  city: 'Wohnort',
  street: 'Straße',
  streetnumber: 'Hausnummer',
};

function DefaultForm(props) {
  const {
    data,
    onChange,
    onSubmit,
    displayCallback,
  } = props;

  const {
    firstname,
    surname,
    postalcode,
    city,
    street,
    streetnumber,
  } = data;

  useEffect(() => {
    displayCallback(display);
  }, []);

  const handleChange = (event) => onChange(event.target.name, event.target.value);

  return (
    <form onSubmit={onSubmit} style={{ height: '100%' }}>
      <Box height="100%" boxSizing="border-box" display="flex" flexDirection="column" justifyContent="flex-start" padding={3}>
        <TextField name="firstname" label={display.firstname || 'firstname'} value={firstname || ''} onChange={handleChange} fullWidth />
        <TextField name="surname" label={display.surname || 'surname'} value={surname || ''} onChange={handleChange} fullWidth />
        <TextField name="postalcode" label={display.postalcode || 'postalcode'} value={postalcode || ''} onChange={handleChange} fullWidth />
        <TextField name="city" label={display.city || 'city'} value={city || ''} onChange={handleChange} fullWidth />
        <TextField name="street" label={display.street || 'street'} value={street || ''} onChange={handleChange} fullWidth />
        <TextField name="streetnumber" label={display.streetnumber || 'streetnumber'} value={streetnumber || ''} onChange={handleChange} fullWidth />
        <Box justifySelf="flex-end" alignSelf="flex-end">
          <Button type="submit" variant="contained">Senden</Button>
        </Box>
      </Box>
    </form>
  );
}

DefaultForm.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  displayCallback: PropTypes.func,
};

DefaultForm.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  displayCallback: () => {},
};

export default DefaultForm;
