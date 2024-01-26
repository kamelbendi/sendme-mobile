import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import StyledText from '../../components/Text';
import { useMainContext } from '../../store/MainContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { phoneNumberValidation } from '../../helpers/PhoneNumberValidation';
import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';
import axios from 'axios';
//import * as styles from './LoginExistingScreen.styles';
//import { LoginExistingScreenWrapper } from './LoginExistingScreen.styles';

const PhoneRequestScreen = (props) => {
    const {mainState, setMainState } = useMainContext();
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangePhone = (phone) => {
        const truncatedText = phone.slice(0, 9);
        setInputPhoneNumber(truncatedText);
    }

    const sendSMS = () => {
        if (!inputPhoneNumber || !phoneNumberValidation(inputPhoneNumber, 9)) {
            alert('Enter a valid phone number');
            return;
        }

        setLoading(true);
        setMainState({...mainState, phone: inputPhoneNumber});
        
        axios.post(apiUrl.getSMS, {
            phone: '+48' + inputPhoneNumber
        })
            .then(res => {
                setLoading(false);
                props.navigation.navigate('PhoneVerificationScreen');
                setMainState({...mainState, userDetails: {...mainState.userDetails, phone: '+48' + inputPhoneNumber}})
                
                
            })
            .catch(() => {
                setLoading(false);
                alert('Impossible to send code to this number');
                return;
            })
    }

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                }}>
                <Loader loading={loading} />
                <KeyboardAvoidingView
                    enabled
                    keyboardVerticalOffset={50}
                    style={styles.containerAvoiddingView}
                >
                    <StyledText heavy large center style={styles.textTitle}>{mainState.language.phoneNumberRequest}</StyledText>
                    <View style={styles.containerInput}>
                        <StyledText heavy large>{"+48 |"}</StyledText>
                        <TextInput
                            placeholder='920 291 011'
                            value={inputPhoneNumber}
                            maxLength={9}
                            keyboardType='numeric'
                            onChangeText={onChangePhone}
                            style={styles.phoneInput}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={sendSMS}>
                        <Text style={styles.buttonTextStyle}>{mainState.language.confirmWithSMS}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
    },
    containerAvoiddingView: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    textTitle: {
        marginBottom: 50,
        marginTop: 100,
    },
    containerInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#DBDBDB',
        marginBottom: 30
    },
    openDialogueView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneInput: {
        color: '#DBDBDB',
        fontFamily: "Avenir",
        fontSize: 18,
        flex: 1,
        height: 50,
        marginLeft: 5
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
      marginBottom: 50,
      width: 320 // to change
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default PhoneRequestScreen;
