// SplashScreen.js
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';

const SplashScreen = () => {
  const { mainState, setMainState } = useMainContext();

  return (
    <View style={styles.container}>
      <Text>{mainState.language.sendme}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export default SplashScreen;