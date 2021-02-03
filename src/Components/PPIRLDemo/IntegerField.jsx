import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

class IntegerField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.validate = this.validate.bind(this);
  }

  validate(event) {
    const { onChange } = this.props;
    const { error } = this.state;

    const parsedInt = parseInt(event.target.value, 10);

    if (parsedInt) {
      onChange(parsedInt);
      if (error) {
        this.setState({ error: false });
      }
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { defaultValue } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <TextField
          error
          label="Id"
          defaultValue={defaultValue}
          variant="outlined"
          onChange={this.validate}
        />
      );
    }
    return (
      <TextField
        label="Id"
        defaultValue={defaultValue}
        variant="outlined"
        onChange={this.validate}
      />
    );
  }
}

IntegerField.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

IntegerField.defaultProps = {
  defaultValue: undefined,
  onChange: undefined,
};

export default IntegerField;
