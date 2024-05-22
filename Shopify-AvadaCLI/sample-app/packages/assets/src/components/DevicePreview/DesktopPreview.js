import React from 'react';
import PropTypes from 'prop-types';
import './devicePreview.scss';
import {SkeletonBodyText} from '@shopify/polaris';

export default function DesktopPreview({children}) {
  return (
    <div className="Avada-PreviewDesktop">
      <div className="Avada-PreviewDesktop__Head">
        <div className="Avada-PreviewDesktop__HeadToolbar">
          <div className="Avada-PreviewDesktop__HeadToolbarRed"></div>
          <div className="Avada-PreviewDesktop__HeadToolbarYellow"></div>
          <div className="Avada-PreviewDesktop__HeadToolbarGreen"></div>
        </div>
      </div>
      <div className="Avada-PreviewDesktop__Body">
        <SkeletonBodyText lines={2} />
        {children}
        <SkeletonBodyText lines={2} />
      </div>
    </div>
  );
}

DesktopPreview.propTypes = {
  children: PropTypes.element.isRequired
};
