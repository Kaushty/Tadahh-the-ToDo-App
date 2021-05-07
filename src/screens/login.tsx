import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { useAuth } from '../contexts/AuthContext';
import { LoginFormData } from '../utils/types';
import { validateEmail } from '../utils/utils';
import { AppTitle, ErrorBox, LoginForm, Modal } from '../components';

export const LoginScreen: React.FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState({ show: false, error: '' });
  const [showError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgottenEmail, setForgottenEmail] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const formSubmitAction = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: LoginFormData
  ): Promise<void> => {
    event.preventDefault();
    const { emailId, password } = formData;
    if (validateEmail(emailId)) {
      if (login) {
        //type-checking
        try {
          setLoading(true);
          const user = await login(emailId, password);
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
          console.log('Login failed due to an Error', error);
          setErrorMessage(error.message);
          setShowError(true);
        }
      }
    } else {
      setErrorMessage('Please Enter a valid Email-id');
      setShowError(true);
    }
    setLoading(false);
  };

  const sendForgotPasswordEmail = () => {
    const auth = firebase.auth();
    const emailId = forgottenEmail;
    if (validateEmail(emailId)) {
      auth
        .sendPasswordResetEmail(emailId)
        .then(function () {
          setModalError(() => ({
            show: true,
            error: 'Check your mail for further instructions',
          }));
        })
        .catch(function (error) {
          console.log('Error occured while sending reset link ', error);
          setModalError(() => ({ show: true, error: error.message }));
        });
    } else {
      setModalError(() => ({
        show: true,
        error: 'Please enter a valid email id',
      }));
    }
  };

  return (
    <div className={`app--container ${loading ? 'blurred' : ''}`}>
      <AppTitle />
      <LoginForm
        submitForm={formSubmitAction}
        loading={loading}
        errorMessage={errorMessage}
        showError={showError}
      />
      <div className="forgot--password reroute">
        <p
          className="reroute--text clickable"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Forgot Password ?
        </p>
      </div>
      <div className="reroute">
        <p className="reroute--text clickable"> Don't have an account? </p>
        <Link className="reroute--link" to="/signup" replace>
          Sign-up
        </Link>
      </div>
      <Modal
        show={openModal}
        style={{ minHeight: '200px', display: 'flex' }}
        onClose={() => {
          setForgottenEmail('');
          setModalError(() => ({ show: false, error: '' }));
          setOpenModal(false);
        }}
        okText={'Send Mail'}
        multipleOption
        onOk={sendForgotPasswordEmail}
      >
        <div className="forgot--pw--form">
          <label
            htmlFor="forgotten-email"
            className="todo--label"
            style={{ flex: '0' }}
          >
            Enter your email Id
          </label>
          <input
            className="todo--input"
            id="forgotten-email"
            type="email"
            style={{ flex: '0' }}
            value={forgottenEmail}
            onChange={(event) => setForgottenEmail(event.currentTarget.value)}
            required
          />
          <ErrorBox show={modalError.show} message={modalError.error} />
        </div>
      </Modal>
    </div>
  );
};
