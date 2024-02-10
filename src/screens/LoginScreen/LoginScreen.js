import React, {useState, createRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';


import Loader from '../../components/Loader';
import apiUrl from '../../../api-urls';
import { useMainContext } from '../../store/MainContext';
import StyledText from '../../components/Text';
import XButton from '../../components/XButton';
import axios from 'axios';
import { LOCAL_STORAGE_NAME } from '../../store/user-details';

const saveToLocalStorage = async (details) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(details));
}

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { mainState, setMainState } = useMainContext();

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    setErrortext('');
    if (!userEmail) {
      alert(mainState.language.fillEmail);
      return;
    }
    if (!userPassword) {
      alert(mainState.language.fillPassword);
      return;
    }
    setLoading(true);

    // Update the user details in the state
    setMainState((prevMainState) => ({
      ...prevMainState,
      userDetails: {
        ...prevMainState.userDetails,
        email: userEmail,
      },
    }));

    try {
      const response = await axios.post(apiUrl.login, {
        email: userEmail,
        password: userPassword,
      });

      // If server response message is successful
      if (response.status === 200) {
        // Update the user details in the state
        setMainState((prevMainState) => ({
          ...prevMainState,
          userDetails: {
            ...prevMainState.userDetails,
            token: response.data.token,
          },
        }));

        // Save the updated user details to local storage
        await saveToLocalStorage(userEmail);

        // Navigate to the Dashboard
        navigation.replace('Dashboard');
      } else {
        alert('No such user or incorrect password, please try again');
        console.log('Please check your email id or password');
      }
    } catch (error) {
      console.error(error);
      alert('Incorrect credentials, please try again');
    } finally {
      // Hide Loader
      setLoading(false);
    }
  };

  const goToWelcomeScreen = () => {
    navigation.navigate('WelcomeScreen');
  }

  return (
    <View style={styles.mainBody}>
      <TouchableOpacity onPress={goToWelcomeScreen} style={styles.closeButton} activeOpacity={0.5}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <StyledText title heavy>{mainState.language.signIn}</StyledText>
            </View>
            
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder={mainState.language.enterEmail}
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder={mainState.language.enterPassword}
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>{mainState.language.signIn}</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              {mainState.language.newHereRegister}
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  closeButton: {
    position: 'relative',
    backgroundColor: 'transparent',
    marginTop: 90,
    marginLeft: 20,
    flexDirection: 'column',
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
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});