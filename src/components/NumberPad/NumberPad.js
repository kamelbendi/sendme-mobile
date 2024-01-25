// NumberPad.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Text from '../Text';

const NumberPad = ({ onAdd, onDelete, onConfirm }) => {
  const renderNumberButton = (number) => (
    <TouchableOpacity
      key={number}
      style={styles.button}
      onPress={() => onAdd(number)}
    >
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderNumberButton(1)}
        {renderNumberButton(2)}
        {renderNumberButton(3)}
      </View>
      <View style={styles.row}>
        {renderNumberButton(4)}
        {renderNumberButton(5)}
        {renderNumberButton(6)}
      </View>
      <View style={styles.row}>
        {renderNumberButton(7)}
        {renderNumberButton(8)}
        {renderNumberButton(9)}
      </View>
      <View style={styles.row}>
        <View style={styles.confirmButton}>
        </View>
        {renderNumberButton(0)}
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Icon name="backspace" type="material" color="#333" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    padding: 40,
    backgroundColor: '#1e1e1e'
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#43C6AC',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e1e1e',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#DBDBDB',
  },
});

export default NumberPad;
