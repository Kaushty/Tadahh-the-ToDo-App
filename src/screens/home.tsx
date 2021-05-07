import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import {
  AppTitle,
  RenderTodos,
  AddTodoButton,
  Modal,
  TodoForm,
} from '../components';
import { useAuth } from '../contexts/AuthContext';
import { ToDos as data } from '../utils/initialData';
import { ToDo, ToDoList } from '../utils/types';
import { validateFormInputs, generateUniqueId } from '../utils/utils';

export const HomeScreen: React.FunctionComponent<{}> = () => {
  let initialData: ToDoList = { ...data };
  const { logout, currentUser } = useAuth();
  const userRef = firebase.database().ref('users/' + currentUser?.uid);
  const history = useHistory();
  const [todoList, setTodoList] = useState<ToDoList>(initialData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoFormError, setFormError] = useState<boolean>(false);
  const [todoFormState, setTodoFromData] = useState<ToDo>({
    id: '',
    createdDate: '',
    deadlineDate: '',
    description: '',
    message: '',
    completed: false,
  });
  const resetTodoForm = () => {
    setTodoFromData({
      id: '',
      createdDate: '',
      deadlineDate: '',
      description: '',
      message: '',
      completed: false,
    });
    setFormError(false);
  };

  useEffect(() => {
    let Todos: ToDoList = {};
    const fetchTodosFromFirebase = async () => {
      if (currentUser && currentUser.uid) {
        // User is Logged In fetch his Todos
        const snapshot = await firebase
          .database()
          .ref('users/' + currentUser.uid + '/todos/')
          .get();

        Todos = snapshot.val();
      }
      if (Todos && Object.keys(Todos).length > 0) {
        setTodoList({ ...Todos });
      }
    };
    fetchTodosFromFirebase();
  }, []);

  const updateTodoInFirebase = (todoId: string, todoData: ToDo | null) => {
    if (todoData) {
      firebase
        .database()
        .ref('users/' + currentUser?.uid + '/todos/' + todoId)
        .set({
          ...todoData,
          id: todoId,
        });
    } else {
      firebase
        .database()
        .ref('users/' + currentUser?.uid + '/todos/' + todoId)
        .set(null);
    }
  };

  const saveTodoToState = async (newTodo: ToDo) => {
    let tempTodoList: ToDoList;
    let todoId =
      newTodo.id && newTodo.id.toString().trim().length === 9
        ? newTodo.id
        : generateUniqueId();
    tempTodoList = {
      ...todoList,
      [todoId]: {
        ...newTodo,
        id: todoId,
      },
    };
    setTodoList({ ...tempTodoList });
    // persist data change (firebase)
    updateTodoInFirebase(todoId, newTodo);
  };

  const deleteTodo = (id: string) => {
    let tempTodoList: ToDoList = { ...todoList };
    delete tempTodoList[id];
    setTodoList({ ...tempTodoList });
    updateTodoInFirebase(id, null);
  };

  const toggleTodoComplete = (id: string) => {
    let tempTodoList: ToDoList;
    tempTodoList = {
      ...todoList,
      [id]: {
        ...todoList[id],
        completed: !todoList[id].completed,
      },
    };
    setTodoList({ ...tempTodoList });
    updateTodoInFirebase(id, {
      ...todoList[id],
      completed: !todoList[id].completed,
    });
  };

  const openTodoModal = (event: React.FormEvent, todoId: string = ''): void => {
    event.preventDefault();
    if (todoId.length > 0) {
      // fetch todoData and setState for todoData
      // that will be loaded on to the modal
      setTodoFromData(() => ({
        ...todoList[todoId],
      }));
    }
    setShowModal(true);
  };

  const saveTodo = () => {
    const valid = validateFormInputs(todoFormState);
    if (valid) {
      resetTodoForm();
      setShowModal(false);
      saveTodoToState(todoFormState);
    } else {
      setFormError(true);
    }
  };

  const logoutUser = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (logout) {
      try {
        await logout();
        userRef.update(
          {
            active: false,
          },
          (error) => {
            if (error) {
              console.log(
                'An error occured while saving user to RTDB: ',
                error
              );
            }
          }
        );
        history.push('/login');
      } catch {
        console.log('Logout Failed');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    resetTodoForm();
  };

  return (
    <div className="root--container">
      <div className={`app--container ${showModal ? 'blurred' : ''}`}>
        <div className="app--header">
          <AppTitle />
        </div>
        <div className="app--body">
          <RenderTodos
            todoList={todoList}
            deleteTodo={deleteTodo}
            toggleComplete={toggleTodoComplete}
            renderModal={openTodoModal}
          />
          <div className="logout--btn--container centered">
            <button onClick={logoutUser} className="button logout--btn">
              Logout
            </button>
          </div>
        </div>
        <div className="app--footer">
          <AddTodoButton onClick={openTodoModal} disabled={showModal} />
        </div>
      </div>
      <Modal
        okText={'save'}
        onOk={saveTodo}
        show={showModal}
        onClose={closeModal}
        multipleOption={true}
      >
        <TodoForm
          todoFormState={todoFormState}
          setFormState={setTodoFromData}
          error={todoFormError}
        />
      </Modal>
    </div>
  );
};
