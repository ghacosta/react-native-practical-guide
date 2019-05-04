import React, { Component } from 'react';
import {
  ImageBackground,
  View,
  Button,
  StyleSheet,
  AsyncStorage,
  Dimensions
} from 'react-native';
import backgroundImage from '../../assets/background.jpeg';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  constructor(props) {
    super(props);
    this.removeUserToken();
    Dimensions.addEventListener('change', this.updateStyles);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };
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
            <DefaultInput placeholder="Your e-mail address" />
            <View
              style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" />
              </View>
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Confirm Password" />
              </View>
            </View>
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
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  landscapePasswordWrapper: {
    width: '45%'
  }
});

export default AuthScreen;
