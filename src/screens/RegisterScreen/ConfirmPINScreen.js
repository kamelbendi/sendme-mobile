import React, { useState } from 'react';
import PinComponent from '../../components/PinComponent';
import { useMainContext } from '../../store/MainContext';

import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';
import axios from 'axios';

const ConfirmPINScreen = (props) => {
    const { mainState, setMainState } = useMainContext();
    const [loading, setLoading] = useState(false);
    const setUpPin = async (pin) => {
        if (pin === mainState.userDetails.pin) {
            // signin && register
            var dataToSend = {
                name: mainState.userDetails.name,
                surname: mainState.userDetails.surname,
                username: mainState.userDetails.username,
                email: mainState.userDetails.email,
                password: mainState.userDetails.password,
                pin: mainState.userDetails.pin,
                phone: mainState.userDetails.phone,
                idUri: mainState.userDetails.idUri
            };
            console.log(dataToSend);

            setLoading(true);
            try {  
                // register
                await axios.post(apiUrl.register, {
                    name: mainState.userDetails.name,
                    surname: mainState.userDetails.surname,
                    username: mainState.userDetails.username,
                    email: mainState.userDetails.email,
                    password: mainState.userDetails.password,
                    pin: mainState.userDetails.pin,
                    phone: mainState.userDetails.phone,
                    iduri: mainState.userDetails.idUri
                })
                    .then(res => {
                        setLoading(false);
                        props.navigation.navigate('SuccessfulRegistration');
                    })
                    .catch((err) => {
                        setLoading(false);
                        alert('unable to register:' + err);
                    });
            } catch {
                alert('Error registering');
                props.navigation.navigate('Dashboard');
            }

        }
    }

        return (
            <>
                {loading && <Loader loading={loading} />}
                <PinComponent
                    setUpPin={setUpPin}
                    title={mainState.language.sendme}
                    headerText='Confirm your PIN code'
                    underInputText={mainState.language.fillPinCode}
                />
            </>
        )
};

export default ConfirmPINScreen;
