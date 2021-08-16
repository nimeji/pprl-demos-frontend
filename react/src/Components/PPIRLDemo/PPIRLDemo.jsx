import React from 'react';
import Axios from 'axios';
import { Box } from '@material-ui/core';
import urljoin from 'url-join';
import OptionsPanel from './OptionsPanel';
import Table from './Table';
import Matcher from './Matcher';

const defaultSettings = {
  similarityRange: [0.7, 0.9],
  highlight: true,
  mask: undefined,
};

export default class PPIRLDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: undefined,
      id: undefined,
      ...defaultSettings,
    };

    this.refresh = this.refresh.bind(this);
    this.onSimilarityRangeChange = this.onSimilarityRangeChange.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onHighlightChange = this.onHighlightChange.bind(this);
    this.onMaskChange = this.onMaskChange.bind(this);
    this.onOptionsReset = this.onOptionsReset.bind(this);
  }

  onOptionsReset() {
    this.setState({
      ...defaultSettings,
    });
  }

  onSimilarityRangeChange(range) {
    this.setState({ similarityRange: range });
  }

  onIdChange(id) {
    this.setState({ id }, this.refreshId);
  }

  onHighlightChange(highlight) {
    this.setState({ highlight });
  }

  onMaskChange(mask) {
    const { id } = this.state;

    this.setState({ mask }, () => {
      if (id) this.refreshId();
      else this.refresh();
    });
  }

  async refresh() {
    const { mask, similarityRange } = this.state;
    const [min, max] = similarityRange;

    try {
      const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, `/mask/${mask}?min=${min}&max=${max}`));

      if (result && result.data) {
        this.setState({ tableData: result.data });
        this.setState({ id: result.data.id });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async refreshId() {
    const { id, mask } = this.state;

    if (!id) return;

    try {
      const result = await Axios.get(urljoin(process.env.REACT_APP_PPIRL_API, `/id/${id}/mask/${mask}`));
      if (result && result.data) this.setState({ tableData: result.data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const {
      similarityRange, id, highlight, mask, tableData,
    } = this.state;

    return (
      <Box height="100%" style={{ backgroundColor: 'rgb(220, 220, 220)' }}>
        <Box display="flex" flexDirection="column" justifyContent="spaceBetween" alignItems="center" height="100%" marginX="auto">
          <OptionsPanel
            similarityRange={similarityRange}
            id={id}
            onIdChange={this.onIdChange}
            highlight={highlight}
            onSimilarityRangeChange={this.onSimilarityRangeChange}
            onHighlightChange={this.onHighlightChange}
            mask={mask}
            onMaskChange={this.onMaskChange}
            onReset={this.onOptionsReset}
          />
          {tableData !== undefined && <Table data={tableData} highlight={highlight} />}
          {id !== undefined && <Matcher id={id} onNext={this.refresh} />}
        </Box>
      </Box>
    );
  }
}
