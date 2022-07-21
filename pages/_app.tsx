import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { END } from 'redux-saga';
import { SagaStore, wrapper } from '../store/store';
import App, { AppInitialProps, AppContext } from 'next/app';

// css files
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPageContext } from 'next/types';

export interface SagaStoreContext extends NextPageContext {
  store: SagaStore;
}

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };

    // 2. Stop the saga if on server
    if ((ctx as SagaStoreContext).req) {
      (ctx as SagaStoreContext).store.dispatch(END);
      await (ctx as SagaStoreContext).store.sagaTask?.toPromise();
    }

    // 3. Return props
    return {
      pageProps,
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <PersistGate persistor={(store as any).__persistor} loading={<div>Loading</div>}>
            <Component {...pageProps} />
          </PersistGate>
        )}
      </ReactReduxContext.Consumer>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
