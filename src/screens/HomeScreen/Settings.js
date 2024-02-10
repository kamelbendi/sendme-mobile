import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Loader from '../../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMainContext } from '../../store/MainContext';

const Settings = (props) => {
  const [loading, setLoading] = useState(false);
  const { mainState, setMainState } = useMainContext();

  const showConfirmationAlert = () => {
    setLoading(true);
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // Handle cancel action
            console.log('User canceled');
            setLoading(false);
          },
        },
        {
          text: 'LogOut',
          onPress: async () => {
            // Handle OK/confirm action
            console.log('User confirmed');
            await AsyncStorage.clear();
            props.navigation.navigate('main')
            setLoading(false);
            // Call your function or perform the action here
            // Example: performAction();
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={showConfirmationAlert}>
              <Text style={styles.buttonTextStyle}>{mainState.language.logout}</Text>
            </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    alignContent: 'center',
  },
  closeButtonText: {
    color: 'white', // Customize the text color
    fontSize: 28,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  buttonStyle: {
    backgroundColor: '#43C6AC',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#43C6AC',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  }
});

export default Settings;
