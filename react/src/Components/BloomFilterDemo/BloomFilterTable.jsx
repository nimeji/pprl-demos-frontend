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

function diceCoefficient(l, r) {
  if (l.length < 1 || l.length !== r.length) return 0;

  let intersection = 0;
  let left = 0;
  let right = 0;

  for (let i = 0; i < l.length; i += 1) {
    if (l[i] === '1') left += 1;
    if (r[i] === '1') right += 1;
    if (l[i] === '1' && r[i] === '1') intersection += 1;
  }

  return (2.0 * intersection) / (left + right);
}

function BloomFilterTable(props) {
  const { A, B } = props;

  const diceCoeff = useMemo(() => diceCoefficient(A, B), [A, B]);

  const [newA, newB] = useMemo(() => {
    if (A.length === B.length) {
      const AElements = [];
      const BElements = [];

      for (let i = 0; i < A.length; i += 1) {
        if (A[i] === B[i]) {
          AElements.push(<span key={uuidv1()}>{A[i]}</span>);
          BElements.push(<span key={uuidv1()}>{B[i]}</span>);
        } else {
          AElements.push(<span key={uuidv1()} className="text-diff">{A[i]}</span>);
          BElements.push(<span key={uuidv1()} className="text-diff">{B[i]}</span>);
        }
      }

      return [AElements, BElements];
    }

    return [A, B];
  }, [A, B]);

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
          <BorderlessTableCell align="center">{newA}</BorderlessTableCell>
          <BorderlessTableCell align="center" rowSpan="2">{diceCoeff}</BorderlessTableCell>
        </TableRow>
        <TableRow>
          <BorderlessTableCell variant="head" align="center" style={{ width: '30px' }}>B</BorderlessTableCell>
          <BorderlessTableCell align="center">{newB}</BorderlessTableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

BloomFilterTable.propTypes = {
  A: PropTypes.string,
  B: PropTypes.string,
};

BloomFilterTable.defaultProps = {
  A: '',
  B: '',
};

export default BloomFilterTable;
