import React, {useEffect, useRef, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '@avada/assets/src/styles/hooks/_view_media.scss';
import {Icon} from '@shopify/polaris';
import {CancelSmallMinor, ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import getWindowSize from '@avada/assets/src/hooks/utils/getWindowSize';
import useKeyPress from '@avada/assets/src/hooks/utils/useKeyPress';

/**
 *
 * @param content
 * @param closeCallback
 * @param HtmlContent
 * @param array
 * @param isMobile
 * @param isAdmin
 * @returns {{NextButton: (function(): *), openModal: openModal, closeModal: (function(): void), handlePrevious: handlePrevious, PrevButton: (function(): *), modal: JSX.Element, open: boolean, handleNext: handleNext}}
 */
export default function useViewMedia({
  content = '',
  closeCallback = () => {},
  HtmlContent = null,
  array = [],
  isMobile = true,
  isAdmin = false
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const input = useRef(null);

  const arrowUpPressed = useKeyPress('ArrowLeft');
  const arrowDownPressed = useKeyPress('ArrowRight');

  const {width} = getWindowSize();

  const openModal = data => {
    const {media} = data;
    input.current = data;
    setOpen(true);

    const currentIndex = array?.findIndex(item => item.mediaId === media.mediaId) || 0;
    setIndex(currentIndex);
  };

  const closeModal = () => setOpen(false);
  const handleClose = () => {
    closeModal();
    closeCallback();
  };
  const handleNext = () => {
    const newIndex = index + 1 >= array.length ? array.length - 1 : index + 1;
    setIndex(newIndex);

    input.current = {...input.current, media: array[newIndex]};
  };
  const handlePrevious = () => {
    const newIndex = index - 1 <= 0 ? 0 : index - 1;
    setIndex(newIndex);

    input.current = {...input.current, media: array[newIndex]};
  };

  useEffect(() => {
    if (arrowUpPressed) {
      handlePrevious();
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      handleNext();
    }
  }, [arrowDownPressed]);

  const NextButton = () => (
    <div
      className={`Mageplaza-Popup__Arrow Mageplaza-Popup__ArrowLeft ${index <= 0 ? '_hide' : ''}`}
      onClick={handlePrevious}
    >
      <Icon source={ChevronLeftMinor} />
    </div>
  );

  const PrevButton = () => (
    <div
      className={`Mageplaza-Popup__Arrow Mageplaza-Popup__ArrowRight  ${
        index >= array?.length - 1 ? '_hide' : ''
      }`}
      onClick={handleNext}
    >
      <Icon source={ChevronRightMinor} />
    </div>
  );

  const modal = (
    <Popup
      repositionOnResize={true}
      className={`Mageplaza-Popup__Container ${
        isMobile ? 'Container-Mobile' : 'Container-Desktop'
      } ${isAdmin && isMobile ? '_mobileAdmin' : ''} ${
        isMobile && width > 700 ? '_mobileWidth' : ''
      }`}
      lockScroll={true}
      open={open}
      onClose={() => handleClose()}
      position="center center"
    >
      <div
        className={`Mageplaza-Popup__CloseButton ${isMobile ? '_mobile' : '_desktop'}`}
        onClick={() => handleClose()}
      >
        <Icon source={CancelSmallMinor} />
      </div>
      <PrevButton />
      {HtmlContent ? <HtmlContent {...{input}} /> : content}
      <NextButton />
    </Popup>
  );

  return {modal, open, closeModal, openModal, handleNext, handlePrevious, NextButton, PrevButton};
}

useViewMedia.propTypes = {
  content: PropTypes.string,
  closeCallback: PropTypes.func,
  HtmlContent: PropTypes.any,
  array: PropTypes.array,
  isMobile: PropTypes.bool,
  isAdmin: PropTypes.bool
};
