import React, {useEffect, useState} from 'react';
import {TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';

export default function TextFieldMask({
  label = '',
  value = '',
  onChange,
  lostFocus,
  placeholder = '',
  requiredIndicator = false,
  disabled = false,
  readOnly = false,
  error = null,
  min = null,
  type = 'text',
  prefix = '',
  suffix = '',
  maxWidth = null,
  maxLength = 64
}) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const number = parseFloat(input);
    // update value when input is changed by (up/down) arrow
    if (
      type === 'number' &&
      !isNaN(number) &&
      [number + 1, number - 1].includes(parseFloat(value || '0'))
    ) {
      onChange(input);
    }
  }, [input]);

  useEffect(() => {
    if (value !== input) setInput(value);
  }, [value]);

  const onBlur = () => {
    if (value !== input) onChange(typeof input === 'string' ? input.trim() : input);
    if (lostFocus) {
      lostFocus();
    }
  };

  const field = (
    <TextField
      requiredIndicator={requiredIndicator}
      label={label}
      value={input}
      onChange={setInput}
      onBlur={onBlur}
      prefix={prefix}
      suffix={suffix}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      error={error}
      type={type}
      min={min}
      autoComplete="off"
      maxLength={maxLength}
    />
  );

  return maxWidth ? <div style={{maxWidth}}>{field}</div> : field;
}

TextFieldMask.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  lostFocus: PropTypes.func,
  placeholder: PropTypes.string,
  requiredIndicator: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.any,
  min: PropTypes.number,
  type: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  maxWidth: PropTypes.number,
  maxLength: PropTypes.number
};
