import {
  Table, TableBody, TableRow, Radio, IconButton,
} from '@material-ui/core';
import { ArrowBack, DeleteForever } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';
import HTMLTooltip from './HTMLTooltip';
import TableCell from './TableCell';
import BloomFilter from './BloomFilter';

function RecordTableRow(props) {
  const {
    filter,
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
        <TableCell align="center" style={{overflowWrap: 'anywhere'}}>{filter.toString('base64')}</TableCell>
        <TableCell align="right">{filter.cardinality}</TableCell>
        <TableCell align="right">{filter.length}</TableCell>
        <TableCell align="right">{filter.fillgrade.toFixed(2)}</TableCell>
      </TableRow>
    </HTMLTooltip>
  );
}

RecordTableRow.propTypes = {
  filter: PropTypes.instanceOf(BloomFilter).isRequired,
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
