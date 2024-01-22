import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

const BoxFrameImageText = (props) => {
    console.log('./' + props.imageName)
    const str = '../../' + props.imageName;
    return (
        <View style={styles.container}>
            <Image
            source={str}
            style={[styles.image]} />
            <Text center bold large>{props.text}</Text>
        </View>
    )
};

BoxFrameImageText.propTypes = {
  // bla: PropTypes.string,
};

BoxFrameImageText.defaultProps = {
  // bla: 'test',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250
  },
  image: {
    width: 200,
    height: 200
  },
});

export default BoxFrameImageText;
