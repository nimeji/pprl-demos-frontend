import React from 'react';
import PropTypes from 'prop-types';
import DiffMatchPatch from 'diff-match-patch';
import './style.css';
import { v1 as uuidv1 } from 'uuid';

function CompareTableText(props) {
  const { diff, variant } = props;

  const substrings = [];

  diff.forEach(([type, substring]) => {
    if ((variant === 'A' && type !== DiffMatchPatch.DIFF_INSERT) || (variant === 'B' && type !== DiffMatchPatch.DIFF_DELETE)) {
      substrings.push(
        <span
          key={uuidv1()}
          className={type !== DiffMatchPatch.DIFF_EQUAL ? 'text-diff' : ''}
        >
          {substring}
        </span>,
      );
    }
  });

  return substrings;
}

CompareTableText.propTypes = {
  diff: PropTypes.array.isRequired,
  variant: PropTypes.oneOf(['A', 'B']).isRequired,
};

export default CompareTableText;
