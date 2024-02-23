import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useMainContext } from '../../store/MainContext';
import Text from '../../components/Text';

const FaceIDCollectionScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const [biometricData, setBiometricData] = useState(null);

  const handleBiometricAuthentication = async () => {
    // try {
    //   const {available, biometryType} = await Biometrics.isSensorAvailable();
    //   if (biometryType === Biometrics.BiometryTypes.FaceID && available) {
  
    //     const { success, biometric } = await Biometrics.simplePrompt({
    //       promptMessage: 'Authenticate using Face ID',
    //       cancelButtonText: 'Cancel',
    //     });
  
    //     if (success) {
    //       // Biometric authentication successful
    //       setMainState({...mainState, userDetails: {...mainState.userDetails, biometric}});
    //     } else {
    //       // Biometric authentication failed or was canceled
    //       Alert.alert(
    //         'Attention',
    //         'Biometric authentication failed or canceled',
    //         [
    //           {
    //             text: 'Skip',
    //             style: 'cancel',
    //             onPress: () => {
    //               props.navigation.navigate('IdCollectionScreen')
    //             },
    //           },
    //           {
    //             text: 'Try Again',
    //             onPress: async () => {
    //               await handleBiometricAuthentication();
    //             },
    //           },
    //         ],
    //         { cancelable: true }
    //       );
          
    //     }
    //   } else {
    //     alert('Unable to use FaceID for authentication');
    //   }
    // } catch (error) {
    //     
    //     console.error('Error during biometric authentication:', error);
    // }
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: true // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }
    try {
      const biometryType = await TouchID.isSupported(optionalConfigObject);
      if (biometryType === 'FaceID') {
        setBiometricData('FaceID');
      } else {
        setBiometricData('TouchID');
      }
    } catch (err) {
      console.error('Error during biometric authentication:', err);
    }
  };

  const handleSkipAuthentication = () => {
    props.navigation.navigate('IdCollectionScreen');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
      <Text heavy large>Biometric Data: {biometricData}</Text>
      <TouchableOpacity onPress={handleBiometricAuthentication} style={styles.button}>
        <Text heavy large>Authenticate with Face ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSkipAuthentication}>
        <Text heavy large padding={'20px'}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#43C6AC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 300,
    height: 50,
    marginTop: 40
  }
});

export default FaceIDCollectionScreen;

