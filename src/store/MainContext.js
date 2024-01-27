import React, { useEffect, useState } from 'react';
import { getCookie } from '../helpers/UserSignedIn';
import english from '../languages/English.js';
import { LOCAL_STORAGE_NAME } from './user-details';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContext = React.createContext();

export const initialMainState = {
    languageCode: 'en',
    language: english,
    isLoggedIn: false, // Initialize with false
    dir: 'rtl',
    userDetails: {
      pin: '',
      //address: '',
      //zipCode: '',
      //country: '',
      //city: '',
      email: '',
      name: '',
      surname: '',
      username: '',
      phone: '',
      token: '',
    },
}

export const MainContextProvider = ({ children }) => {
  const [mainState, setMainState] = useState(initialMainState);

  const fetchUserDetails = async () => {
    try {
      const userDetailsString = await AsyncStorage.getItem(LOCAL_STORAGE_NAME);

      // Check if userDetailsString is a valid JSON string
      if (userDetailsString) {
        const parsedUserDetails = JSON.parse(userDetailsString);
        
        // Check if parsedUserDetails is an object
        if (parsedUserDetails && typeof parsedUserDetails === 'object') {
          setMainState((prev) => ({
            ...prev,
            isLoggedIn: true,
            userDetails: parsedUserDetails,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <MainContext.Provider value={{ mainState, setMainState }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => React.useContext(MainContext);
