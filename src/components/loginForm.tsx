import React, { useState } from 'react';

import { LoginFormData } from '../utils/types';
import { ErrorBox } from './errorBox';
import '../styles/authForm.css';

export const LoginForm = ({
  submitForm,
  loading,
  errorMessage = '',
  showError = false,
}: {
  submitForm(
    event: React.FormEvent<HTMLFormElement>,
    formData: LoginFormData
  ): void;
  loading: boolean;
  errorMessage?: string;
  showError?: boolean;
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailId: '',
    password: '',
  });

  const updateFormData = (
    event: React.FormEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = event.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="form--container">
      <ErrorBox message={errorMessage} show={showError} />
      <form
        className="login--form"
        onSubmit={(event) => {
          submitForm(event, formData);
        }}
      >
        <input
          className="login--input"
          onChange={(event) => {
            updateFormData(event, 'emailId');
          }}
          type="text"
          placeholder="Enter Email id"
          required
        />
        <input
          className="login--input"
          onChange={(event) => {
            updateFormData(event, 'password');
          }}
          type="password"
          placeholder="Enter Password"
          required
        />
        <input
          type="submit"
          value="Login"
          className="button submit--btn"
          disabled={loading}
        />
      </form>
    </div>
  );
};
