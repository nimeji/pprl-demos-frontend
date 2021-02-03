import { Paper } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

function ContentContainer(props) {
  const { children } = props;

  return (
    <Paper elevation={5}>
      {children}
    </Paper>
  );
}

ContentContainer.propTypes = {
  children: PropTypes.node,
};

ContentContainer.defaultProps = {
  children: <></>,
};

export default ContentContainer;
