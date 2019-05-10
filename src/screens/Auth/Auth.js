import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import backgroundImage from '../../assets/background.jpeg';
import AuthForm from '../../components/AuthForm/AuthForm';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.removeUserToken();
  }

  removeUserToken = async () => {
    await AsyncStorage.removeItem('userToken');
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <MainText>
            <HeadingText>Real Adventurer</HeadingText>
          </MainText>
          <AuthForm navigation={this.props.navigation} />
        </KeyboardAvoidingView>
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
  }
});

export default AuthScreen;
