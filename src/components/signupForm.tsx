import React, { useState } from 'react';

import { SignupFormData } from '../utils/types';
import { ErrorBox } from './errorBox';

export const SignupForm = ({
  submitForm,
  loading,
  errorMessage = '',
  showError = false,
}: {
  submitForm(
    event: React.FormEvent<HTMLFormElement>,
    formData: SignupFormData
  ): void;
  loading: boolean;
  errorMessage?: string;
  showError?: boolean;
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    emailId: '',
    password: '',
    confirmPassword: '',
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
        onSubmit={(event) => submitForm(event, formData)}
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
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            updateFormData(event, 'password');
          }}
          required
        />
        <input
          className="login--input"
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => {
            updateFormData(event, 'confirmPassword');
          }}
          required
        />
        <input
          type="submit"
          value="Sign up"
          className="button submit--btn"
          disabled={loading}
        />
      </form>
    </div>
  );
};
