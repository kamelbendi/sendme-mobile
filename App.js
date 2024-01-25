import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen/MainScreen';
import { MainContextProvider } from './src/store/MainContext';

export default function App() {
  const AppStack = createStackNavigator();
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