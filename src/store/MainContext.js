import React, { useState } from 'react';
import { getCookie } from '../helpers/UserSignedIn';
import english from '../languages/English.js';

const MainContext = React.createContext();

export const initialMainState = {
    languageCode: 'en',
    language: english,
    userExists: false, // Initialize with false
    userDetails: {
      pin: '',
      email: '',
      name: '',
      surname: '',
      username: '',
      phone: '',
      token: '',
      balance: 0,
      transactions: [],
      accountNumber: '123456789',
      idUri: null
    },
}

export const MainContextProvider = ({ children }) => {
  const [mainState, setMainState] = useState(initialMainState);

  return (
    <MainContext.Provider value={{ mainState, setMainState }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => React.useContext(MainContext);
