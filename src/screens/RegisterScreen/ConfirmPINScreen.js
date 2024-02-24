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

            setLoading(true);
            await axios.post(apiUrl.register, dataToSend)
                .then(res => {
                    setLoading(false);
                    props.navigation.navigate('RegistrationSuccessful');
                })
                .catch((err) => {
                    setLoading(false);
                    alert('unable to register:' + err);
                });

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
