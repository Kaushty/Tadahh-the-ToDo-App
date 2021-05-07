import React, { SetStateAction } from 'react';

import { ErrorBox } from './errorBox';
import { ToDo } from '../utils/types';

export const TodoForm: React.FunctionComponent<{
  todoFormState: ToDo;
  setFormState: React.Dispatch<SetStateAction<ToDo>>;
  error: boolean;
}> = ({ todoFormState, setFormState, error }) => {
  const updateFormState = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = event.currentTarget.value;
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="todo--form--container">
      <div id="todo-created" className="todo--field">
        <label className="todo--label" htmlFor="todo-created">
          created
        </label>
        <input
          className="todo--input"
          id="todo-inp-created"
          placeholder="empty"
          type="date"
          value={todoFormState?.createdDate}
          onChange={(event) => updateFormState(event, 'createdDate')}
        />
      </div>
      <div id="todo-deadline" className="todo--field">
        <label className="todo--label" htmlFor="todo-deadline">
          Deadline
        </label>
        <input
          className="todo--input"
          id="todo-inp-deadline"
          placeholder="empty"
          type="date"
          value={todoFormState?.deadlineDate}
          onChange={(event) => updateFormState(event, 'deadlineDate')}
        />
      </div>
      <div id="todo-desc" className="todo--field">
        <label className="todo--label" htmlFor="todo-desc">
          Description
        </label>
        <input
          className="todo--input"
          id="todo-inp-desc"
          placeholder="Empty"
          type="text"
          value={todoFormState?.description}
          onChange={(event) => updateFormState(event, 'description')}
        />
      </div>
      <div id="todo-message" className="todo--field">
        <label className="todo--label" htmlFor="todo-message">
          message
        </label>
        <textarea
          className="todo--input"
          id="todo-inp-message"
          name="todo-message"
          placeholder="Empty"
          rows={6}
          value={todoFormState?.message}
          onChange={(event) => updateFormState(event, 'message')}
        />
      </div>
      <ErrorBox
        message={' Please fill all empty fields before submitting'}
        show={error}
      />
    </div>
  );
};
