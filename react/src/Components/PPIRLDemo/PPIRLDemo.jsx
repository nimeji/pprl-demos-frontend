import React from 'react';
import Axios from 'axios';
import { Box, Container } from '@material-ui/core';
import urljoin from 'url-join';
import OptionsPanel from './OptionsPanel';
import Table from './Table';

export default class PPIRLDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: undefined,
      id: 8800,
      highlight: true,
      mask: '',
    };

    this.onIdChange = this.onIdChange.bind(this);
    this.onHighlightChange = this.onHighlightChange.bind(this);
    this.onMaskChange = this.onMaskChange.bind(this);
  }

  onIdChange(id) {
    this.setState({ id }, this.refreshId);
  }

  onHighlightChange(highlight) {
    this.setState({ highlight });
  }

  onMaskChange(mask) {
    this.setState({ mask }, this.refreshId);
  }

  async refresh() {
    const { mask } = this.state;

    const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, `/id/8800/mask/${mask}`));

    if (result && result.data) this.setState({ tableData: result.data });
  }

  async refreshId() {
    const { id, mask } = this.state;

    const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, `/id/${id}/mask/${mask}`));

    if (result && result.data) this.setState({ tableData: result.data });
  }

  render() {
    const {
      id, highlight, mask, tableData,
    } = this.state;

    return (
      <Container maxWidth="md">
        <Box p={5}>
          <OptionsPanel
            id={id}
            onIdChange={this.onIdChange}
            highlight={highlight}
            onHighlightChange={this.onHighlightChange}
            mask={mask}
            onMaskChange={this.onMaskChange}
          />
        </Box>
        <Table data={tableData} highlight={highlight} />
      </Container>
    );
  }
}
