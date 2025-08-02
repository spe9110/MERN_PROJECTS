// src/context/AppContext.jsx
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/users/auth/is-auth`);

      if (data.success && data.authenticated) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      // Only handle truly unexpected failures (e.g. server down)
      setIsLoggedIn(false);
      setUser(null);
      toast.error(error.message);
    }
  };


  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/users/data`);
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        toast.error(data.message || "Failed to load user data");
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      toast.error(error?.response?.data?.message || error.message || "User data fetch failed");
    }
  };

  useEffect(() => {
    getAuthState(); // Runs on app load
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  );
};


/*
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true; // Ensure cookies are sent with every request
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getAuthState =  async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/users/auth/is-auth`)
        if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        // 401 means not logged in – do NOT show toast
        setIsLoggedIn(false);
        setUser(null);
      } else {
        // Other errors (e.g., 500, network issue) should show toast
        toast.error(error.message || "Something went wrong");
      }
      toast.error(error.message);
    }
  }
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/users/data`, {
        withCredentials: true
      });

      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      toast.error(error.message || 'Failed to fetch user data');
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};

*/