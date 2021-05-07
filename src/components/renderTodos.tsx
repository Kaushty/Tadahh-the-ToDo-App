import React from 'react';
import {
  RiEditFill,
  RiDeleteBin6Line,
  RiCheckboxCircleLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import { ToDoList } from '../utils/types';

export const RenderTodos: React.FunctionComponent<{
  todoList: ToDoList;
  deleteTodo(id: string): void;
  toggleComplete(id: string): void;
  renderModal(event: React.FormEvent, id: string): void;
}> = ({ todoList, deleteTodo, toggleComplete, renderModal }) => {
  const todoIds = Object.keys(todoList);
  const isEmpty = todoIds.length === 0;

  return (
    <div className="todo--list">
      {!isEmpty ? (
        todoIds.map((id) => {
          return (
            <div
              key={id}
              className={`todo--body ${
                todoList[id].completed ? 'todo--completed' : ''
              }`}
            >
              <p className="todo--message">{todoList[id].message}</p>
              <div className="todo--action">
                <RiEditFill
                  className="todo--action--icon"
                  onClick={(event) => {
                    // toggle Modal State
                    renderModal(event, id);
                  }}
                />
                <RiDeleteBin6Line
                  className="todo--action--icon"
                  onClick={() => deleteTodo(id)}
                />
                {todoList[id].completed ? (
                  <RiCheckboxCircleFill
                    className="todo--action--icon"
                    onClick={() => toggleComplete(id)}
                  />
                ) : (
                  <RiCheckboxCircleLine
                    className="todo--action--icon"
                    onClick={() => toggleComplete(id)}
                  />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="todo--body">
          <p className="todo--message"> No todos available </p>
        </div>
      )}
    </div>
  );
};
