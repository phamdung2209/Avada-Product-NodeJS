import {useState} from 'react';
import isString from '@assets/helpers/utils/isString';
import isNullOrUndefined from '@assets/helpers/utils/isNullOrUndefined';
import isArray from '@assets/helpers/utils/isArray';
import isEmpty from '@assets/helpers/utils/isEmpty';
import isValidUrl from '@assets/helpers/utils/isValidUrl';

function prepareValue(value) {
  return isString(value) ? value.trim() : value;
}

export default function useFormValidation(initRules = {}) {
  const [validations, setValidations] = useState({});

  const handleValidateForm = (extraRules = {}) => {
    const rules = {...initRules, ...extraRules};
    const validationPool = {};
    Object.keys(rules).forEach(key => {
      const fieldRules = rules[key].validation.split('|');
      fieldRules.forEach(rule => {
        if (rules[key].depends && !rules[key].depends()) {
          return;
        }
        switch (rule) {
          case 'required': {
            const value = prepareValue(rules[key].value);
            if (
              (isString(value) && value === '') ||
              isNullOrUndefined(value) ||
              (isArray(value) && value.length === 0) ||
              value === false
            ) {
              validationPool[key] = {
                message: rules[key].message || 'This field is required'
              };
            }
            break;
          }
          case 'date_less_than': {
            const {value, comparedValue} = rules[key];
            const fromDate = new Date(value);
            const toDate = new Date(comparedValue);
            if (fromDate > toDate && value !== null && comparedValue !== null) {
              validationPool[key] = {
                message: rules[key].message || 'Invalid date value'
              };
            }
            break;
          }
          case 'date_greater_than': {
            const {value, comparedValue} = rules[key];
            const fromDate = new Date(value);
            const toDate = new Date(comparedValue);
            if (fromDate < toDate && value !== null) {
              validationPool[key] = {
                message: rules[key].message || 'Invalid date value'
              };
            }
            break;
          }
          case 'date_between': {
            let {value, fromDate, toDate} = rules[key];
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            const dateValue = new Date(value);
            if (
              !(
                dateValue !== null &&
                fromDate < toDate &&
                fromDate <= dateValue &&
                toDate >= dateValue
              )
            ) {
              validationPool[key] = {
                message: rules[key].message || 'Invalid date value range'
              };
            }
            break;
          }
          case 'num_gt_than': {
            const {value, comparedValue, isEqual} = rules[key];
            const isValid =
              isEqual === true
                ? comparedValue <= parseFloat(value)
                : comparedValue < parseFloat(value);

            const message =
              isEqual === true
                ? `Number needs to be greater than or equal ${comparedValue}`
                : `Number needs to be greater than ${comparedValue}`;
            if (!isValid) {
              validationPool[key] = {
                message: rules[key].message || message
              };
            }
            break;
          }
          case 'num_lt_than': {
            const {value, comparedValue, isEqual} = rules[key];
            const isValid =
              isEqual === true
                ? comparedValue >= parseFloat(value)
                : comparedValue > parseFloat(value);

            const message =
              isEqual === true
                ? `Number needs to be less than or equal ${comparedValue}`
                : `Number needs to be less than ${comparedValue}`;
            if (!isValid) {
              validationPool[key] = {
                message: rules[key].message || message
              };
            }
            break;
          }
          case 'num_between':
            const {value, ltNum, gtNum, isEqual} = rules[key];
            let isValid = false;
            if (isEqual && parseFloat(value) >= gtNum && parseFloat(value) <= ltNum) {
              isValid = true;
            }
            if (!isEqual && parseFloat(value) > gtNum && parseFloat(value) < ltNum) {
              isValid = true;
            }
            const message =
              isEqual === true
                ? `Number needs to be between equal ${gtNum} and ${ltNum}`
                : `Number needs to be between ${gtNum} and ${ltNum}`;
            if (!isValid) {
              validationPool[key] = {
                message: rules[key].message || message
              };
            }
            break;
          case 'email': {
            const {value} = rules[key];
            if (value.trim() !== '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              validationPool[key] = {
                message: rules[key].message || 'Please enter a valid email address.'
              };
            }
            break;
          }
          case 'domain': {
            const {value} = rules[key];
            if (
              !/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/g.test(
                value
              )
            ) {
              validationPool[key] = {
                message: rules[key].message || 'Invalid domain'
              };
            }
            break;
          }
          case 'digits': {
            const {value} = rules[key];
            if (!Number.isInteger(parseFloat(value))) {
              validationPool[key] = {
                message: rules[key].message || 'Must be digits'
              };
            }
            break;
          }
          case 'min_char': {
            const {value, comparedValue, isEqual} = rules[key];
            let isValid = false;
            if (isEqual && value.length >= comparedValue) {
              isValid = true;
            }
            if (!isEqual && value.length > comparedValue) {
              isValid = true;
            }
            const message =
              isEqual === true
                ? `Fill at least ${comparedValue} characters`
                : `Fill more than ${comparedValue} characters`;
            if (!isValid) {
              validationPool[key] = {
                message: rules[key].message || message
              };
            }
            break;
          }
          case 'custom': {
            const {value, message, customHandler} = rules[key];
            if (!customHandler(value)) {
              validationPool[key] = {
                message: message || 'The value is invalid'
              };
            }
            break;
          }
          case 'custom_array': {
            const {value, valueIds, message, customHandler} = rules[key];
            const results = {};
            (valueIds || value.map(x => x.id)).forEach((id, index) => {
              if (!customHandler(value, index)) {
                results[id] = {
                  message: message || 'The value is invalid'
                };
              }
            });
            if (!isEmpty(results)) {
              validationPool[key] = results;
            }
            break;
          }
          case 'url': {
            const {value, message, isBlank} = rules[key];
            if (isBlank && !value) {
              break;
            }
            if (!isValidUrl(value)) {
              validationPool[key] = {
                message: message || 'Invalid URL'
              };
            }
            break;
          }
          case 'zipCode': {
            const {value, message, isBlank} = rules[key];
            if (isBlank && !value) {
              break;
            }
            if (!/^[0-9- ]*$/.test(value)) {
              validationPool[key] = {
                message: message || 'Must contain only numbers, spaces and dashes'
              };
            }
          }
        }
      });
    });
    setValidations(validationPool);
    return isEmpty(validationPool);
  };

  return {validations, setValidations, handleValidateForm};
}
