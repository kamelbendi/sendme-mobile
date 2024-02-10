import React, { useEffect, useState } from 'react';
import { getCookie } from '../helpers/UserSignedIn';
import english from '../languages/English.js';
import { LOCAL_STORAGE_NAME } from './user-details';

import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../api-urls.js';
import axios from 'axios';

const MainContext = React.createContext();

export const initialMainState = {
    languageCode: 'en',
    language: english,
    userExists: false, // Initialize with false
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
      //await AsyncStorage.clear();
      const userDetailsString = await AsyncStorage.getItem(LOCAL_STORAGE_NAME);
      
      // Check if userDetailsString is a valid JSON string
      if (userDetailsString) {
        const parsedUserDetails = JSON.parse(userDetailsString);
        
        // Check if parsedUserDetails is an object
        if (parsedUserDetails && typeof parsedUserDetails === 'string') {
          axios.post(apiUrl.user, {
            email: parsedUserDetails
          })
            .then(res => {
              setMainState((prev) => ({
                ...prev,
                userExists: true,
                userDetails: {
                  name: res.data.name,
                  surname: res.data.surname,
                  username: res.data.username,
                  phone: res.data.phone
                },
              }));
            })
            .catch(err => {
              alert(err);
            })
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
