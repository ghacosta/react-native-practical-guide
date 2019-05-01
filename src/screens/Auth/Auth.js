import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class AuthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Auth Screen</Text>
        <Button
          title="Login"
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
  }
});

export default AuthScreen;
