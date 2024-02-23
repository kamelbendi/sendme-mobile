import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useMainContext } from '../../store/MainContext';
import Text from '../../components/Text';
import * as ImagePicker from 'expo-image-picker';

const IdCollectionScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setMainState({...mainState, userDetails: {...mainState.userDetails, idUri:data.uri}});
      props.navigation.navigate('SetUpPINScreen');
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && !result.canceled) {
      setMainState({...mainState, userDetails: {...mainState.userDetails, idUri:result.uri}});
      props.navigation.navigate('SetUpPINScreen');
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {mainState.userDetails.idUri ? (
          <Image source={{ uri: mainState.userDetails.idUri }} style={styles.previewImage} />
        ) : (
          <RNCamera
            ref={cameraRef}
            style={styles.cameraPreview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text heavy large style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
          <Text heavy large style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#43C6AC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default IdCollectionScreen;
