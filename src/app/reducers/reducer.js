import * as types from '../constants/actionType';
const initState = {
  type: '',
  products: []
}
export default function(state = initState, action) {
  switch(action.type) {
    case types.SHOW_PRODUCT:
    {
      return {
        ...state,
        type: types.SHOW_PRODUCT,
        products: action.products,
      }
    }
		break;

    default:
      return state;
	}
}
