import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const options = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const signIn = async (email, password) => {
    const { data } = await axios.post(endPoints.auth.login, { email, password }, options);

    if (data.token) {
      Cookie.set('token', data.token, { expires: 5 });
      Cookie.set('id_user', data.user.id, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
      const getuser = await axios.get(endPoints.auth.getuser(data.user.id), {}, options);
      setUser(data.user ?? getuser.data);
    }
    return user;
  };

  const getUser = async (id_user) => {
    axios.defaults.headers.Authorization = `Bearer ${Cookie.get('token')}`;
    const getuser = await axios.get(endPoints.auth.getuser(id_user), {}, options);
    setUser(getuser.data);
    return user;
  };

  return {
    user,
    signIn,
    getUser,
  };
}
