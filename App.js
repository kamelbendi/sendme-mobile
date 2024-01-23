import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import MainScreen from './src/screens/MainScreen/MainScreen';
import { MainContextProvider } from './src/store/MainContext';
import english from './src/languages/English';
import { LOCAL_STORAGE_NAME } from './src/store/user-details';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';

export default function App() {
  const AppStack = createStackNavigator();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <MainContextProvider>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName='main'>
          <AppStack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
        </AppStack.Navigator>
      </NavigationContainer>
    </MainContextProvider>
  );
}