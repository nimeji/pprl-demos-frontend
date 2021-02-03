import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

function ContentWrapper(props) {
  const { path, title, children } = props;

  return (
    <Switch>
      <Route exact path={path}>
        {title}
        {children}
      </Route>
    </Switch>
  );
}

ContentWrapper.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

ContentWrapper.defaultProps = {
  path: undefined,
  title: undefined,
  children: undefined,
};

export default ContentWrapper;
