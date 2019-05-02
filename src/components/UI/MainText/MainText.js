import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const mainText = props => {
  return <Text style={[styles.mainText, props.style]}>{props.children}</Text>;
};

const defaultFont = Platform.OS === 'android' ? 'sans-serif' : 'Avenir';

const styles = StyleSheet.create({
  mainText: {
    color: '#bbb',
    fontFamily: defaultFont
  }
});

export default mainText;
