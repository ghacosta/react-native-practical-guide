import { placesWatcher } from './places';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([placesWatcher()]);
}
