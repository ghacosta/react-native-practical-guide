import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

function postImage(base64) {
  return axios.post(
    'https://us-central1-rn-course-305ca.cloudfunctions.net/storeImage',
    { image: base64 }
  );
}

function postPlace(place) {
  axios.post('https://rn-course-305ca.firebaseio.com/places.json', place);
}

export function* placesWorker(action) {
  try {
    const { data } = yield call(postImage, action.place.image.base64);
    yield call(postPlace, {
      ...action.place,
      image: data.imageUrl
    });
    yield put({ type: 'API_CALL_SUCCESS' });
  } catch (error) {
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}

export function* placesWatcher() {
  yield takeLatest(actionTypes.ADD_PLACE, placesWorker);
}
