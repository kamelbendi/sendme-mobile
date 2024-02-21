import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from './Text';


const QRCodeScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { onQRCodeScan } = props.route.params;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onQRCodeScan(data);
  };

  if (hasPermission === null) {
    return <Text style={{color: 'white', fontSize: 50}}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{color: 'white', fontSize: 50}}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} >
          <Text>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.navigate('Dashboard')}>
          <Text style={styles.closeButtonText} >X</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
    marginTop: 80,
    marginLeft: 40,
    border: 10,
    borderColor: 'white',
    
  },
  closeButtonText: {
    color: 'grey',
    fontSize: 50,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
});
export default QRCodeScannerScreen;
