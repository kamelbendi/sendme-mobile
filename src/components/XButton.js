import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const XButton = ({ navigation }) => {
  const goToWelcomeScreen = () => {
    navigation.navigate('WelcomeScreen');
  };

  return (
    <TouchableOpacity onPress={goToWelcomeScreen} style={styles.closeButton} activeOpacity={0.5}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>
  );
};

const styles = {
  closeButton: {
    position: 'relative',
    backgroundColor: 'transparent',
    marginTop: 90,
    marginLeft: 20,
    flexDirection: 'column',
  },
  closeButtonText: {
    color: 'white', // Customize the text color
    fontSize: 28,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
};

export default XButton;
