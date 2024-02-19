import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import apiUrl from '../../../api-urls';

export const getBalance = async (mainState, setMainState) => {
  try {
      if (mainState && setMainState) {
      const response = await axios.post(apiUrl.getbalance, {
        username: mainState.userDetails.username
      });

      const data = response.data;
  
      setMainState(prevState => ({
        ...prevState,
        userDetails: {
          ...prevState.userDetails,
          balance: data.balance
        }
      }));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export const getTransactions = async (mainState, setMainState) => {
  try {
    if (mainState && setMainState) {
      const response = await axios.post(apiUrl.gettransactions, {
        username: mainState.userDetails.username
      });

      const data = response.data;
      
      setMainState(prevState => ({
        ...prevState,
        userDetails: {
          ...prevState.userDetails,
          transactions: data
        }
      }));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const HomeScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const [qrData, setQRData] = useState('');


  const getAccountNumber = async () => {
    try {
      const response = await axios.post(apiUrl.getaccountnumber, {
        username: mainState.userDetails.username
      });
  
      const data = response.data;
  
      setMainState(prevState => ({
        ...prevState,
        userDetails: {
          ...prevState.userDetails,
          accountNumber: data.accountnumber
        }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  useEffect(() => {
    getBalance(mainState, setMainState);
    getTransactions(mainState, setMainState);
    getAccountNumber();

  }, [])
  
  return (
    <View style={styles.container}>
      {/* User Name */}
      <Text medium heavy padding={'50px 0px 20px 20px'}>Hello, {mainState.userDetails.username}!</Text>
      <Text medium heavy padding={'10px 0px 10px 20px'}>Account Number : {
        mainState.userDetails.accountNumber ?
        [
          mainState.userDetails.accountNumber.slice(0, 2),
          mainState.userDetails.accountNumber.slice(2, 6),
          mainState.userDetails.accountNumber.slice(6, 10),
          mainState.userDetails.accountNumber.slice(10)
        ].join(' ')
        : <Text>Loading...</Text>
      }</Text>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount} center>${parseFloat(mainState.userDetails.balance).toFixed(2)}</Text>
      </View>

      {/* Transaction History */}
      <View style={styles.transactionHistory}>
        <Text style={styles.transactionHeading}>Transaction History:</Text>
        <ScrollView style={styles.transactionList}>
        {mainState.userDetails.transactions ?
          mainState.userDetails.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text>
                {mainState.userDetails.username === transaction.username_receiver ?
                  transaction.title :
                  'transfer to :  ' + transaction.username_receiver
                }
              </Text>
              <Text medium heavy style={{
                color: mainState.userDetails.username === transaction.username_receiver ? 'green' : 'red'
              }}>
                {mainState.userDetails.username === transaction.username_receiver ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          )) : <Text>Loading...</Text>}
        </ScrollView>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  transactionHistory: {
    flex: 1
  },
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    padding: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  balanceContainer: {
    marginBottom: 80,
    marginTop: 30
  },
  balanceText: {
    fontSize: 16,
    marginRight: 8,
  },
  balanceAmount: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  transactionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default HomeScreen;
