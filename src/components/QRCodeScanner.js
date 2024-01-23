import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScannerComponent = () => {
  const onRead = (e) => {
    // Handle the QR code data
    console.log('QR Code Data:', e.data);
  };

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={onRead}
        reactivate={true}
        reactivateTimeout={2000}
        showMarker={true}
      />
    </View>
  );
};

export default QRCodeScannerComponent;
