import { ToDo } from "./types";

export const validateFormInputs = (formData: ToDo): boolean => {
  let result = true;
  for (const key in formData) {
    if (key !== "completed") {
      if ((formData[key] && formData[key].toString().trim().length > 1) || key === "id") {
        if (key === "createdDate" || key === "deadlineDate") {
          // add logic for Date validation
        } else {
          // Message and description validation logic (if any)
        }
      } else {
        result = false;
      }
    }
  }
  return result;
};

export const validateEmail = (email: string) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true
  }
  return false
}

export const validatePassword = (password: string): boolean => {
  if (password.trim().length > 6) {
    return true
  }
  return false
}

export const generateUniqueId = () => {
  let id: number;
  id = Date.now() * Math.floor(Math.random() * 100);
  return id.toString().substr(0, 9);
};
