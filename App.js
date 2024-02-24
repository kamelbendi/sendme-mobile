import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen/MainScreen';
import { MainContextProvider } from './src/store/MainContext';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import TransferScreen from './src/screens/HomeScreen/TransferScreen';
import QrScreen from './src/screens/HomeScreen/QrScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './src/screens/HomeScreen/Settings';
import CreditCardScreen from './src/screens/HomeScreen/CreditCardScreen';
import SuccessfulTransfer from './src/screens/RegisterScreen/SuccessfulTransfer';
import QRCodeScannerScreen from './src/components/QRCodeScanner';
import ConfirmTransactionPINScreen from './src/screens/RegisterScreen/ConfirmTransactionPINScreen';

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
        case "Transfer":
          icon = "send";
          break;
        case "QR code":
          icon = "qr-code";
          break;
        case "Settings":
          icon = "settings";
          break;
        case "Credit card":
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
        <Tab.Screen name="Transfer" component={TransferScreen} options={{ headerShown: false }} />
        <Tab.Screen name="QR code" component={QrScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Credit card" component={CreditCardScreen} options={{ headerShown: false }} />
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
          <AppStack.Screen name="SuccessfulTransfer" component={SuccessfulTransfer} options={{ headerShown: false }} />
          <AppStack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="ConfirmTransactionPinScreen" component={ConfirmTransactionPINScreen} options={{ headerShown: false }} />
        </AppStack.Navigator>
      </NavigationContainer>
    </MainContextProvider>
  );
}
