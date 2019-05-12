import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { deletePlace } from '../../store/actions/index';
import { MapView } from 'expo';

class PlaceDetailScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  });

  constructor(props) {
    super(props);
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

  placeDeletedHandler = () => {
    this.props.onDeletePlace(
      this.props.navigation.getParam('selectedPlace').key
    );
    this.props.navigation.pop();
  };

  render() {
    const selectedPlace = this.props.navigation.getParam('selectedPlace');
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.imageMapContainer}>
          <View style={styles.subContainer}>
            <Image source={selectedPlace.image} style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView style={styles.map} initialRegion={selectedPlace.location}>
              <MapView.Marker coordinate={selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>{selectedPlace.name}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Ionicons
                  size={32}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  subContainer: {
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  imageMapContainer: {
    flex: 2
  },
  placeImage: {
    width: '100%',
    height: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center'
  },
  deleteButton: {
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
