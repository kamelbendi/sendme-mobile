
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import StyledText from '../../components/Text';
import Loader from '../../components/Loader';
import BoxFrameImageText from '../../components/BoxFrameImageText';
import apiUrl from '../../../api-urls';
import { useMainContext } from '../../store/MainContext';
import XButton from '../../components/XButton';
import emailValidation from '../../helpers/EmailValidation';

const RegisterScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    isEmailDirty: false,
    isPasswordDirty: false,
    isNameDirty: false,
    isSurnameDirty: false,
    isUserNameDirty: false,

    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errortext, setErrortext] = useState('');

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!form.name) {
      alert('Please fill Name');
      return;
    }
    if (!form.surname) {
      alert('Please fill Surname');
      return;
    }
    if (!form.username) {
      alert('Please fill Userame');
      return;
    }
    if (!form.email) {
      alert('Please fill Email');
      return;
    }
    if (!emailValidation(form.email)) {
      alert('Invalid email');
      return;
    }
    if (!form.email) {
      alert('Please fill Password');
      return;
    }
    if (!form.confirmPassword) {
      alert('Please confirm Password');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    //Show Loader
    setLoading(true);
    setMainState({
      ...mainState,
      userDetails: {
        name: form.name,
        surname: form.surname,
        username: form.username,
        email: form.email,
        password: form.password
      }
    });
    props.navigation.navigate('PhoneRequestScreen');
    setLoading(false);
  };

  const goToWelcomeScreen = () => {
    console.log('heee')
    props.navigation.navigate('WelcomeScreen');
  }

  return (
    <View style={{flex: 1, backgroundColor: '#1e1e1e'}}>
      <XButton onPress={goToWelcomeScreen}></XButton>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{marginTop: 100}}>
          <StyledText title heavy center>{mainState.language.registrationText}</StyledText>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(surname) => setForm({...form, surname})}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterSurname}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(name) => setForm({...form, name})}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterName}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(username) => setForm({...form, username})}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterUsername}
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setForm({...form, email})}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterEmail}
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => setForm({...form, password})
              }
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterPassword}
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(confirmPassword) => setForm({...form, confirmPassword})}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.confirmPassword}
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
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
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>{mainState.language.next}</Text>
          </TouchableOpacity>
          <View style={{marginBottom: 40}}>
            <Text style={styles.registerTextStyle} onPress={() => props.navigation.navigate('LoginScreen')}>{mainState.language.accountExistsLogin}</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});