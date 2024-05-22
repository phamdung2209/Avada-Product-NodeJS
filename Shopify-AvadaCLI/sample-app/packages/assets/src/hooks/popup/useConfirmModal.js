import React, {useRef, useState} from 'react';
import {Button, ButtonGroup, Modal} from '@shopify/polaris';

/**
 *
 * @param confirmAction
 * @param title
 * @param HtmlTitle
 * @param content
 * @param HtmlContent
 * @param buttonTitle
 * @param HtmlButtonTitle
 * @param closeTitle
 * @param large
 * @param loading
 * @param disabled
 * @param destructive
 * @param destructiveCallback
 * @param sectioned
 * @param canCloseAfterFinished
 * @param successCallback
 * @param closeCallback
 * @param defaultCurrentInput
 * @param hideButton
 * @param buttonColor
 * @returns {{openModal: openModal, closeModal: closeModal, modal: JSX.Element, open: boolean}}
 */
export default function useConfirmModal({
  confirmAction,
  title = 'Are you sure to delete?',
  HtmlTitle = null,
  content = 'Please be careful because you cannot undo this action.',
  HtmlContent = null,
  buttonTitle = 'Confirm',
  HtmlButtonTitle = null,
  closeTitle = 'Cancel',
  large = false,
  loading = false,
  disabled = false,
  destructive = false,
  destructiveCallback = () => {},
  sectioned = true,
  canCloseAfterFinished = true,
  successCallback = () => {},
  closeCallback = () => {},
  defaultCurrentInput = null,
  hideButton = false,
  buttonColor = ''
}) {
  const [open, setOpen] = useState(false);
  const input = useRef(null);

  const openModal = (currentInput = defaultCurrentInput) => {
    input.current = currentInput;
    setOpen(true);
  };

  const closeModal = () => {
    if (!loading) setOpen(false);
  };

  const handleClose = () => {
    closeModal();
    closeCallback();
  };

  const handleConfirm = () => {
    confirmAction(input.current).then(success => {
      if (!success) return;
      if (canCloseAfterFinished) handleClose();
      successCallback(success);
    });
  };

  const footerCustomButton = hideButton && buttonColor.length && (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button
          loading={loading}
          disabled={disabled}
          destructive={destructive || destructiveCallback({input})}
        >
          {HtmlButtonTitle ? <HtmlButtonTitle {...{input}} /> : buttonTitle}
        </Button>
      </ButtonGroup>
    </div>
  );
  const modal = (
    <Modal
      sectioned={sectioned}
      open={open}
      large={large}
      onClose={() => handleClose()}
      title={HtmlTitle ? <HtmlTitle input={input} /> : title}
      primaryAction={
        !hideButton && {
          content: HtmlButtonTitle ? <HtmlButtonTitle {...{input}} /> : buttonTitle,
          loading,
          disabled,
          destructive: destructive || destructiveCallback({input}),
          onAction: () => handleConfirm()
        }
      }
      secondaryActions={
        !hideButton && [
          {
            disabled: loading,
            content: closeTitle,
            onAction: () => handleClose()
          }
        ]
      }
      footer={footerCustomButton}
    >
      {HtmlContent ? <HtmlContent {...{input}} /> : content}
    </Modal>
  );

  return {modal, open, closeModal, openModal};
}
