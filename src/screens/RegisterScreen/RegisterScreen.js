
// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
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
import fieldValidation from '../../helpers/FieldValidation';
import usernameValidation from '../../helpers/UserNameValidation';
import axios from 'axios';
import passwordValidation from '../../helpers/PasswordValidation';

const RegisterScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    isEmailDirty: false,
    isEmailUnique: false,
    isPasswordDirty: false,
    isNameDirty: false,
    isSurnameDirty: false,
    isUserNameDirty: false,
    isUsernameUnique: false,

    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorSurnameText, setErrorSurnameText] = useState('');
  const [errorNameText, setErrorNameText] = useState('');
  const [errorUsernameText, setErrorUsernameText] = useState('');
  const [errorUsernameDUnique, setErrorUsernameUnique] = useState('');
  const [errorEmailText, setErrorEmailText] = useState('');
  const [errorEmailUnique, setErrorEmailUnique] = useState('');
  const [errorPasswordText, setErrorPasswordText] = useState('');
  const [errorConfirmPasswordText, setErrorConfirmPasswordText] = useState('');

  const nameInputRef = createRef();
  const surnameInputRef = createRef();
  const usernameInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = async () => {
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

    if (!form.isUsernameUnique) {
      alert('username not unique, try again');
      return;
    }

    if (!form.isEmailUnique) {
      alert('Email not unique, try again');
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
    props.navigation.navigate('WelcomeScreen');
  }

  const handleSurnameInput = (surname) => {
    setForm({...form, surname, isSurnameDirty: fieldValidation(surname)});
    
    if (!fieldValidation(surname)) {
      setErrorSurnameText('Not a valid surname')
    } else {
      setErrorSurnameText('')
    }
  }

  const handleNameInput = (name) => {
    setForm({...form, name, isNameDirty: fieldValidation(name)});
    
    if (!fieldValidation(name)) {
      setErrorNameText('Not a valid Name')
    } else {
      setErrorNameText('')
    }
  }
// username --------------------------------------------
  const handleUsernameInput = async (username) => {

    setForm((prevForm) => ({
      ...prevForm,
      username: username,
      isUserNameDirty: usernameValidation(username),
    }));

    if (!usernameValidation(username)) {
      setErrorUsernameText('Not a valid Username');
      setErrorUsernameUnique('');
      return;
    }
    
    setErrorUsernameText('');
    const isUsernameUnique = await isUsernameUniqueFunc(username);
    setForm((prevForm) => ({
      ...prevForm,
      isUsernameUnique: isUsernameUnique,
    }));
    if (!isUsernameUnique) {
      setErrorUsernameUnique('Username is not unique, choose a different one');
    } else {
      setErrorUsernameUnique('Username is unique');
    }
  }

  const isUsernameUniqueFunc = async (username) => {
    try {
      const response = await axios.post(apiUrl.checkUsername, { username: username });
      return response.data.unique; // This will be true if the username is unique, false otherwise
    } catch (error) {
      console.error('Error checking username:', error);
      // Handle the error appropriately
      return false; // Assuming non-unique in case of an error
    }
  }
  // email ------------------------------------------------------
  const handleEmailInput = async (email) => {
    setForm((prevForm) => ({
      ...prevForm,
      email: email,
      isEmailDirty: emailValidation(email),
    }));
    
    if (!emailValidation(email)) {
      setErrorEmailText('Not a valid Email');
      setErrorEmailUnique('');
      return;
    }
    
    setErrorEmailText('');
    const isEmailUnique = await isEmailUniqueFunc(email);
    setForm((prevForm) => ({
      ...prevForm, isEmailUnique}))
    if (!isEmailUnique) {
      setErrorEmailUnique('Email is not unique, choose a different one');
    } else {
      setErrorEmailUnique('Email is unique');
    }
  }

  const isEmailUniqueFunc = async (email) => {
    try {
      const response = await axios.post(apiUrl.checkEmail, { email: email });
      return response.data.unique; // This will be true if the email is unique, false otherwise
    } catch (error) {
      console.error('Error checking email:', error);
      // Handle the error appropriately
      return false; // Assuming non-unique in case of an error
    }
  }
  // password ------------------------

  const handlePasswordInput = async (password) => {
    setForm({...form, password, isPasswordDirty: passwordValidation(password)});
    
    if (!passwordValidation(password)) {
      setErrorPasswordText('Not a valid Password')
    } else {
      setErrorPasswordText('')
    }
  }

  const handleConfirmPasswordInput = async (confirmPassword) => {
    setForm({...form, confirmPassword});

    if (form.password !== confirmPassword) {
      setErrorConfirmPasswordText('Passwords do not match')
    } else {
      setErrorConfirmPasswordText('')
    }
  }


  useEffect(() => {
    surnameInputRef.current && surnameInputRef.current.focus();
  }, [])

  return (
    <View style={{flex: 1, backgroundColor: '#1e1e1e'}}>
      <TouchableOpacity onPress={goToWelcomeScreen} style={styles.closeButton} activeOpacity={0.5}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
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
              onChangeText={(surname) => handleSurnameInput(surname)}
              ref={surnameInputRef}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterSurname}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                nameInputRef.current && nameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
            {errorSurnameText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorSurnameText}
            </Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(name) => handleNameInput(name)}
              ref={nameInputRef}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterName}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                usernameInputRef.current && usernameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
            {errorNameText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorNameText}
            </Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={async (username) => handleUsernameInput(username)}
              ref={usernameInputRef}
              placeholder={mainState.language.enterUsername}
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
            {errorUsernameText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorUsernameText}
            </Text>
          ) : null}
            {errorUsernameDUnique != '' ? (
            <Text style={form.isUsernameUnique ? styles.successTextStyle : styles.errorTextStyle}>
              {errorUsernameDUnique}
            </Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => handleEmailInput(email)}
              underlineColorAndroid="#f000"
              autoCapitalize="none"
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
          {errorEmailText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorEmailText}
            </Text>
          ) : null}
            {errorEmailUnique != '' ? (
            <Text style={form.isEmailUnique ? styles.successTextStyle : styles.errorTextStyle}>
              {errorEmailUnique}
            </Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => handlePasswordInput(password)
              }
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterPassword}
              autoCapitalize="none"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
              onSubmitEditing={() =>
                confirmPasswordInputRef.current &&
                confirmPasswordInputRef.current.focus()
              }
            />
          </View>
            {errorPasswordText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorPasswordText}
            </Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(confirmPassword) => handleConfirmPasswordInput(confirmPassword)}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.confirmPassword}
              placeholderTextColor="#8b9cb5"
              ref={confirmPasswordInputRef}
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
            {errorConfirmPasswordText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorConfirmPasswordText}
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
    color: 'green',
    textAlign: 'center',
    fontSize: 14,
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
});