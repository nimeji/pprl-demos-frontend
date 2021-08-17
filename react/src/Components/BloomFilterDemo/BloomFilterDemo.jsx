import {
  Box,
} from '@material-ui/core';
import React from 'react';
import Axios from 'axios';
import DynamicForm from './DynamicForm';
import RecordTable from './RecordTable';
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
      records: [],
      formData: new Map(),
      formDisplay: new Map(),
      formRequired: new Map(),
      A: undefined,
      B: undefined,
    };

    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormContentChange = this.onFormContentChange.bind(this);
    this.onFormTypeChange = this.onFormTypeChange.bind(this);
  }

  async onFormConfirm() {
    const { formData } = this.state;

    const result = await Axios.post(
      process.env.REACT_APP_BLOOMFILTER_API,
      Object.fromEntries(formData),
    );

    if (result && result.data) {
      // for testing only
      result.data.result = randomZeroOne(24);

      // eslint-disable-next-line no-unused-vars
      const { type, value } = result.data.attributes.RBF;

      if (type === 'BITSET_BASE64') {
        this.setState((prevState) => (
          {
            records: [
              ...prevState.records,
              {
                filter: result.data.result,
                tooltipData: new Map(prevState.formData),
                tooltipDisplayNames: prevState.formDisplay,
              },
            ],
          }
        ));
      } else {
        throw new Error(`${type} is not a valid bloomfilter type`);
      }
    }
  }

  onFormContentChange(key, value) {
    this.setState((prevState) => (
      { formData: new Map(prevState.formData).set(key, value) }
    ));
  }

  onFormTypeChange(form) {
    this.setState({
      formData: new Map(form.defaultData),
      formDisplay: new Map(form.display),
      formRequired: new Map(form.required),
      records: [],
      A: undefined,
      B: undefined,
    });
  }

  deleteResultIndex(index) {
    this.setState((prevState) => {
      const { records, A, B } = prevState;

      const newrecords = [...prevState.records];
      newrecords.splice(index, 1);
      return {
        records: newrecords,
        A: A === records[index] ? undefined : A,
        B: B === records[index] ? undefined : B,
      };
    });
  }

  render() {
    const {
      formData,
      formDisplay,
      formRequired,
      records,
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
            required={formRequired}
            onChange={this.onFormContentChange}
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
            <BloomFilterTable A={A ? A.filter : undefined} B={B ? B.filter : undefined} />
          </ContentContainer>

          <ContentContainer>
            <RecordTable
              data={records}
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
