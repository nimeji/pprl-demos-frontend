import React, { Component } from 'react';
import Axios from 'axios';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';

class FormSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      forms: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchForms();
  }

  componentDidUpdate(prevProps, prevState) {
    const { forms } = this.state;
    const { onChange } = this.props;

    if (forms !== prevState.forms) {
      const formNames = Object.keys(forms);
      if (formNames.length > 0) {
        this.setState({ value: formNames[0] });
        onChange(forms[formNames[0]]);
      }
    }
  }

  handleChange(event) {
    const { forms } = this.state;
    const { onChange } = this.props;

    this.setState({ value: event.target.value });

    onChange(forms[event.target.value]);
  }

  async fetchForms() {
    let result;

    try {
      result = await Axios.get(process.env.REACT_APP_BLOOMFILTER_FORMS);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (result) {
      const availableForms = {};
      result.data.forEach((v) => {
        const form = {};
        form.display = new Map();
        form.defaultData = new Map();
        form.required = new Map();

        v.attributes.forEach((attribute) => {
          const { name, displayName, required } = attribute;
          form.display.set(name, displayName);
          form.defaultData.set(name, '');
          form.required.set(name, required);
        });

        availableForms[v.method] = form;
      });
      this.setState({ forms: availableForms });
    }
  }

  render() {
    const { forms, value } = this.state;
    const menuItems = Object.keys(forms).map((formName) => (
      <MenuItem key={formName} value={formName}>{formName}</MenuItem>
    ));

    return (
      <FormControl variant="filled" fullWidth>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={this.handleChange}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}

FormSelect.propTypes = {
  onChange: PropTypes.func,
};

FormSelect.defaultProps = {
  onChange: () => {},
};

export default FormSelect;
