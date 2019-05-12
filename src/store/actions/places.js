import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = place => {
  return {
    type: ADD_PLACE,
    place
  };
};

export const deletePlace = placeKey => {
  return {
    type: DELETE_PLACE,
    placeKey
  };
};
