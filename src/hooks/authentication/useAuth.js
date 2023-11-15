'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';

const isAuth = async () => {
  const token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(endPoints.auth.profile);
    return data;
  } else {
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(isAuth());
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const firstAuth = async () => {
      const userData = await isAuth();
      setUser(userData);
    };

    firstAuth();
  }, []);

  const getProfile = async () => {
    const { data } = await axios.get(endPoints.auth.profile);
    if (data) {
      setUser(data);
      router.push('/dashboard');
    }
  };

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (data) {
      const token = data.access_token;
      Cookies.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      getProfile();
    }
  };

  const logOut = () => {
    setUser(null);
    Cookies.remove('token');
    delete axios.defaults.headers.Authorization;
    window.location.href = '/';
  };

  return {
    user,
    signIn,
    error,
    setError,
    logOut,
  };
};
