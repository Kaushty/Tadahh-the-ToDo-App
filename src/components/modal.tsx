import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import '../styles/modal.css';

export const Modal: React.FunctionComponent<{
  header?: React.ReactChild;
  show: boolean;
  multipleOption?: boolean;
  okText?: string;
  onOk?: () => void;
  onClose: () => void;
  children: React.ReactChild;
  style?: React.CSSProperties;
}> = ({
  show,
  onClose,
  children,
  multipleOption = false,
  okText = 'Okay',
  onOk,
  style = {},
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal--container">
      <div className="modal--header">
        <button
          id="modal-header-btn"
          className="modal--button"
          onClick={onClose}
        >
          <RiCloseLine size={21} id="modal-close-icon" />
        </button>
      </div>
      <div className="modal--body" style={{ ...style }}>
        {children}
      </div>
      <div className="modal--footer">
        {multipleOption && (
          <button className="modal--button" id="modal-save-btn" onClick={onOk}>
            {okText}
          </button>
        )}
        <button
          className="modal--button"
          id="modal-cancel-btn"
          onClick={onClose}
        >
          cancel
        </button>
      </div>
    </div>
  );
};
