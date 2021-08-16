import {
  Box,
} from '@material-ui/core';
import React from 'react';
import Axios from 'axios';
import DynamicForm from './DynamicForm';
import ResultTable from './ResultTable';
import CompareTable from './CompareTable';
import ContentContainer from './ContentContainer';
import BloomFilterTable from './BloomFilterTable';
import FormSelect from './FormSelect';

function randomZeroOne(length) {
  let result = '';
  const characters = '01';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class BloomFilterDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      formData: new Map(),
      formDisplay: new Map(),
      // eslint-disable-next-line react/no-unused-state
      formRequired: new Map(),
      A: undefined,
      B: undefined,
    };

    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormTypeChange = this.onFormTypeChange.bind(this);
  }

  async onFormConfirm() {
    const { formData } = this.state;

    const result = await Axios.post(
      process.env.REACT_APP_BLOOMFILTER_API,
      Object.fromEntries(formData),
    );

    if (result && result.data && result.data.result) {
      // for testing only
      result.data.result = randomZeroOne(24);

      this.setState((prevState) => (
        {
          results: [
            ...prevState.results,
            {
              result: result.data.result,
              tooltipData: new Map(prevState.formData),
              tooltipDisplayNames: prevState.formDisplay,
            },
          ],
        }
      ));
    }
  }

  onFormChange(key, value) {
    this.setState((prevState) => (
      { formData: new Map(prevState.formData).set(key, value) }
    ));
  }

  onFormTypeChange(form) {
    this.setState({
      formData: new Map(form.defaultData),
      formDisplay: new Map(form.display),
      // eslint-disable-next-line react/no-unused-state
      formRequried: new Map(form.requried),
      results: [],
      A: undefined,
      B: undefined,
    });
  }

  deleteResultIndex(index) {
    this.setState((prevState) => {
      const { results, A, B } = prevState;

      const newResults = [...prevState.results];
      newResults.splice(index, 1);
      return {
        results: newResults,
        A: A === results[index] ? undefined : A,
        B: B === results[index] ? undefined : B,
      };
    });
  }

  render() {
    const {
      formData,
      formDisplay,
      results,
      A,
      B,
    } = this.state;

    return (
      <Box
        height="100%"
        boxSizing="border-box"
        padding={2}
        display="grid"
        gridTemplateColumns="400px minmax(0, 1fr)"
        gridGap="20px"
        style={{ backgroundColor: 'rgb(220, 220, 220)' }}
      >
        <ContentContainer>
          <FormSelect onChange={this.onFormTypeChange} />
          <DynamicForm
            names={formDisplay}
            values={formData}
            onChange={this.onFormChange}
            onConfirm={this.onFormConfirm}
          />
        </ContentContainer>

        <Box display="grid" height="100%" gridTemplateRows="auto auto minmax(0, 1fr)" gridGap="20px">
          <ContentContainer>
            <CompareTable
              headers={Array.from(formDisplay.values())}
              As={A ? Array.from(A.tooltipData.values()) : Array(formDisplay.size).fill('')}
              Bs={B ? Array.from(B.tooltipData.values()) : Array(formDisplay.size).fill('')}
            />
          </ContentContainer>

          <ContentContainer>
            <BloomFilterTable A={A ? A.result : undefined} B={B ? B.result : undefined} />
          </ContentContainer>

          <ContentContainer>
            <ResultTable
              data={results}
              onClickCopy={(data) => this.setState({ formData: new Map(data.tooltipData) })}
              onClickDelete={(index) => this.deleteResultIndex(index)}
              onAChange={(newA) => this.setState({ A: newA })}
              onBChange={(newB) => this.setState({ B: newB })}
            />
          </ContentContainer>
        </Box>
      </Box>
    );
  }
}

export default BloomFilterDemo;
