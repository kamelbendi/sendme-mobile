// TransactionSuccessScreen.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';

const TransactionNotificationHandler = ({ onClose, isSuccessful }) => {
  return (
    <View style={styles.container}>
      <Text heavy large center>Transaction Successful!</Text>
      <TouchableOpacity onPress={onClose} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#43C6AC',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionNotificationHandler;
