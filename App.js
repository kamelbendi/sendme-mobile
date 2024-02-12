import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen/MainScreen';
import { MainContextProvider } from './src/store/MainContext';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import TransferScreen from './src/screens/HomeScreen/TransferScreen';
import ScanQrScreen from './src/screens/HomeScreen/ScanQrScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './src/screens/HomeScreen/Settings';
import CreditCardScreen from './src/screens/HomeScreen/CreditCardScreen';

export default function App() {
  const AppStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: true,
    style: {
      backgroundColor: '#1e1e1e',
      borderTopColor: '#1e1e1e',
      paddingBottom: 32
    }
  }

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({focused}) => {
      let icon = "";
      const color = focused ? "#559dff" : "#828282";
      const size = 24;

      switch (route.name) {
        case "Send":
          icon = "send";
          break;
        case "Scan":
          icon = "qr-code-scanner";
          break;
        case "Settings":
          icon = "settings";
          break;
        case "Credit":
          icon = "credit-card";
          break;
        default:
            icon = "dashboard";
      }
      
      return <MaterialIcons name={icon} size={size} color={color} />
    },
    tabBarStyle: {
      backgroundColor: '#1e1e1e',
      borderTopColor: '#1e1e1e',
      paddingBottom: 32
    }
  })
  

  const TabStackScreens = () => {
    return (
      <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Send" component={TransferScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Scan" component={ScanQrScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Credit" component={CreditCardScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  return (
    <MainContextProvider>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName='main'>
          <AppStack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="Dashboard" component={TabStackScreens} options={{ headerShown: false }} />
        </AppStack.Navigator>
      </NavigationContainer>
    </MainContextProvider>
  );
}
