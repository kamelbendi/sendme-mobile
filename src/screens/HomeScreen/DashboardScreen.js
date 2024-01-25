import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import TransferScreen from './TransferScreen';
import ScanQrScreen from './ScanQrScreen';
import Text from '../../components/Text';
import HomeScreen from './HomeScreen';

const DashboardScreen = (props) => {
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
      const color = focused ? "#43C6AC" : "#828282";
      const size = 24;

      switch (route.name) {
        case "TransferScreen":
          icon = "";
          break;
        case "ScanQrScreen":
          icon = "";
          break;
        default:
            icon = "dashboard";
            break;
      }
      
      return <MaterialIcons name={icon} size={size} color={color} />
    }

  })
  

  const TabStackScreens = () => {
    return (
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Home" component={HomeScreen} screenOptions={screenOptions} options={{ headerShown: false }} />
        <Tab.Screen name="Send" component={TransferScreen} screenOptions={screenOptions} options={{ headerShown: false }} />
        <Tab.Screen name="Scan" component={ScanQrScreen} screenOptions={screenOptions} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }
  return TabStackScreens();
};

export default DashboardScreen;
