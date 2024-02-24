import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';
import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';
import axios from 'axios';
import { phoneNumberValidation } from '../../helpers/PhoneNumberValidation';
import XButton from '../../components/XButton';
//import * as styles from './LoginExistingScreen.styles';
//import { LoginExistingScreenWrapper } from './LoginExistingScreen.styles';

const PhoneVerificationScreen = (props) => {
    const { mainState, setMainState } = useMainContext();
    const [loading, setLoading] = useState(false);
    const [inputCode, setInputCode] = useState('');

    function onChangeCode (code) {
        const truncatedText = code.slice(0, 6);
        setInputCode(truncatedText);
    }

    async function verifyCode () {
        if (!inputCode || !phoneNumberValidation(inputCode, 6)) {
            alert('Enter a valid phone number');
            return;
        }

        setLoading(true);
        await axios.post(apiUrl.verifySMS, {
            phone: mainState.userDetails.phone,
            code: inputCode,
        })
            .then(res => {
                setLoading(false);
                props.navigation.navigate('IdCollectionScreen');
            })
            .catch(() => {
                setLoading(false);
                alert('failed to verify');
            })
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading}></Loader>
            <XButton navigation={props.navigation} screen={'RegisterScreen'}/>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                }}
            >
                <KeyboardAvoidingView
                    enabled
                    keyboardVerticalOffset={50}
                    style={styles.containerAvoiddingView}
                >
                    <Text heavy large center style={styles.textTitle}>{mainState.language.confirmSMSCode}</Text>
                    <View style={styles.containerInput}>
                        <TextInput
                            value={inputCode}
                            maxLength={6}
                            keyboardType='numeric'
                            onChangeText={onChangeCode}
                            style={styles.codeInput}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={verifyCode}>
                        <Text heavy style={styles.buttonTextStyle}>{mainState.language.verify}</Text>
                    </TouchableOpacity>
                    <View style={{marginBottom: 40}}>
                        <Text style={styles.registerTextStyle} onPress={() => props.navigation.navigate('PhoneRequestScreen')}>{mainState.language.sendSMSAgain}</Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        //paddingVertical: 10,
        fontSize: 16,
        paddingTop: 10
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
    codeInput: {
        color: '#DBDBDB',
        fontFamily: "Avenir",
        fontSize: 18,
        flex: 1,
        height: 50,
        marginLeft: 5
    },
})
