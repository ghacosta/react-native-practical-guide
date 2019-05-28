import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import DefaultButton from '../UI/DefaultButton/DefaultButton';

class PickImage extends Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = async () => {
    // const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: statusCameraRoll } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (statusCameraRoll) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });

      if (!result.cancelled) {
        this.setState(
          prevState => {
            return {
              pickedImage: {
                ...prevState.pickedImage,
                uri: result.uri,
                base64: result.base64
              }
            };
          },
          () => {
            this.props.form.setFieldValue('image', this.state.pickedImage);
          }
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <DefaultButton title="Pick an Image" onPress={this.pickImageHandler} />
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
