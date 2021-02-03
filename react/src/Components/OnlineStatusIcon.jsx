import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';
import http from 'http';

function OnlineStatusIcon({ url }) {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (url) {
      http.request(url, (response) => {
        if (response.statusCode === 200 || response.statusCode === 404) {
          setOnline(true);
        }
      }).end();
    }
  }, [url]);

  if (online) {
    return <ArrowUpward style={{ color: green[500] }} />;
  }
  return <ArrowDownward style={{ color: red[500] }} />;
}

OnlineStatusIcon.propTypes = {
  url: PropTypes.string,
};

OnlineStatusIcon.defaultProps = {
  url: undefined,
};

export default OnlineStatusIcon;
