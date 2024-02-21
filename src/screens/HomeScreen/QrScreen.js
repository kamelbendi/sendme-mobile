import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useMainContext } from '../../store/MainContext';
import Text from '../../components/Text';

const QrScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
        <Text heavy large style={{ marginBottom: 40 }}>Username: {mainState.userDetails.username}</Text>
        <QRCode
          value={mainState.userDetails.username}
          size={200}
          color="white"
          backgroundColor="#1e1e1e"
        />
      </View>
  )
};

export default QrScreen;
