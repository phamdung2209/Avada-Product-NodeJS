import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Render a link with react-router-dom
 *
 * @link https://github.com/Shopify/polaris-react/issues/2575#issuecomment-574269370
 * @param {React.ReactElement} children
 * @param {string} url
 * @param {object} rest
 * @return {React.ReactElement}
 * @constructor
 */
export default function ReactRouterLink({children, url = '', ...rest}) {
  // Use a regular a tag for external and download links
  if (isOutboundLink(url) || rest.download || rest.external) {
    if (rest.external) {
      delete rest.external;
      return (
        <a href={url} {...rest} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      );
    }
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
}

ReactRouterLink.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string.isRequired
};

/**
 * Check is outbound link or not
 * @param {string} url
 * @return {boolean}
 */
function isOutboundLink(url) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url);
}
