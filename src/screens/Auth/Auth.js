import React, { Component } from 'react';
import {
  ImageBackground,
  View,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import backgroundImage from '../../assets/background.jpeg';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';

class AuthScreen extends Component {
  constructor() {
    super();
    this.removeUserToken();
  }
  removeUserToken = async () => {
    await AsyncStorage.removeItem('userToken');
  };
  submitLogInHandler = async () => {
    await AsyncStorage.setItem('userToken', new Date().getTime().toString());
    this.props.navigation.navigate('Places');
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <DefaultButton
            title="Switch to LogIn"
            onPress={() => alert('button pressed')}
          />
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your e-mail address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <DefaultButton title="Submit" onPress={this.submitLogInHandler} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});

export default AuthScreen;
