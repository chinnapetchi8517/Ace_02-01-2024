import React from 'react';
import {Modal, Pressable} from 'react-native';

const ModalComponent = ({isVisible, children, updateModalStatus}) => {

  const closeModal = () => {
    updateModalStatus(false)
  };
  
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      //handling for closing the modal.
      onRequestClose={closeModal}>
      <Pressable onPress={closeModal}>{children}</Pressable>
    </Modal>
  );
};
export default ModalComponent;
