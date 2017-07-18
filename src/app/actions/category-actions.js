import * as types from '../constants/actionType';

import callAPI from '../api/callAPI';

export function showCategory() {
  return function(dispatch){
    const opt = {
      url : '/category',
      method: 'GET',
      data: {}
    }
    return callAPI(opt).then(categories => {
      // console.log(categories);
      dispatch({
        type: types.SHOW_CATEGORY,
        categories
      });
    });
  }
}
