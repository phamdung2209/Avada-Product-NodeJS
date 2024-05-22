import React from 'react';
import {Spinner} from '@shopify/polaris';
import NotFound from '@assets/pages/NotFound/NotFound';
import PropTypes from 'prop-types';
import './preloader.scss';

/**
 * Global loading component
 *
 * @returns {JSX.Element|null}
 * @constructor
 */
export default function Loading({error, pastDelay = true}) {
  if (error) {
    console.error(error);
    return <NotFound />;
  }

  return <div className="PreLoading PreLoading-Spinner">{pastDelay && <Spinner />}</div>;
}

Loading.propTypes = {
  error: PropTypes.any,
  pastDelay: PropTypes.bool
};
