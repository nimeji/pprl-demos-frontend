import { Box } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableField, assembleText, tableCell, getContent, iconContent,
} from './TableField';
import transpose from './icons/transpose.png';

class TableCompoundField extends React.Component {
  transposeContent() {
    const { compoundFieldData, highlight } = this.props;

    const [text1a, text1b] = assembleText(compoundFieldData.field_1.data, highlight);
    const [text2a, text2b] = assembleText(compoundFieldData.field_2.data, highlight);

    let type1 = compoundFieldData.field_1.type;
    let type2 = compoundFieldData.field_2.type;

    if (type1 === 'equal' || type1 === 'diff') type1 += '_both';
    if (type2 === 'equal' || type2 === 'diff') type2 += '_both';

    const [content1a, content1b] = getContent(text1a, text1b, type1);
    const [content2a, content2b] = getContent(text2a, text2b, type2);

    return [tableCell(content1a, content2b), tableCell(content2a, content1b)];
  }

  render() {
    const { compoundFieldData, headers, highlight } = this.props;

    if (compoundFieldData.transpose === false) {
      return (
        <Box display="flex" flexWrap="nowrap">
          <TableField
            header={headers[0]}
            fieldData={compoundFieldData.field_1}
            highlight={highlight}
          />
          <TableField
            header={headers[1]}
            fieldData={compoundFieldData.field_2}
            highlight={highlight}
          />
        </Box>
      );
    }

    const [content1, content2] = this.transposeContent();

    return (
      <Box display="flex" flexWrap="nowrap">
        <TableField header={headers[0]} content={content1} />
        <TableField content={tableCell(iconContent(transpose))} />
        <TableField header={headers[1]} content={content2} />
      </Box>
    );
  }
}

TableCompoundField.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.bool,
  compoundFieldData: PropTypes.any.isRequired,
};

TableCompoundField.defaultProps = {
  headers: ['', ''],
  highlight: true,
};

export default TableCompoundField;
