import React from 'react';
import './BadgeBranch.scss';
import {Badge} from '@shopify/polaris';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function BadgeBranch() {
  return (
    <div className={'Avada-BadgeBranch'}>
      <Badge status={'success'}>
        {process.env.APP_DEPLOYED_BRANCH || 'Unknown'} | {process.env.DEPLOYED_BY || 'Name'} |{' '}
        {process.env.DEPLOY_TIME || 'Date'}
      </Badge>
    </div>
  );
}
