import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Box,
} from '@material-ui/core';
import { v1 as uuidv1 } from 'uuid';
import RecordTableRow from './RecordTableRow';

class RecordTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.updateA = this.updateA.bind(this);
    this.updateB = this.updateB.bind(this);
  }

  updateA(event, newA) {
    if (!event.target.checked) return;

    const { onAChange } = this.props;

    this.setState({ selectedA: newA });
    onAChange(newA);
  }

  updateB(event, newB) {
    if (!event.target.checked) return;

    const { onBChange } = this.props;

    this.setState({ selectedB: newB });
    onBChange(newB);
  }

  render() {
    const { selectedA, selectedB } = this.state;
    const { data, onClickCopy, onClickDelete } = this.props;

    const recordList = [];

    data.forEach((row, index) => {
      recordList.push(
        <RecordTableRow
          key={uuidv1()}
          filter={row.filter}
          tooltipData={row.tooltipData}
          tooltipDisplayNames={row.tooltipDisplayNames}
          onClickCopy={() => onClickCopy(row)}
          onClickDelete={() => onClickDelete(index)}
          selectedA={selectedA === row}
          selectedB={selectedB === row}
          onChangeA={(event) => this.updateA(event, row)}
          onChangeB={(event) => this.updateB(event, row)}
        />,
      );
    });

    return (
      <Box position="relative" height="100%">
        <Box overflow="scroll" position="absolute" top="0" bottom="0" left="0" right="0">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="center">A</TableCell>
                <TableCell align="center">B</TableCell>
                <TableCell align="center">Bloom Filter</TableCell>
                <TableCell align="center">Kardinalität</TableCell>
                <TableCell align="center">Länge</TableCell>
                <TableCell align="center">Füllgrad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordList}
            </TableBody>
          </Table>
        </Box>
      </Box>
    );
  }
}

RecordTable.propTypes = {
  data: PropTypes.array,
  onClickCopy: PropTypes.func,
  onClickDelete: PropTypes.func,
  onAChange: PropTypes.func,
  onBChange: PropTypes.func,
};

RecordTable.defaultProps = {
  data: [],
  onClickCopy: () => {},
  onClickDelete: () => {},
  onAChange: () => {},
  onBChange: () => {},
};

export default RecordTable;
