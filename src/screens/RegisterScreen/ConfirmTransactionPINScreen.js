import React, { useState } from 'react';
import PinComponent from '../../components/PinComponent';
import { useMainContext } from '../../store/MainContext';

import apiUrl from '../../../api-urls';
import Loader from '../../components/Loader';
import XButton from '../../components/XButton';

const ConfirmTransactionPINScreen = (props) => {
    const { mainState, setMainState } = useMainContext();
    const [loading, setLoading] = useState(false);
    const { sendTransaction } = props.route.params;
    const setUpPin = async (pin) => {
        if (pin === mainState.userDetails.pin) {
            try {
                sendTransaction();
            } catch {
                alert('Error transferring');
                props.navigation.navigate('Dashboard');
            }
        }
    }

        return (
            <>
                {loading && <Loader loading={loading} />}
                <XButton navigation={props.navigation} screen={'Dashboard'} />
                <PinComponent
                    setUpPin={setUpPin}
                    title={mainState.language.sendme}
                    headerText='Provide PIN To Confirm Transaction'
                    underInputText={mainState.language.fillPinCode}
                />
            </>
        )
};

export default ConfirmTransactionPINScreen;
