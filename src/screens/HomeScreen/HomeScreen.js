import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Text from '../../components/Text';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = (props) => {
  const { mainState, setMainState } = useState();
  
  return (
    <Container>
        <Header>
          <QRCode />
          <Text>Welcome,</Text>
          <Text>{mainState.userDetails.username}</Text>
        </Header>
        <FontAwesome5 anme="cog" size={25} color="#565656"></FontAwesome5>
    </Container>
  )
}

export default HomeScreen;

const Header = styled.View``;

const Welcome = styled.View``;

const QRCode = styled.Image``;

const Container = styled.SafeAreaView`
  flex: 1,
  background-color: #1e1e1e
`;
