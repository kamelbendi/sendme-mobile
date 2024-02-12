import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMainContext } from '../../store/MainContext';
import axios from 'axios';
import apiUrl from '../../../api-urls';
import Text from '../../components/Text';

const CreditCardScreen = () => {
  const { mainState, setMainState } = useMainContext();
  const creditCardInfoInit = {
    cardnumber: '**** **** **** 1234',
    cardholder: mainState.userDetails.surname + ' ' + mainState.userDetails.name,
    expirydate: '02/2028',
    cvv: '123',
  };
  const [creditCardInfo, setCreditCardInfo] = useState(creditCardInfoInit);

  useEffect(() => {
    async function fetchData() {
      await axios.post(apiUrl.getcarddetails, {
        username: mainState.userDetails.username,
      }).then(response => {
        const data = response.data;
        setCreditCardInfo({
          cardnumber: data.cardnumber,
          cardholder: mainState.userDetails.surname + ' ' + mainState.userDetails.name,
          expirydate: data.expirydate,
          cvv: data.cvv,
        });
      }).catch(error => {
        console.error('Error fetching data :', error);
      });
    }
    fetchData();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Card Holder */}
        <Text large heavy style={styles.cardHolder}>{creditCardInfo.cardholder}</Text>
        {/* Card Number */}
        <Text large heavy style={styles.cardNumber}>{creditCardInfo.cardnumber.match(/.{1,4}/g).join('  ')}</Text>

        {/* Expiry Date */}
        <Text large heavy style={styles.expiryDate}>Expiry date: {creditCardInfo.expirydate}</Text>
        <Text large heavy style={styles.expiryDate}>CVV: {creditCardInfo.cvv}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'top',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 30,
    marginTop: 100
  },
  cardNumber: {
    fontSize: 28,
    color: '#000000',
    marginBottom: 10,
  },
  cardHolder: {
    color: '#000000',
    marginBottom: 10,
  },
  expiryDate: {
    color: '#000000',
  },
});

export default CreditCardScreen;
