import {
  Table, TableBody, TableRow, Radio, IconButton,
} from '@material-ui/core';
import { ArrowBack, DeleteForever } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';
import HTMLTooltip from './HTMLTooltip';
import TableCell from './TableCell';

function RecordTableRow(props) {
  const {
    record,
    tooltipData,
    tooltipDisplayNames,
    selectedA,
    selectedB,
    onChangeA,
    onChangeB,
    onClickCopy,
    onClickDelete,
  } = props;

  const tooltip = (
    <Table>
      <TableBody>
        {Array.from(tooltipData, ([key, value]) => (
          <TableRow key={uuidv1()}>
            <TableCell align="left">{tooltipDisplayNames.get(key)}</TableCell>
            <TableCell align="right">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const cardinality = (record.match(/1/g) || []).length;
  const filling = (cardinality / record.length).toPrecision(2);

  return (
    <HTMLTooltip title={tooltip} placement="left" arrow>
      <TableRow hover>
        <TableCell align="center" onClick={onClickDelete}>
          <IconButton>
            <DeleteForever />
          </IconButton>
        </TableCell>
        <TableCell align="center" onClick={onClickCopy}>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Radio
            color="primary"
            checked={selectedA}
            onChange={onChangeA}
          />
        </TableCell>
        <TableCell align="center">
          <Radio
            color="primary"
            checked={selectedB}
            onChange={onChangeB}
          />
        </TableCell>
        <TableCell align="center">{record}</TableCell>
        <TableCell align="right">{cardinality}</TableCell>
        <TableCell align="right">{record.length}</TableCell>
        <TableCell align="right">{filling}</TableCell>
      </TableRow>
    </HTMLTooltip>
  );
}

RecordTableRow.propTypes = {
  record: PropTypes.string,
  tooltipData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  tooltipDisplayNames: PropTypes.objectOf(PropTypes.string),
  selectedA: PropTypes.bool,
  selectedB: PropTypes.bool,
  onChangeA: PropTypes.func,
  onChangeB: PropTypes.func,
  onClickCopy: PropTypes.func,
  onClickDelete: PropTypes.func,
};

RecordTableRow.defaultProps = {
  record: '',
  tooltipData: {},
  tooltipDisplayNames: {},
  selectedA: false,
  selectedB: false,
  onChangeA: () => {},
  onChangeB: () => {},
  onClickCopy: () => {},
  onClickDelete: () => {},
};

export default RecordTableRow;
