import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import NumberPad from '../../components/NumberPad/NumberPad';
import Text from '../../components/Text';
import { TextInput } from 'react-native-gesture-handler';
import { useMainContext } from '../../store/MainContext';
//import { Notification } from 'react-native-notifications';
import Loader from '../../components/Loader';
import axios from 'axios';
import apiUrl from '../../../api-urls';
import { getBalance, getTransactions } from './HomeScreen';

const TransferScreen = (props) => {
  const [recipient, setRecipient] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('0');
  const recipientInputRef = createRef();
  const { mainState, setMainState } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [errorUsername, setErrorUsername] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);

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

  const handleRecipient = async (recipient) => {
    setRecipient(recipient);

    await axios.post(apiUrl.usernameexists, {
      username: recipient
    })
      .then((res) => {
        if (res.data.exists) {
          setErrorUsername('Username exists');
        } else {
          setErrorUsername('Username does not exist');
        }
        setUsernameExists(res.data.exists);
      })
      .catch(err => {
        setUsernameExists(false);
        setErrorUsername('Error checking username');
      })

  }

  const handleTransferPressed = async () => {
    if (selectedAmount === '0') {
      alert('Enter an amount');
      return;
    }
    if (!usernameExists) {
      alert('Enter a valid username');
      return;
    }
    setLoading(true);

    await axios.post(apiUrl.transfer, {
      username_sender: mainState.userDetails.username,
      username_receiver: recipient,
      amount: parseFloat(selectedAmount)
    })
      .then(res => {
        setLoading(false);
        alert('Transfer successful');
        getBalance(mainState, setMainState);
        getTransactions(mainState, setMainState);
        // Notification.localNotification({
        //   title: 'Transfer',
        //   body: `You have transferred ${selectedAmount} PLN to ${recipient}`,
        //   sound: 'default',
        //   silent: false,
        //   channelId: 'default-channel-id',
        // });
      })
      .catch((err) => {
        setLoading(false);
        alert('Error transferring' + err);
      })
  }

  useEffect(() => {
    recipientInputRef.current && recipientInputRef.current.focus();
    // Notification.createChannel({
    //   channelId: 'default-channel-id',
    //   channelName: 'Default channel',
    //   channelDescription: 'A default channel',
    //   soundName: 'default',
    //   importance: 4,
    //   vibrate: true,
    // });
  } ,[]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
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
        
            <Text style={usernameExists ? styles.successTextStyle : styles.errorTextStyle}>
              {errorUsername}
            </Text>
        <Text style={styles.balanceAmount} center title heavy>{parseFloat(selectedAmount).toFixed(2)} PLN</Text>
      </View>
      <NumberPad
          marginTop={150}
          onAdd={handleNumberPress}
          onDelete={handleDeletePress}
          onComma={handleCommaPressed}
        />
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={handleTransferPressed}
        >
        <Text center bold large>{mainState.language.transfer}</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
};

export default TransferScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorTextStyle: {
    paddingBottom: 10,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    paddingBottom: 10,
    color: 'green',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#43C6AC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 300,
    height: 50,
    marginTop: 40,
  },
  SectionStyle: {
    borderColor: '#dadae8',
    border: 10,
    flexDirection: 'row',
    height: 60,
    marginTop: 100,
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
    marginTop: 10,
  },
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    padding: 16,
  },
  balanceContainer: {
    marginTop: 0
  },
  balanceText: {
    fontSize: 16,
  },
});
