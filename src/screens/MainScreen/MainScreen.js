import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import LoginExistingScreen from '../LoginExistingScreen/LoginExistingScreen';
import { useMainContext } from '../../store/MainContext';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';
import AddressVerificationScreen from '../RegisterScreen/AddressVerificationScreen';
import PhoneRequestScreen from '../RegisterScreen/PhoneRequestScreen';
import PhoneVerificationScreen from '../RegisterScreen/PhoneVerificationScreen';
import SetUpPINScreen from '../RegisterScreen/SetUpPINScreen';
import ConfirmPINScreen from '../RegisterScreen/ConfirmPINScreen';
import SuccessfulRegistration from '../RegisterScreen/SuccessfulRegistration';
import { NavigationContainer } from '@react-navigation/native';
import FaceIDCollectionScreen from '../RegisterScreen/FaceIDCollectionScreen';
import IdCollectionScreen from '../RegisterScreen/IdCollectionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_NAME } from '../../store/user-details';
import axios from 'axios';
import apiUrl from '../../../api-urls';

const MainScreen = ({ navigation }) => {
  const { mainState, setMainState } = useMainContext();
  const AppStack = createStackNavigator();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem(LOCAL_STORAGE_NAME);
        // Check if userDetailsString is a valid JSON string
        if (userDetailsString) {
          const parsedUserDetails = JSON.parse(userDetailsString);
          
          // Check if parsedUserDetails is an object
          if (parsedUserDetails && typeof parsedUserDetails === 'string') {
            await axios.post(apiUrl.user, {
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
    fetchUserDetails();
  }, []);

  return (
    <AppStack.Navigator>
      {
        mainState.userExists ?
          <AppStack.Screen name="LoginExistingScreen" component={LoginExistingScreen} options={{ headerShown: false }} />
          : <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      }
      <AppStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="AddressVerificationScreen" component={AddressVerificationScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="PhoneRequestScreen" component={PhoneRequestScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="FaceIDCollectionScreen" component={FaceIDCollectionScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="IdCollectionScreen" component={IdCollectionScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="SetUpPINScreen" component={SetUpPINScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="ConfirmPINScreen" component={ConfirmPINScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="SuccessfulRegistration" component={SuccessfulRegistration} options={{ headerShown: false }} />

    </AppStack.Navigator>
  )
};

MainScreen.propTypes = {
  // bla: PropTypes.string,
};

MainScreen.defaultProps = {
  // bla: 'test',
};

export default MainScreen;
