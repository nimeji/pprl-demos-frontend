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
import FormHistory from './FormHistory';

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
      formHistory: [],
      history: {},
      method: '',
      A: undefined,
      B: undefined,
    };

    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormContentChange = this.onFormContentChange.bind(this);
    this.onFormTypeChange = this.onFormTypeChange.bind(this);
    this.onFormRestoreHistoryIndex = this.onFormRestoreHistoryIndex.bind(this);
    this.onFormDeleteHistoryIndex = this.onFormDeleteHistoryIndex.bind(this);
  }

  async onFormConfirm() {
    const { formData, method, formHistory } = this.state;

    let result;

    formHistory.unshift(new Map(formData));

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

    this.setState((prevState) => {
      const history = { ...prevState.history }
      history[prevState.method] = {
        A: prevState.A,
        B: prevState.B,
        records: prevState.records,
      }

      const { A, B, records = [] } = history[method] || {};
      
      return {
        formData: new Map(form.defaultData),
        formDisplay: new Map(form.display),
        formRequired: new Map(form.required),
        method: method,
        records: records,
        history: history,
        A: A,
        B: B,
      }
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

  onFormRestoreHistoryIndex(index) {
    this.setState((prevState) => {
      const { formData, formHistory, method } = prevState;
      const historyData = formHistory[index];

      const newFormData = new Map(formData);

      newFormData.forEach((value, key) => {
        if (historyData.has(key)) {
          newFormData.set(key, historyData.get(key));
        } else {
          newFormData.set(key, '');
        }
      });

      return {
        formData: newFormData,
      }
    });
  }

  onFormDeleteHistoryIndex(index) {
    this.setState((prevState) => {
      const newFormHistory = [...prevState.formHistory];
    
      newFormHistory.splice(index, 1);

      return {
        formHistory: newFormHistory,
      }
    });
  }

  render() {
    const {
      formData,
      formDisplay,
      formRequired,
      formHistory,
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
        <Box
          height="100%"
          display="grid"
          gridGap="20px"
          gridTemplateRows="min-content auto"
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
          <ContentContainer>
            <FormHistory
              history={formHistory}
              onRestoreIndex={this.onFormRestoreHistoryIndex}
              onDeleteIndex={this.onFormDeleteHistoryIndex}
            />
          </ContentContainer>
        </Box>

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
              selectedA={A}
              selectedB={B}
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
