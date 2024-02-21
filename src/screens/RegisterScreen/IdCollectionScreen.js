import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import { useMainContext } from '../../store/MainContext';

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

  const pickImageFromGallery = () => {
    const options = {
      title: 'Select ID Document Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setMainState({...mainState, userDetails: {...mainState.userDetails, idUri:response.uri}});
        props.navigation.navigate('SetUpPINScreen');
      }
    });
  };

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
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default IdCollectionScreen;
