import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography } from '@material-ui/core';
import equalIcon from './icons/equal.png';
import diffIcon from './icons/diff.png';
import missingIcon from './icons/missing.png';
import './style.css';

export function assembleText(diffs, highlight) {
  const text1 = [];
  const text2 = [];

  let styleDiff = '';
  let styleTranspose = '';

  if (highlight) {
    styleDiff = 'text-diff';
    styleTranspose = 'text-transpose';
  }

  Object.keys(diffs).forEach((key) => {
    const diff = diffs[key];

    if (diff.type === 'transpose') {
      text1.push(<span key={key} className={styleTranspose}>{diff.text1 + diff.text2}</span>);
      text2.push(<span key={key} className={styleTranspose}>{diff.text2 + diff.text1}</span>);
    } else if (diff.type === 'equal') {
      text1.push(<span key={key}>{diff.text_1}</span>);
      text2.push(<span key={key}>{diff.text_2}</span>);
    } else if (diff.type) {
      if (diff.text_1) text1.push(<span key={key} className={styleDiff}>{diff.text_1}</span>);
      if (diff.text_2) text2.push(<span key={key} className={styleDiff}>{diff.text_2}</span>);
    } else {
      if (diff.text_1) text1.push(<span key={key}>{diff.text_1}</span>);
      if (diff.text_2) text2.push(<span key={key}>{diff.text_2}</span>);
    }
  });

  return [text1, text2];
}

export function tableCell(content1, content2) {
  if (content2) {
    return (
      <>
        <Box height="50%" display="flex" justifyContent="center" alignItems="center">
          {content1}
        </Box>
        <Box height="50%" display="flex" justifyContent="center" alignItems="center">
          {content2}
        </Box>
      </>
    );
  }
  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      {content1}
    </Box>
  );
}

export function iconContent(icon) {
  return (
    <img src={icon} alt="" />
  );
}

export function textContent(text) {
  return (
    <Typography align="center">{text}</Typography>
  );
}

export function getContent(text1, text2, type) {
  switch (type) {
    case 'equal':
      return [iconContent(equalIcon), undefined];
    case 'diff':
      return [iconContent(diffIcon), undefined];
    case 'missing_one':
      return [iconContent(missingIcon), textContent(text2)];
    case 'missing_two':
      return [textContent(text1), iconContent(missingIcon)];
    case 'missing_both':
      return [iconContent(missingIcon), iconContent(missingIcon)];
    case 'equal_one':
      return [iconContent(equalIcon), textContent(text2)];
    case 'equal_two':
      return [textContent(text1), iconContent(equalIcon)];
    case 'equal_both':
      return [iconContent(equalIcon), iconContent(equalIcon)];
    case 'diff_one':
      return [iconContent(diffIcon), textContent(text1)];
    case 'diff_two':
      return [textContent(text1), iconContent(diffIcon)];
    case 'diff_both':
      return [iconContent(diffIcon), iconContent(diffIcon)];
    case 'none':
      return [textContent(text1), textContent(text2)];
    default:
      throw Error(`Unknown Attribute Type: ${type}`);
  }
}

export class TableField extends React.Component {
  content() {
    const { content, highlight, fieldData } = this.props;

    if (content) return content;

    const [text1, text2] = assembleText(fieldData.data, highlight);
    const [content1, content2] = getContent(text1, text2, fieldData.type);
    return tableCell(content1, content2);
  }

  render() {
    const { header } = this.props;

    return (
      <Box>
        <Box height={25} fontWeight={500} px={2} py={1} display="flex" justifyContent="center">
          {header}
        </Box>
        <Divider />
        <Box height={150} px={2}>
          {this.content()}
        </Box>
      </Box>
    );
  }
}

const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.content && !props.fieldData) {
    return new Error(`One of 'content' or 'fieldData' is required by '${componentName}' component.`);
  }

  return undefined;
};

TableField.propTypes = {
  content: requiredPropsCheck,
  header: PropTypes.string,
  highlight: PropTypes.bool,
  fieldData: requiredPropsCheck,
};

TableField.defaultProps = {
  content: undefined,
  header: '',
  highlight: true,
  fieldData: undefined,
};
