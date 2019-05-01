import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SharePlace extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Share Place</Text>
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

export default SharePlace;
