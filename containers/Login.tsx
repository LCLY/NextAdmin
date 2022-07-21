import styles from '../styles/Login.module.scss';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { ToastContainer } from 'react-toastify';
import * as actions from 'store/actions/index';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'store/store';
import { useRouter } from 'next/router';

interface LoginProps {}

type Props = LoginProps & StateProps & DispatchProps;

const Login: React.FC<Props> = ({ onSignIn, authenticated, loading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // rest call to sign in and get token
    onSignIn(username, password);
  };

  useEffect(() => {
    if (authenticated) {
      router.push('/projects');
    }
  }, [authenticated]);

  return (
    <>
      <div className={styles['login__div']}>
        <div className={styles['login__title']}>DEMO</div>
        <form onSubmit={handleSubmit}>
          <div className={`flex-align-center ${styles['login__div-input']}`}>
            <div className={styles['login__label']}>
              <label htmlFor="username">Username:&nbsp;</label>
            </div>
            <input
              value={username}
              required
              id="username"
              placeholder="Enter username here"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={`flex-align-center ${styles['login__div-input']}`}>
            <div className={styles['login__label']}>
              <label htmlFor="password">Password:&nbsp;</label>
            </div>
            {/* not adding value because it can be exposed in browser */}
            <input
              required
              type="password"
              id="password"
              placeholder="Enter password here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className={styles['login__button']} variant="primary" type="submit">
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </div>
      <ToastContainer autoClose={1500} hideProgressBar={true} />
    </>
  );
};

interface StateProps {
  authenticated: boolean; //if auth token is not null, then authenticated is true
  loading?: boolean;
}

const mapStateToProps = (state: RootState): StateProps => {
  return { authenticated: state.auth.tokens ? true : false, loading: state.auth.loading };
};

interface DispatchProps {
  onSignIn: typeof actions.signIn;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSignIn: (username, password) => dispatch(actions.signIn(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
