import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { TableField } from './TableField';
import TableCompoundField from './TableCompoundField';

class Table extends React.Component {
  generateFields() {
    const fields = [];
    const { data, highlight } = this.props;

    if (data) {
      Object.values(data.structure.fields).forEach((field) => {
        if (field in data.structure.compound_fields) {
          fields.push(
            <TableCompoundField
              key={field}
              headers={data.structure.compound_fields[field]}
              compoundFieldData={data.compound_fields[field]}
              highlight={highlight}
            />,
          );
        } else {
          fields.push(
            <TableField
              key={field}
              header={field}
              fieldData={data.fields[field]}
              highlight={highlight}
            />,
          );
        }
      });
    }

    return (
      <Grid container wrap="nowrap" direction="row" justify="center" alignItems="center">
        {fields}
      </Grid>
    );
  }

  render() {
    return this.generateFields();
  }
}

Table.propTypes = {
  data: PropTypes.any,
  highlight: PropTypes.bool,
};

Table.defaultProps = {
  data: undefined,
  highlight: true,
};

export default Table;
