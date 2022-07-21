import React, { useEffect } from 'react';
/* components */
/* 3rd party lib */
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
/* Util */
import { RootState } from '../store/store';
interface CheckAuthProps {}

type Props = CheckAuthProps & StateProps;

const CheckAuth: React.FC<Props> = ({ authenticated }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const router = useRouter();
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (!authenticated) {
      // if not authenticated, reroute to logout
      router.push('/logout');
    }
  }, [authenticated]);

  /* ================================================== */
  /* ================================================== */
  return <></>;
};

interface StateProps {
  authenticated?: boolean; //if auth token is not null, then authenticated is true
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    authenticated: state.auth.tokens ? true : false,
  };
};

export default connect(mapStateToProps, null)(CheckAuth);
