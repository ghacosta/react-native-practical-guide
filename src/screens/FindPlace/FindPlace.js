import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class FindPlace extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Find Place</Text>
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

export default FindPlace;
