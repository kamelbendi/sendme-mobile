import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BoxFrameImageText from '../../components/BoxFrameImageText';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';

const SuccessfulRegistration = (props) => {
  const {mainState, setMainState } = useMainContext();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
      }}>
      <Text large heavy center>
        {mainState.language.registrationSuccessful}
      </Text>
      <TouchableOpacity
        style={{marginTop: 200}}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('LoginScreen')}>
        <Text large heavy center style={{color: '#43C6AC'}}>{mainState.language.loginNow}</Text>
      </TouchableOpacity>
    </View>

  )
};

SuccessfulRegistration.propTypes = {
  // bla: PropTypes.string,
};

SuccessfulRegistration.defaultProps = {
  // bla: 'test',
};

export default SuccessfulRegistration;

const styles = StyleSheet.create({

});
