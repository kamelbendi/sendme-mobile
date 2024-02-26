import React, { useState } from 'react';
import PinComponent from '../../components/PinComponent';
import { useMainContext } from '../../store/MainContext';

import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';
import XButton from '../../components/XButton';
import { View } from 'react-native';
import { getBalance, getTransactions } from '../HomeScreen/HomeScreen';
import axios from 'axios';

const ConfirmTransactionPINScreen = (props) => {
    const { mainState, setMainState } = useMainContext();
    const [loading, setLoading] = useState(false);
    const sendTransactionData = props.route.params.sendTransactionData;

    const setUpPin = async (pin) => {
            console.log(sendTransactionData);
            setLoading(true);
            try {
                await axios.post(apiUrl.transfer, {
                    username_receiver: sendTransactionData.username_receiver,
                    amount: sendTransactionData.amount,
                    pin: pin,
                    username_sender: sendTransactionData.username_sender
                })
                    .then(res => {
                    setLoading(false);
                    props.navigation.navigate('SuccessfulTransfer');
                    getBalance(mainState, setMainState);
                    getTransactions(mainState, setMainState);
                    })
                    .catch((err) => {
                        setLoading(false);
                        alert('Error transferring ' + err);
                        props.navigation.navigate('Dashboard');
                    })
                  
            } catch {
                alert('Error transferring');
                props.navigation.navigate('Dashboard');
            }
        
    }

        return (
            <View style={{}}>
                {/* <XButton navigation={props.navigation} screen={'Dashboard'} />
                <Loader loading={loading} /> */}
                {/* <XButton navigation={props.navigation} screen={'Dashboard'} style={{position: 'absolute', top: 10, left: 10 }} /> */}
                {loading && <Loader loading={loading} />}
                <PinComponent
                    setUpPin={setUpPin}
                    title={mainState.language.sendme}
                    headerText='Provide PIN To Confirm Transaction'
                    underInputText={mainState.language.fillPinCode}
                />
            </View>
        )
};

export default ConfirmTransactionPINScreen;
