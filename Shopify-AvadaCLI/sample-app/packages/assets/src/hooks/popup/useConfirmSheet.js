import React, {useRef, useState} from 'react';
import {Button, DisplayText, Sheet} from '@shopify/polaris';
import {CancelSmallMinor} from '@shopify/polaris-icons';

/**
 * @param Header
 * @param Content
 * @param title
 * @param {'small' | 'large' | string} size
 * @param isNested Check if sheet is opened within other sheet
 * @returns {{openSheet, closeSheet, sheet: JSX.Element, open: boolean}}
 */
export default function useConfirmSheet({
  Content = () => <></>,
  title = '',
  size = 'small',
  isNested = false
}) {
  const [open, setOpen] = useState(false);
  const input = useRef(null);
  const closeCallback = useRef(() => {});
  const width = (() => {
    switch (size) {
      case 'small':
        return '38rem';
      case 'large':
        return 'calc(100vw - 24rem - calc(env(safe-area-inset-left, 0)))';
      case 'medium':
        return '70rem';
      default:
        return size;
    }
  })();
  const setWidth = (width = null) => {
    if (width || !isNested) {
      document.documentElement.style.setProperty('--sheet--width', width);
    }
  };

  const openSheet = (currentInput = null) => {
    setWidth(width);
    setOpen(true);
    input.current = currentInput;
    closeCallback.current = () => {};
  };

  const closeSheet = (reOpen = false) => {
    setOpen(false);
    if (reOpen) setWidth();
    setTimeout(() => {
      if (!reOpen) setWidth();
      closeCallback.current();
    }, 500);
  };

  const params = {input, closeCallback, closeSheet, openSheet};

  const sheet = (
    <Sheet accessibilityLabel="" open={open} onClose={() => closeSheet()}>
      <div className="Avada-Sheet__Wrapper">
        {title && (
          <div className="Avada-Sheet__Header">
            <DisplayText size="small">{title}</DisplayText>
            <Button icon={CancelSmallMinor} onClick={() => closeSheet()} plain />
          </div>
        )}
        <Content {...params} />
      </div>
    </Sheet>
  );

  return {sheet, open, closeSheet, openSheet};
}
