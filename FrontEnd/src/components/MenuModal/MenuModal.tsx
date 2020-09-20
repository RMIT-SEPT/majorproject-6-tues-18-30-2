import React, { useState } from 'react';
import { Menu, Modal } from 'antd';

/**
 * MenuModal Properties
 */
export interface ComponentProps {
  modal: {
    title?: string,
    component: any
  }
};

/**
 * MenuModal Component
 */
export const MenuModal: React.FC<ComponentProps> = ({ children, modal, ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const flipModal = () => setModalVisible(!modalVisible);

  return (
    <>
      <Menu.Item {...props} onClick={flipModal}>
        { children }
      </Menu.Item>
      <Modal centered title={modal.title} visible={modalVisible} onOk={flipModal} onCancel={flipModal} footer={null}>
        { modal.component }
      </Modal>
    </>
  );
};