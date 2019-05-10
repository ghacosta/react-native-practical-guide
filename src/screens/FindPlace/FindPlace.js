import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  state = {
    placesLoaded: false,
    buttonAnim: new Animated.Value(1),
    listAnim: new Animated.Value(0)
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.listAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.buttonAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigation.push('PlaceDetail', {
      selectedPlace,
      title: selectedPlace.name
    });
  };

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.buttonAnim,
          transform: [
            {
              scale: this.state.buttonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <Button title="Search Button" onPress={this.placesSearchHandler} />
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.listAnim
          }}
        >
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.container}>
        {content}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(FindPlaceScreen);
