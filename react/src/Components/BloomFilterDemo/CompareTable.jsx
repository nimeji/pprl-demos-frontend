/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DiffMatchPatch from 'diff-match-patch';
import { v1 as uuidv1 } from 'uuid';
import CompareTableText from './CompareTableText';
import BorderlessTableCell from './TableCell';

const styleLeft = { width: '30px' };

class CompareTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diffs: [],
    };
  }

  componentDidMount() {
    this.setState({ dmp: new DiffMatchPatch() });
  }

  componentDidUpdate(prevProps) {
    const { dmp } = this.state;
    const { As, Bs } = this.props;

    if (prevProps.As !== As || prevProps.Bs !== Bs) {
      const diffs = [];

      for (let i = 0; i < As.length; i += 1) {
        const diff = dmp.diff_main(As[i], Bs[i]);
        dmp.diff_cleanupSemantic(diff);
        diffs.push(diff);
      }

      this.setState({ diffs });
    }
  }

  render() {
    const elementsA = [];
    const elementsB = [];

    const { diffs } = this.state;
    const { headers } = this.props;

    diffs.forEach((diff) => {
      elementsA.push(<BorderlessTableCell key={uuidv1()}><CompareTableText diff={diff} variant="A" /></BorderlessTableCell>);
      elementsB.push(<BorderlessTableCell key={uuidv1()}><CompareTableText diff={diff} variant="B" /></BorderlessTableCell>);
    });

    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={styleLeft} />
            {headers.map((header) => <TableCell key={uuidv1()}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <BorderlessTableCell align="center" variant="head" style={styleLeft}>A</BorderlessTableCell>
            {elementsA}
          </TableRow>
          <TableRow>
            <BorderlessTableCell align="center" variant="head" style={styleLeft}>B</BorderlessTableCell>
            {elementsB}
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

CompareTable.propTypes = {
  As: PropTypes.arrayOf(PropTypes.string),
  Bs: PropTypes.arrayOf(PropTypes.string),
  headers: PropTypes.arrayOf(PropTypes.string),
};

CompareTable.defaultProps = {
  As: [],
  Bs: [],
  headers: [],
};

export default CompareTable;
