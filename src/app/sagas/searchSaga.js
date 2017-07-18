import { put, call } from 'redux-saga/effects';
import callAPI from '../api/callAPI';
import * as types from '../constants/actionType';

export function* searchSaga({ payload }) {
  try {
    console.log('searchSaga Action');
    const opt = {
      url    : '/product/',
      method : 'GET',
      data   : {}
    }
    const singleProduct = yield call(callAPI, payload);
    yield put({ type: types.SHOW_SINGLE_PRODUCT, singleProduct });
  } catch (error) {
    yield put({ type: types.SHOW_SINGLE_PRODUCT_ERROR, error });
  }
}
