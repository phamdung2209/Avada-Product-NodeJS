import React from 'react';
import {Icon, Stack, TextStyle, Tooltip} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';

/**
 * @param label
 * @param tooltip
 * @param {boolean} wrap
 * @param {'strong' | any} variation
 * @returns {JSX.Element}
 * @constructor
 */
export default function TooltipText({label, tooltip, variation, wrap = true}) {
  if (!tooltip) {
    return <TextStyle variation={variation}>{label}</TextStyle>;
  }
  return (
    <Tooltip content={tooltip} preferredPosition="above">
      <Stack alignment="center" spacing="extraTight" wrap={wrap}>
        <TextStyle variation={variation}>{label}</TextStyle>
        <Icon source={InfoMinor} color="subdued" />
      </Stack>
    </Tooltip>
  );
}

TooltipText.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.string,
  variation: PropTypes.any,
  wrap: PropTypes.bool
};
