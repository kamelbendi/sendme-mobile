import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import NumberPad from '../../components/NumberPad/NumberPad';
import Text from '../../components/Text';
import { TextInput } from 'react-native-gesture-handler';
import { useMainContext } from '../../store/MainContext';

const TransferScreen = (props) => {
  const [recipient, setRecipient] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('0');
  const recipientInputRef = createRef();
  const { mainState, setMainState } = useMainContext();

  const handleNumberPress = (number) => {
    if (selectedAmount === '0') {
      setSelectedAmount(number.toString());
    } else {
      setSelectedAmount((prevAmount) => prevAmount + number.toString());
    }
  }

  const handleCommaPressed = () => {
    if (!selectedAmount.includes('.')) {
      setSelectedAmount((prevAmount) => prevAmount + '.');
    }
  }

  const handleDeletePress = () => {
    setSelectedAmount((prevAmount) => (prevAmount.length > 1 ? prevAmount.slice(0, -1) : '0'));
  }

  const handleRecipient = (recipient) => {
    setRecipient(recipient);
  }

  const handleTransferPressed = async () => {
  }

  useEffect(() => {
    recipientInputRef.current.focus();
  } ,[]);

  return (
    <View style={styles.container}>
      <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(recipient) => handleRecipient(recipient)}
              ref={recipientInputRef}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterUsername}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              onSubmitEditing={() =>
                nameInputRef.current && nameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount} center title heavy>${parseFloat(selectedAmount).toFixed(2)}</Text>
      </View>
      <NumberPad
          onAdd={handleNumberPress}
          onDelete={handleDeletePress}
          onComma={handleCommaPressed}
        />
      <TouchableOpacity
          style={styles.button}
          onPress={handleTransferPressed}
        >
        <Text center bold large>{mainState.language.transfer}</Text>
      </TouchableOpacity>
    </View>
  )
};

export default TransferScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#43C6AC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 300,
    height: 50,
    marginTop: 40
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    padding: 16,
  },
  balanceContainer: {
    marginBottom: 80,
    marginTop: 30
  },
  balanceText: {
    fontSize: 16,
    marginRight: 8,
  },
});
