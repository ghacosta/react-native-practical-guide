import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  });

  placeDeletedHandler = () => {
    this.props.onDeletePlace(
      this.props.navigation.getParam('selectedPlace').key
    );
    this.props.navigation.pop();
  };

  render() {
    const selectedPlace = this.props.navigation.getParam('selectedPlace');
    return (
      <View style={styles.container}>
        <View>
          <Image source={selectedPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Ionicons size={32} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetailScreen);
