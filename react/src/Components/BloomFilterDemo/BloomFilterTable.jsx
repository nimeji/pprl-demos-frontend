import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core';
import { v1 as uuidv1 } from 'uuid';
import BorderlessTableCell from './TableCell';
import BloomFilter from './BloomFilter';

class BloomFilterTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      AElements: [],
      BElement: [],
      diceCoeff: '',
      encoding: 'base64',
    };

    this.handleEncodingChange = this.handleEncodingChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { A, B } = this.props;
    const { encoding } = this.state;

    if (A && B) {
      if (A !== prevProps.A || B !== prevProps.B || encoding !== prevState.encoding) {
        const AElements = [];
        const BElements = [];

        const Astring = A.toString(encoding);
        const Bstring = B.toString(encoding);
    
        for (let i = 0; i < Astring.length; i += 1) {
          if (Astring[i] === Bstring[i]) {
            AElements.push(<span key={uuidv1()}>{Astring[i]}</span>);
            BElements.push(<span key={uuidv1()}>{Bstring[i]}</span>);
          } else {
            AElements.push(<span key={uuidv1()} className="text-diff">{Astring[i]}</span>);
            BElements.push(<span key={uuidv1()} className="text-diff">{Bstring[i]}</span>);
          }
        }

        this.setState({
          AElements,
          BElements,
          diceCoeff: A.diceCoefficient(B).toFixed(2),
        });
      }
    } else {
      if (A && (A !== prevProps.A || encoding !== prevState.encoding)) {
        this.setState({ AElements: [<span key={uuidv1()}>{A.toString(encoding)}</span>] });
      } 
      if (B && (B !== prevProps.B || encoding !== prevState.encoding)) {
        this.setState({ BElements: [<span key={uuidv1()}>{B.toString(encoding)}</span>] });
      }
    }
  }

  handleEncodingChange(event) {
    this.setState({ encoding: event.target.value });
  }

  render() {
    const { A, B } = this.props;
    const { AElements, BElements, diceCoeff, encoding } = this.state;
  
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">
              Bloom Filter
              <Box ml={1} display="inline-block">
                <Select value={encoding} onChange={this.handleEncodingChange}>
                  {
                    ['base64', 'hex', 'ascii', 'binary'].map((encoding) => 
                      <MenuItem key={encoding} value={encoding}>{encoding}</MenuItem>
                    )
                  }
                </Select>
              </Box>
            </TableCell>
            <TableCell align="center">Dice Coefficient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <BorderlessTableCell variant="head" align="center" style={{ width: '30px' }}>A</BorderlessTableCell>
            <BorderlessTableCell align="center">{AElements}</BorderlessTableCell>
            <BorderlessTableCell align="center" rowSpan="2">{diceCoeff}</BorderlessTableCell>
          </TableRow>
          <TableRow>
            <BorderlessTableCell variant="head" align="center" style={{ width: '30px' }}>B</BorderlessTableCell>
            <BorderlessTableCell align="center">{BElements}</BorderlessTableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

BloomFilterTable.propTypes = {
  A: PropTypes.instanceOf(BloomFilter),
  B: PropTypes.instanceOf(BloomFilter),
};

BloomFilterTable.defaultProps = {
  A: undefined,
  B: undefined,
};

export default React.memo(BloomFilterTable);
