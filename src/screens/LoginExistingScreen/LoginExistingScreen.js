import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import PinComponent from '../../components/PinComponent';
import Loader from '../../components/Loader';
import { useMainContext } from '../../store/MainContext';
import axios from 'axios';
import apiUrl from '../../../api-urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_NAME } from '../../store/user-details';

const LoginExistingScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const { mainState, setMainState } = useMainContext();
  const setUpPin = async (pin) => {
    setLoading(true);
    const email = await AsyncStorage.getItem(LOCAL_STORAGE_NAME);

    emailToUse = JSON.parse(email);
    if (emailToUse && typeof emailToUse === 'string') {
      await axios.post(apiUrl.pinlogin, {
        email: emailToUse,
        pin: pin
      })
      .then(res => {
        setLoading(false);
        setMainState({...mainState, userDetails: {...mainState.userDetails, token: res.data.token}});
        props.navigation.replace('Dashboard');
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
        alert('Incorrect pin or API error');
      });
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <PinComponent
        setUpPin={setUpPin}
        title={mainState.language.sendme}
        underInputText={mainState.language.loginWithYourPin}
      />
    </>
)
};

LoginExistingScreen.propTypes = {
  // bla: PropTypes.string,
};

LoginExistingScreen.defaultProps = {
  // bla: 'test',
};

export default LoginExistingScreen;
