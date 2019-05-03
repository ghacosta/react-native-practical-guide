import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const defaultButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.button,
          props.style,
          { backgroundColor: props.color ? props.color : '#2196F3' }
        ]}
      >
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    padding: 6,
    margin: 8
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

export default defaultButton;
