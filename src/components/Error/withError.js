import React from 'react';
import Error from './Error';

const withError = Component => ({ error, ...rest }) =>
  error ? <Error /> : <Component {...rest} />;

export default withError;
