import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBVEqXoCBA2lnAvXYzlFuMXRkgakV79H6Q",
  authDomain: "todo-app-600f3.firebaseapp.com",
  databaseURL: "https://todo-app-600f3-default-rtdb.firebaseio.com",
  projectId: "todo-app-600f3",
  storageBucket: "todo-app-600f3.appspot.com",
  messagingSenderId: "156895049840",
  appId: "1:156895049840:web:d82b4d9063a88e59251cb5"
});

export const auth = app.auth();
export default app;
