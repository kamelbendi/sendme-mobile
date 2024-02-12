import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import apiUrl from '../../../api-urls';

const HomeScreen = (props) => {
  const { mainState, setMainState } = useMainContext();
  const [qrData, setQRData] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const getBalance = async () => {
    console.log(mainState.userDetails.username)
    await axios.post(apiUrl.getbalance, {
      username: mainState.userDetails.username
    }).then(response => {
      const data = response.data;
      setBalance(data.balance);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const getTransactions = async () => {
      
  }

  useEffect(async () => {
    await getBalance();
    await getTransactions();
  }, [])
  
  return (
    <View style={styles.container}>
      {/* User Name */}
      <Text medium heavy padding={'50px 0px 20px 20px'}>Hello, {mainState.userDetails.username}!</Text>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount} center>${parseFloat(balance).toFixed(2)}</Text>
      </View>

      {/* Transaction History */}
      <View style={styles.transactionHistory}>
        <Text style={styles.transactionHeading}>Transaction History:</Text>
        <ScrollView style={styles.transactionList}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text>{transaction.title}</Text>
              <Text style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>
                {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
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
