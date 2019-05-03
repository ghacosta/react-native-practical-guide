import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import placeholderImage from '../../assets/placeholder.jpeg';

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={placeholderImage} style={styles.previewImage} />
        </View>
        <DefaultButton
          title="Pick an Image"
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

export default PickImage;
