import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          name: action.place.placeName,
          location: action.place.location,
          image: {
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTytWiJFmUW9EgMDpn9plx2_JjcGq5HjslF9L-kyou_fVGRhUkT'
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
      };
    default:
      return state;
  }
};

export default reducer;
