import React, { createRef, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import NumberPad from '../../components/NumberPad/NumberPad';
import Text from '../../components/Text';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useMainContext } from '../../store/MainContext';
import Loader from '../../components/Loader';
import axios from 'axios';
import apiUrl from '../../../api-urls';
import { getBalance, getTransactions } from './HomeScreen';
import { Icon } from 'react-native-elements';


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
    props.navigation.navigate('ConfirmTransactionPinScreen', {
      sendTransaction
    });

  }
  
  const sendTransaction = async () => {
    await axios.post(apiUrl.transfer, {
      username_sender: mainState.userDetails.username,
      username_receiver: recipient,
      amount: parseFloat(selectedAmount)
    })
      .then(res => {
        setLoading(false);
        props.navigation.navigate('SuccessfulTransfer');
        setErrorUsername('');
        setRecipient('');
        setUsernameExists(false);
        setSelectedAmount('0');
        getBalance(mainState, setMainState);
        getTransactions(mainState, setMainState);
      })
      .catch((err) => {
        setLoading(false);
        alert('Error transferring' + err);
      })
  }

  onQRCodeScan = (data) => {
    setRecipient(data);
    handleRecipient(data);
    props.navigation.navigate('Dashboard');
  }

  handleScanQRCode = () => {
    props.navigation.navigate('QRCodeScannerScreen', { onQRCodeScan });
  }

  useEffect(() => {
    recipientInputRef.current && recipientInputRef.current.focus();
  } ,[]);

  return (
    
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={recipient}
              onChangeText={(recipient) => handleRecipient(recipient)}
              ref={recipientInputRef}
              underlineColorAndroid="#f000"
              placeholder={mainState.language.enterUsername}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              onSubmitEditing={() =>{
                Keyboard.dismiss()}
              }
              blurOnSubmit={false}
              />
            <TouchableOpacity style={styles.cameraButton} onPress={handleScanQRCode}>
              <Icon name="camera" type="font-awesome" size={20} color="white" />
            </TouchableOpacity>
      </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.balanceContainer}>
            <Text style={usernameExists ? styles.successTextStyle : styles.errorTextStyle}>
              {errorUsername}
            </Text>
        <Text style={styles.balanceAmount} center title heavy>{parseFloat(selectedAmount).toFixed(2)} PLN</Text>
      </View>
      </TouchableWithoutFeedback>
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
  cameraButton: {
    width: 55,
    height: 55,
    borderRadius: '50%',
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
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
    alignItems: 'center',
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
    height: 40,
    marginRight: 10,
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
