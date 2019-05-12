import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView, Permissions } from 'expo';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: -31.4290994,
      longitude: -64.1883294,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    },
    locationChosen: false,
    isLocationGranted: null
  };

  onPressMapViewHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.mapRef.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(
      prevState => {
        return {
          focusedLocation: {
            ...prevState.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          locationChosen: true
        };
      },
      () => {
        this.props.form.setFieldValue('location', this.state.focusedLocation);
      }
    );
  };

  getLocationHandler = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ isLocationGranted: status });

    if (status) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coordEvent = {
            nativeEvent: {
              coordinate: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
            }
          };
          this.onPressMapViewHandler(coordEvent);
        },
        err => {
          console.log(err);
          alert('Could fetch location, please set it manually');
        }
      );
    }
  };

  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.focusedLocation}
          onPress={this.onPressMapViewHandler}
          ref={ref => (this.mapRef = ref)}
        >
          {marker}
        </MapView>
        <Button title="Locate Me!" onPress={this.getLocationHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickLocation;
