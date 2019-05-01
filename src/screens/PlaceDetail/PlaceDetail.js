import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const placeDetail = props => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={props.onItemDeleted}>
          <View style={styles.deleteButton}>
            <Ionicons size={32} name="ios-trash" color="red" />
          </View>
        </TouchableOpacity>
        <Button title="Close" onPress={props.onModalClosed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    height: 200,
    width: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center'
  },
  deleteButton: {
    alignItems: 'center'
  }
});

export default placeDetail;
