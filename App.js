import React from 'react';
import { Provider, connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import configureStore from './src/store/configureStore';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

class App extends React.Component {
  placeAddedHandler = (placeName) => {
    this.props.onAddPlace(placeName);
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}  
        />
        <PlaceInput
          onPlaceAdded={this.placeAddedHandler}
        />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { // align elements from top to bottom (column)
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 26,
  },
});

const store = configureStore();
const mapStateToProps = (state) => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default RootComponent = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);