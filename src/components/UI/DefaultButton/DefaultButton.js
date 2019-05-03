import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

const defaultButton = props => {
  const content = (
    <View
      style={[
        styles.button,
        props.style,
        { backgroundColor: props.color ? props.color : '#2196F3' }
      ]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
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
