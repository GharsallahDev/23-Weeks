import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/auth/AuthSlice';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthChecker;