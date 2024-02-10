import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const XButton = (props) => {

  return (
      <TouchableOpacity onPress={goToWelcomeScreen} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // Other styling for your component
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 10,
    backgroundColor: 'transparent', // Make the button background transparent
  },
  closeButtonText: {
    color: 'white', // Customize the text color
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default XButton;
