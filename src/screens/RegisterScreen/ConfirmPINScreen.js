import React, { useState } from 'react';
import PinComponent from '../../components/PinComponent';
import { useMainContext } from '../../store/MainContext';

import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';

const ConfirmPINScreen = (props) => {
    const { mainState, setMainState } = useMainContext();
    const [loading, setLoading] = useState(false);
    const setUpPin = (pin) => {
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
            };

            setLoading(true);
            axios.post(apiUrl.register, dataToSend)
                .then(res => {
                    setLoading(false);
                    props.navigation.navigate('RegistrationSuccessful');
                })
                .catch(() => {
                    setLoading(false);
                    alert('unable to register');
                });

        }
    }

        return (
            <>
                {loading && <Loader loading={loading} />}
                <PinComponent
                    setUpPin={setUpPin}
                    title={mainState.language.sendme}
                    headerText={mainState.language.setUpPin}
                    underInputText={mainState.language.fillPinCode}
                />
            </>
        )
};

export default ConfirmPINScreen;
