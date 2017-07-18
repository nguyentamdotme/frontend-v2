import * as types from '../constants/actionType';

const initState = {
  type: '',
  data: []
}
export default function(state = initState, action) {
  switch(action.type) {
    case types.SHOW_CATEGORY:
    {
      return {
        type: types.SHOW_CATEGORY,
        data: action.categories,
      }
    }
    break;

    default:
      return state;
  }
}
