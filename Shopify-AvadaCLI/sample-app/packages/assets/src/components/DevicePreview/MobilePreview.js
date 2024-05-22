import React from 'react';
import PropTypes from 'prop-types';
import './devicePreview.scss';
import {Caption, Icon, SkeletonBodyText, Stack} from '@shopify/polaris';

const receptionSource = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="black"
      className="bi bi-reception-4"
      viewBox="0 0 15 15"
    >
      <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" />
    </svg>
  );
};

const wifiSource = () => {
  return (
    <svg
      height="15px"
      width="15px"
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            className="st0"
            d="M0,180.934l64.007,63.995c105.847-105.846,278.138-105.846,383.997,0L512,180.934 C370.809,39.768,141.178,39.768,0,180.934z"
          ></path>
          <path
            className="st0"
            d="M95.998,276.947l63.996,63.996c52.93-52.93,139.069-52.93,191.999,0L416,276.947 C327.751,188.685,184.262,188.685,95.998,276.947z"
          ></path>
          <path
            className="st0"
            d="M191.998,372.934l64.008,64.007l63.996-64.007C284.669,337.614,227.318,337.614,191.998,372.934z"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default function MobilePreview({children, shopName}) {
  return (
    <Stack distribution={'center'}>
      <div className="Avada-PreviewMobile">
        <div className="Avada_PreviewMobile__Inline">
          <div className="Avada_PreviewMobile__Body">
            <div className="Avada_PreviewMobile__Time">12:12</div>
            <div className="Avada_PreviewMobile__HeadPhone"></div>
            <div className="Avada_PreviewMobile__Icons">
              <Stack spacing={'extraTight'} alignment={'center'}>
                <Stack.Item>
                  <Icon source={receptionSource} />
                </Stack.Item>
                <Stack.Item>
                  <Icon source={wifiSource} />
                </Stack.Item>
                <Stack.Item>
                  <div className="Avada_PreviewMobile__IconBattery">100</div>
                </Stack.Item>
              </Stack>
            </div>
          </div>
          <div className="Avada_PreviewMobile__Content">
            <SkeletonBodyText lines={2} />
            {children}
            <SkeletonBodyText lines={2} />
          </div>
          <div className="Avada_PreviewMobile__Footer">
            <Caption>{shopName}</Caption>
            <div className="Avada_PreviewMobile__FooterDash"></div>
          </div>
        </div>
      </div>
    </Stack>
  );
}

MobilePreview.propTypes = {
  children: PropTypes.element.isRequired,
  shopName: PropTypes.string
};
