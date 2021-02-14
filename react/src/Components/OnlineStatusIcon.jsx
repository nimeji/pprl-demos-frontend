import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';
import axios from 'axios';

function OnlineStatusIcon({ url }) {
  // eslint-disable-next-line no-unused-vars
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (url) {
      axios.get(url)
        .then((response) => {
          if (response.status === 200) {
            setOnline(true);
          } else {
            setOnline(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setOnline(true);
          } else {
            setOnline(false);
          }
        });
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
