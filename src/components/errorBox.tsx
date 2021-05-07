import React from 'react';

export const ErrorBox: React.FC<{
  message: string;
  show: boolean;
  style?: React.CSSProperties;
}> = ({ message = ' Error ', show, style = {} }) => {
  return show ? (
    <div className="tf--error" style={{ ...style }}>
      <p id="form-error-message">{message}</p>
    </div>
  ) : null;
};
