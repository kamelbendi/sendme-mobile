import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import LoginExistingScreen from '../LoginExistingScreen/LoginExistingScreen';
import { useMainContext } from '../../store/MainContext';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';

//import { MainScreenWrapper } from './MainScreen.styles';

const MainScreen = ({ navigation }) => {
  const { mainState, setMainState } = useMainContext();
  const AppStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  
  return (
    <AppStack.Navigator>
      {
        mainState.isLoggedIn ?
          <AppStack.Screen name="PIN" component={LoginExistingScreen} />
          : <AppStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      }
      <AppStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
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
