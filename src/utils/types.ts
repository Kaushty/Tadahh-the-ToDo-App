export interface ToDo {
  id: string;
  createdDate: string;
  deadlineDate: string;
  description: string;
  message: string;
  completed: boolean;
  [key: string]: boolean | string
}

export type ToDoList = {
  [key: string]: ToDo;
};

export interface SignupFormData {
  emailId: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  emailId: string;
  password: string;
}
