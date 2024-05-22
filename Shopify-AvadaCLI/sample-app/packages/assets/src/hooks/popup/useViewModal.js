import React, {useState} from 'react';
import {Modal} from '@shopify/polaris';

/**
 * @param title
 * @param content
 * @param large
 * @param instant
 * @param sectioned
 * @param closeCallback
 * @returns {{openModal: (function(): void), closeModal: (function(): void), modal: *, open: boolean}}
 */
export default function useViewModal({
  title,
  content,
  large = false,
  instant = true,
  sectioned = false,
  closeCallback = () => {}
}) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handleClose = () => {
    closeModal();
    closeCallback();
  };

  const modal = (
    <Modal
      large={large}
      instant={instant}
      sectioned={sectioned}
      open={open}
      onClose={() => handleClose()}
      title={title}
      secondaryActions={[{content: 'Close', onAction: () => handleClose()}]}
    >
      {content}
    </Modal>
  );

  return {modal, open, closeModal, openModal};
}
