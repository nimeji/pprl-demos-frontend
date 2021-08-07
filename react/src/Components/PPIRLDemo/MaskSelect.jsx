import Axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import urljoin from 'url-join';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class MaskSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { masks: [] };
  }

  async componentDidMount() {
    const { onChange } = this.props;

    const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, '/masks'));

    if (result && result.data && result.data.masks && result.data.masks.length > 0) {
      this.setState({ masks: result.data.masks });
      onChange(result.data.masks[0]);
    }
  }

  componentDidUpdate(prevProps) {
    const { mask, onChange } = this.props;
    const { masks } = this.state;

    if (mask !== prevProps.mask && mask === undefined && masks.length > 0 && onChange) {
      onChange(masks[0]);
    }
  }

  render() {
    const { masks } = this.state;
    const { mask, onChange } = this.props;

    const items = [];

    Object.keys(masks).forEach((key) => {
      items.push(<MenuItem value={masks[key]} key={key}>{masks[key]}</MenuItem>);
    });

    return (
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="mask-select-label">Maskierung</InputLabel>
        <Select labelId="mask-select-label" id="mask-select" value={mask} onChange={(event) => onChange(event.target.value)}>{items}</Select>
      </FormControl>
    );
  }
}

MaskSelect.propTypes = {
  onChange: PropTypes.func,
  mask: PropTypes.string,
};

MaskSelect.defaultProps = {
  onChange: () => {},
  mask: undefined,
};

export default MaskSelect;
