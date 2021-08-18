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
import BloomFilter from './BloomFilter';

function bloomFilterRequest(formData, method) {
  const attributes = {};

  formData.forEach((value, key) => {
    attributes[key] = {
      type: 'STRING',
      value: value,
    }
  });

  return {
    encodingId: {
      method: method,
      project: "exampleProject"
    },
    record: {
      attributes: attributes
    }
  };
}

class BloomFilterDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      formData: new Map(),
      formDisplay: new Map(),
      formRequired: new Map(),
      method: '',
      A: undefined,
      B: undefined,
    };

    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormContentChange = this.onFormContentChange.bind(this);
    this.onFormTypeChange = this.onFormTypeChange.bind(this);
  }

  async onFormConfirm() {
    const { formData, method } = this.state;

    let result;

    try {
      result = await Axios.post(
        process.env.REACT_APP_BLOOMFILTER_API,
        bloomFilterRequest(formData, method)
      );
    } catch (error) {
      console.error(error);
    }

    if (result && result.data) {
      const { type, value } = result.data.attributes.RBF;

      if (type === 'BITSET_BASE64') {
        this.setState((prevState) => (
          {
            records: [
              ...prevState.records,
              {
                filter: new BloomFilter(value, 'base64'),
                tooltipData: new Map(prevState.formData),
                tooltipDisplayNames: prevState.formDisplay,
              },
            ],
          }
        ));
      } else {
        console.error(`${type} is not a valid bloomfilter type`);
      }
    }
  }

  onFormContentChange(key, value) {
    this.setState((prevState) => (
      { formData: new Map(prevState.formData).set(key, value) }
    ));
  }

  onFormTypeChange(form, method) {
    this.setState({
      formData: new Map(form.defaultData),
      formDisplay: new Map(form.display),
      formRequired: new Map(form.required),
      method: method,
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
