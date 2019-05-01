import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  render() {
    return (
      <View>
        <PlaceList places={this.props.places} />
        <Button
          title="Go to PlaceDetail"
          onPress={() => this.props.navigation.navigate('PlaceDetail')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
