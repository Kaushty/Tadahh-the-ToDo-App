import React from 'react';
import { FaPlus } from 'react-icons/fa';

export const AddTodoButton: React.FunctionComponent<{
  onClick: (event: React.FormEvent) => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => {
  return (
    <div className="todo--btn--container">
      <button id="add-todo-btn" onClick={onClick} disabled={disabled}>
        <FaPlus id="add-icon" />
      </button>
    </div>
  );
};
