import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { v1 as uuidv1 } from 'uuid';
import BorderlessTableCell from './TableCell';
import BloomFilter from './BloomFilter';

function BloomFilterTable(props) {
  const { A, B } = props;

  let diceCoeff = '';
  const AElements = [];
  const BElements = [];

  if (A && B) {
    diceCoeff = A.diceCoefficient(B).toFixed(2);

    const Astring = A.toString('base64');
    const Bstring = B.toString('base64');

    for (let i = 0; i < Astring.length; i += 1) {
      if (Astring[i] === Bstring[i]) {
        AElements.push(<span key={uuidv1()}>{Astring[i]}</span>);
        BElements.push(<span key={uuidv1()}>{Bstring[i]}</span>);
      } else {
        AElements.push(<span key={uuidv1()} className="text-diff">{Astring[i]}</span>);
        BElements.push(<span key={uuidv1()} className="text-diff">{Bstring[i]}</span>);
      }
    }
  } else {
    if (A) AElements.push(<span key={uuidv1()}>{A.toString('base64')}</span>);
    if (B) BElements.push(<span key={uuidv1()}>{B.toString('base64')}</span>)
  }

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="center">Bloom Filter</TableCell>
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

BloomFilterTable.propTypes = {
  A: PropTypes.instanceOf(BloomFilter),
  B: PropTypes.instanceOf(BloomFilter),
};

BloomFilterTable.defaultProps = {
  A: undefined,
  B: undefined,
};

export default React.memo(BloomFilterTable);
