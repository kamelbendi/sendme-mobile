import React from 'react';
import PinComponent from '../../components/PinComponent';
import { useMainContext } from '../../store/MainContext';

const SetUpPINScreen = (props) => {
    const { mainState, setMainState } = useMainContext();

    const setUpPin = (pin) => {
        setMainState({...mainState, userDetails: {...mainState.userDetails, pin: pin}});
        props.navigation.navigate('ConfirmPINScreen');
    }

    return (
        <PinComponent
            setUpPin={setUpPin}
            title={mainState.language.sendme}
            headerText={mainState.language.setUpPin}
            underInputText={mainState.language.fillPinCode}
        />
    )
};

export default SetUpPINScreen;
