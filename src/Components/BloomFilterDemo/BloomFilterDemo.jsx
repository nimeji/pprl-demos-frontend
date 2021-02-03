import {
  Box,
} from '@material-ui/core';
import React from 'react';
import Axios from 'axios';
import DefaultForm from './DefaultForm';
import ResultTable from './ResultTable';
import CompareTable from './CompareTable';
import ContentContainer from './ContentContainer';
import BloomFilterTable from './BloomFilterTable';

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
      formData: {},
      formDisplay: {},
      A: undefined,
      B: undefined,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.setupDisplay = this.setupDisplay.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    const { formData } = this.state;
    console.log(formData);

    const result = await Axios.post(process.env.REACT_APP_BLOOMFILTER_API, formData);
    console.log(result);

    if (result && result.data && result.data.result) {
      // for testing only
      result.data.result = randomZeroOne(24);

      // never mutate state directly
      // use a callback to update variables that depend on previous state
      // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
      this.setState((prevState) => (
        {
          results: [
            ...prevState.results,
            {
              result: result.data.result,
              tooltipData: { ...prevState.formData },
              tooltipDisplayNames: prevState.formDisplay,
            },
          ],
        }
      ));
    }
  }

  onFormChange(key, value) {
    this.setState((prevState) => (
      {
        formData: {
          ...(prevState.formData),
          [key]: value,
        },
      }
    ));
  }

  setupDisplay(display) {
    // make sure keys in formData have the same order
    // as those given in the display object
    const formData = {};
    Object.keys(display).forEach((key) => { formData[key] = ''; });

    this.setState({ formData, formDisplay: display });
  }

  deleteResultIndex(index) {
    this.setState((prevState) => {
      const newResults = [...prevState.results];
      newResults.splice(index, 1);
      return { results: newResults };
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
          <DefaultForm
            data={formData}
            display={formDisplay}
            onSubmit={this.onSubmit}
            onChange={this.onFormChange}
            displayCallback={(display) => this.setupDisplay(display)}
          />
        </ContentContainer>

        <Box display="grid" height="100%" gridTemplateRows="auto auto minmax(0, 1fr)" gridGap="20px">
          <ContentContainer>
            <CompareTable
              headers={Object.values(formDisplay)}
              As={Object.keys(formDisplay).map((key) => (A ? A.tooltipData[key] : ''))}
              Bs={Object.keys(formDisplay).map((key) => (B ? B.tooltipData[key] : ''))}
            />
          </ContentContainer>

          <ContentContainer>
            <BloomFilterTable A={A ? A.result : undefined} B={B ? B.result : undefined} />
          </ContentContainer>

          <ContentContainer>
            <ResultTable
              data={results}
              onClickCopy={(data) => this.setState({ formData: { ...data.tooltipData } })}
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
