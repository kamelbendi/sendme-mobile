import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import BoxFrameImageText from '../../components/BoxFrameImageText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMainContext } from '../../store/MainContext';

const WelcomeScreen = ({ navigation }) => {
  const { mainState, setMainState } = useMainContext();

  function handleLoginPressed () {
    navigation.navigate('LoginScreen');
  }

  function handleRegisterPressed () {
    navigation.navigate('RegisterScreen');
  }
  return (
    <View style={styles.container}>
      <BoxFrameImageText imageName='sendme.png' text={mainState.language.welcomeText} />
      <Text heavy>{mainState.language.registerOrLogin}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLoginPressed}
      >
        <Text center heavy large>{mainState.language.signIn}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegisterPressed}
      >
        <Text center bold large>{mainState.language.signUp}</Text>
      </TouchableOpacity>
      {/* <Image
        source={require('../../../assets/success.png')}
        style={[styles.image]} />
      <Text >Test contentrr</Text> */}
    </View>
  )
};

WelcomeScreen.propTypes = {
  // bla: PropTypes.string,
};

WelcomeScreen.defaultProps = {
  // bla: 'test',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  button: {
    backgroundColor: '#43C6AC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 300,
    height: 50,
    marginTop: 40
  }
});

export default WelcomeScreen;
