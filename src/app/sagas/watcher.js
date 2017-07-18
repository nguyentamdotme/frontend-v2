import { takeLatest } from 'redux-saga/effects';
import { searchSaga } from './searchSaga';
import * as types from '../constants/actionType';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* watchSearchMedia() {
  yield takeLatest(types.SHOW_SINGLE_PRODUCT, searchSaga);
}
