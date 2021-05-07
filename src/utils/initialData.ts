import { ToDoList } from "./types";

export const ToDos: ToDoList = {
  "000000001": {
    id: "000000001",
    createdDate: "2021-01-19",
    deadlineDate: "2021-03-26",
    description: "Dummy",
    message: "Dummy ToDo",
    completed: false
  }
};


/*
// Code used when there are two separate properties viz users and todos
let todoIds = {};
    const fetchTodoIdsFromFirebase = () => {
      // Fetching the user's initial todo list
      // before attaching the listener
      firebase
        .database()
        .ref('users/' + currentUser?.uid + '/todos')
        .get()
        .then((snapshot) => {
          const data = snapshot.val();
          todoIds = { ...data };
          console.log('Users initial set of TodoIds : ', todoIds);
        });
    };
    fetchTodoIdsFromFirebase();

    // attaching a listener to the todos
    firebase
      .database()
      .ref('users/' + currentUser?.uid + '/todos')
      .on('value', (snapshot) => {
        console.log('Attaching Listener to Firebase User todos');
        todoIds = snapshot.val();
        updateTodoIdList({ ...todoIds });
      });

    let Todos: ToDoList = {};
    const fetchTodosFromFirebase = async () => {
      // Fetching Todos from Firebase
      const todoSnapshot = await firebase.database().ref('todos').get();
      Todos = todoSnapshot.val();
      console.log('A complete list of Todos: ', Todos);
    };
    fetchTodosFromFirebase();

    let tempTodoList = {};
    const loadTodosToState = () => {
      // Load only specific todos to state
      const todoIdList = Object.keys(todoIds);
      for (const todoId in Todos) {
        if (todoIdList.includes(todoId)) {
          tempTodoList = { ...tempTodoList, todo: Todos[todoId] };
        }
      }
      console.log('Final TodoList created: ', tempTodoList);
      setTodoList(() => ({ ...tempTodoList }));
    };

    loadTodosToState();
    */
