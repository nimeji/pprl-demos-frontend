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

// https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Dice%27s_coefficient#Javascript
function diceCoefficient(l, r) {
  if (l.length < 2 || r.length < 2) return 0;

  const lBigrams = new Map();
  for (let i = 0; i < l.length - 1; i += 1) {
    const bigram = l.substr(i, 2);
    const count = lBigrams.has(bigram)
      ? lBigrams.get(bigram) + 1
      : 1;

    lBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < r.length - 1; i += 1) {
    const bigram = r.substr(i, 2);
    const count = lBigrams.has(bigram)
      ? lBigrams.get(bigram)
      : 0;

    if (count > 0) {
      lBigrams.set(bigram, count - 1);
      intersectionSize += 1;
    }
  }

  return (2.0 * intersectionSize) / (l.length + r.length - 2);
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
