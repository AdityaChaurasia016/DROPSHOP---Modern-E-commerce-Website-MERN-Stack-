import { createContext, useEffect, useState } from 'react';
import ProductAPI from "./api/ProductAPI";
import UserAPI from './api/UserAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [isAdmin, setisAdmin] = useState(false)

  const refreshToken = async () => {
    try {
      const res = await axios.get('/user/refreshtoken');
      setToken(res.data.token); 
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token),
    sidebar: [isSidebarOpen, setIsSidebarOpen],
    isAdmin:[isAdmin, setisAdmin]
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
