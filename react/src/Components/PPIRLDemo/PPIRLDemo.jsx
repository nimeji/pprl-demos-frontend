import React from 'react';
import Axios from 'axios';
import { Box } from '@material-ui/core';
import urljoin from 'url-join';
import OptionsPanel from './OptionsPanel';
import Table from './Table';
import Matcher from './Matcher';

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
      <Box height="100%" style={{ backgroundColor: 'rgb(220, 220, 220)' }}>
        <Box display="flex" flexDirection="column" justifyContent="spaceBetween" alignItems="center" height="100%" marginX="auto">
          <OptionsPanel
            id={id}
            onIdChange={this.onIdChange}
            highlight={highlight}
            onHighlightChange={this.onHighlightChange}
            mask={mask}
            onMaskChange={this.onMaskChange}
          />
          <Table data={tableData} highlight={highlight} />
          <Matcher id={id} />
        </Box>
      </Box>
    );
  }
}
