import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
        <Button
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
        <Button
          title="Submit"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
