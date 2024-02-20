import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BoxFrameImageText from '../../components/BoxFrameImageText';
import Text from '../../components/Text';
import { useMainContext } from '../../store/MainContext';

const SuccessfulTransfer = (props) => {
  const {mainState, setMainState } = useMainContext();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
      }}>
      <Text large heavy center>
        {mainState.language.transactionSuccess}
      </Text>
      <TouchableOpacity
        style={{marginTop: 200}}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('Dashboard')}>
        <Text large heavy center style={{color: '#43C6AC'}}>{mainState.language.continue}</Text>
      </TouchableOpacity>
    </View>

  )
};

SuccessfulTransfer.propTypes = {
  // bla: PropTypes.string,
};

SuccessfulTransfer.defaultProps = {
  // bla: 'test',
};

export default SuccessfulTransfer;

const styles = StyleSheet.create({

});
