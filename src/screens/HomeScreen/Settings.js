import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Loader from '../../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMainContext } from '../../store/MainContext';
import axios from 'axios';
import apiUrl from '../../../api-urls';


const Settings = (props) => {
  const [loading, setLoading] = useState(false);
  const { mainState, setMainState } = useMainContext();

  const showLogOutConfirmationAlert = () => {
    setLoading(true);
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setLoading(false);
          },
        },
        {
          text: 'LogOut',
          onPress: async () => {
            console.log('User confirmed');
            await AsyncStorage.clear();
            props.navigation.navigate('main')
            setLoading(false);
          },
        },
      ],
      { cancelable: true }
    );
  }

  const showDeleteConfirmationAlert = () => {
    setLoading(true);
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setLoading(false);
          },
        },
        {
          text: 'Delete',
          onPress: async () => {
            await axios.post(apiUrl.deleteaccount, {
              email: mainState.userDetails.email
            })
            .then(async res => {
              console.log(res.status)
              props.navigation.navigate('main')
              await AsyncStorage.clear();
            })
            .catch(() => {
              console.error('Error deleting account');
            });
            setLoading(false);
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <View>
        <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={showLogOutConfirmationAlert}>
                <Text heavy large style={styles.buttonTextStyle}>{mainState.language.logout}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={showDeleteConfirmationAlert}>
                <Text heavy large style={styles.buttonTextStyle}>{mainState.language.deleteAccount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
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
