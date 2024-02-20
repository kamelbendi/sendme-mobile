import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Text from './Text';
import { useMainContext } from '../store/MainContext';
import NumberPad from './NumberPad/NumberPad';

const PinComponent = (props) => {
  const [pinCount, setPinCount] = useState(0);
  const [enteredPin, setEnteredPin] = useState('');
  const totalPins = 6;

  const renderPins = () => {
    const pins = [];

    for (let x = 1; x<= totalPins; x++) {
      pins.push(
        x <= pinCount ? (
          <PinContainer key={x}>
            <Pin />
          </PinContainer>
        )
        :
        (
          <PinContainer key={x} />
        )
      );
    }

    return pins;
  }

  const handleNumberPress = (number) => {
    if(pinCount < 6) {
      var pin = pinCount;
      setPinCount(pin + 1);
      setEnteredPin((prevNumber) => prevNumber + number.toString());
    }
  };

  const handleDeletePress = () => {
    if (pinCount > 0) {
      var pin = pinCount;
      setPinCount(pin - 1);
      setEnteredPin((prevNumber) => prevNumber.slice(0, -1));
    }
  };

  useEffect(() => {
    if (pinCount === 6) {
      props.setUpPin(enteredPin);
    }
  }, [pinCount])

  return (
    <Container>
      <Text center heavy title margin="32px 0 0 0">{props.title}</Text>
      <Text center heavy medium margin="32px 0 0 0">{props.headerText}</Text>
      <AccessPin>{renderPins()}</AccessPin>
      <Text center heavy medium margin="32px 0 0 0">{props.underInputText}</Text>
      <NumberPad
        marginTop={320}
        onAdd={handleNumberPress}
        onDelete={handleDeletePress}
      />
    </Container>
  )
};

export default PinComponent;

const Container = styled.SafeAreaView`
  background-color: #1e1e1e;
  justify-content: center;
`;

const AccessPin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 32px 64px 16px 64px;
`;

const PinContainer = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #DBDBDB;
  align-items: center;
  justify-content: center;
`;

const Pin = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: white
`;

const StatusBar = styled.StatusBar``;
