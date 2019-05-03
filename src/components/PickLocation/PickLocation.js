import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import MainText from '../../components/UI/MainText/MainText';

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <MainText>
            <Text>Map</Text>
          </MainText>
        </View>
        <DefaultButton
          title="Locate Me!"
          onPress={() => alert('button pressed')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickLocation;
