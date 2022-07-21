import React, { useEffect } from 'react';
/* components */
/* 3rd party lib */
import { useRouter } from 'next/router';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import { persistor } from 'store/store';

/* Util */
interface logoutProps {}

type Props = logoutProps & DispatchProps;

const logout: React.FC<Props> = ({ onSignOut }) => {
  const router = useRouter();
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    // clear everything
    localStorage.removeItem('token');
    persistor.purge();
    onSignOut();
    router.push('/');
  }, []);
  /* ================================================== */
  /* ================================================== */
  return <></>;
};

interface DispatchProps {
  onSignOut: typeof actions.signOut;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSignOut: () => dispatch(actions.signOut()),
  };
};

export default connect(null, mapDispatchToProps)(logout);
