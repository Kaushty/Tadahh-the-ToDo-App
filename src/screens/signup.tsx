import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { useAuth } from '../contexts/AuthContext';
import { SignupFormData } from '../utils/types';
import { validateEmail, validatePassword } from '../utils/utils';
import { AppTitle, ErrorBox, SignupForm } from '../components';

export const SignupScreen: React.FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signup } = useAuth();
  const history = useHistory();

  const formSubmitAction = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: SignupFormData
  ): Promise<void> => {
    event.preventDefault();
    const { emailId, password, confirmPassword } = formData;
    if (password === confirmPassword) {
      if (validateEmail(emailId) && validatePassword(password)) {
        if (signup) {
          try {
            setLoading(true);
            const user = await signup(emailId, password);
            const userRef = firebase.database().ref('users/' + user.user?.uid);
            userRef.update(
              {
                active: true,
              },
              (error) => {
                if (error) {
                  console.log(
                    'An error occured while saving user to RTDB: ',
                    error
                  );
                  setErrorMessage('Login failed. ' + error.message);
                  setShowError(true);
                }
              }
            );
            history.push('/');
          } catch (error) {
            console.log('Signup failed on user');
            setErrorMessage(error.message);
            setShowError(true);
          }
        }
      } else {
        if (!validateEmail(emailId)) {
          setErrorMessage('Please enter a valid Email-Id');
        } else {
          setErrorMessage('Your password does not fit the criteria.');
        }
        setShowError(true);
      }
    } else {
      setErrorMessage('Passwords do not match!');
      setShowError(true);
    }
    setLoading(false);
  };
  return (
    <div className={`app--container ${loading ? 'blurred' : ''}`}>
      <AppTitle />
      <SignupForm
        submitForm={formSubmitAction}
        loading={loading}
        errorMessage={errorMessage}
        showError={showError}
      />
      <div className="reroute">
        <p className="reroute--text"> Already have an account? </p>
        <Link className="reroute--link" to="/login" replace>
          Login
        </Link>
      </div>
    </div>
  );
};
