import Axios from 'axios';
import urljoin from 'url-join';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Paper,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

class Matcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showResult: false,
      wasMatch: undefined,
      result: undefined,
    };
  }

  async checkResult(ismatch) {
    const { id } = this.props;
    const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, `/ismatch/${id}`));

    if (result && result.data) {
      this.setState({
        wasMatch: result.data.ismatch,
        result: result.data.ismatch === ismatch,
        showResult: true,
      });
    }
  }

  render() {
    const { onNext } = this.props;
    const { showResult, wasMatch, result } = this.state;
    let elements;

    if (!showResult) {
      elements = (
        <div>
          <Button variant="contained" color="primary" onClick={() => this.checkResult(true)}>Selbe Person</Button>
          <Box px={2} display="inline-block" />
          <Button variant="contained" color="secondary" onClick={() => this.checkResult(false)}>Verschiedene Personen</Button>
        </div>
      );
    } else {
      const text = `${result ? 'Korrekt' : 'Falsch'}, es handelt sich um ${wasMatch ? 'die selbe Person' : 'verschiedene Personen'}.`;

      elements = (
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            {result ? <Check /> : <Clear />}
            {text}
          </Box>
          <Button variant="contained" onClick={onNext}>Nächster Versuch</Button>

        </Box>
      );
    }

    return (
      <Box p={5}>
        <Paper>
          <Box p={1}>
            <Typography variant="h5">Handelt es sich um die selbe Person?</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" p={5}>
            {elements}
          </Box>
        </Paper>
      </Box>
    );
  }
}

Matcher.propTypes = {
  id: PropTypes.number.isRequired,
  onNext: PropTypes.func,
};

Matcher.defaultProps = {
  onNext: undefined,
};

export default Matcher;
