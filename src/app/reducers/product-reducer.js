import * as types from '../constants/actionType';

const initState = {
  type                : '',
  data                : [],
  imageArray          : [],
  singleProduct       : [],
  ownerProduct        : [],
  canYouLike          : [],
  productSeleted      : {},
  error               : {},
  loading             : false,
  ownerProductLoading : false,
  deleting            : false,
  singleLoading       : false
}
export default function(state = initState, action) {
  switch(action.type) {
    case types.FETCHING_DATA:
    {
      console.log('FETCHING_DATA reducer');
      return {
        ...state,
        loading: true
      }
    }
    break;

    case types.FETCHING_DATA:
    {
      console.log('FETCHING_DATA reducer');
      return {
        ...state,
        data: [],
        ownerProductLoading: true
      }
    }
    break;

    case types.SHOW_PRODUCT:
    {
      console.log('Show product');
      return {
        ...state,
        type: types.SHOW_PRODUCT,
        data: action.products,
        loading: false
      }
    }
    break;

    case types.SHOW_PRODUCT_ERROR:
    {
      console.log('Show product error');
      return {
        ...state,
        type: types.SHOW_PRODUCT_ERROR,
        data: action.products,
        loading: false
      }
    }
    break;

    case types.ADD_PRODUCT:
    {
      console.log('add product reducer');
      return {
        ...state,
        type: types.ADD_PRODUCT,
      }
    }
    break;

    case types.DELETING_PRODUCT:
    {
      console.log('DELETING_PRODUCT reducer');
      return {
        ...state,
        type: types.DELETING_PRODUCT,
        deleting: true,
      }
    }
    break;

    case types.DELETED_PRODUCT:
    {
      console.log('DELETED_PRODUCT reducer');
      return {
        ...state,
        type: types.DELETED_PRODUCT,
        deleting: false,
      }
    }
    break;

    case types.UPLOAD_SUCCESS:
    {
      console.log('upload success reducer');
      return {
        ...state,
        type: types.UPLOAD_SUCCESS,
        imageArray: action.imageArray
      }
    }
    break;

    case types.UPLOAD_ERROR:
    {
      console.log('upload error reducer');
      return {
        ...state,
        type: types.UPLOAD_ERROR,
      }
    }
    break;

    case types.SHOW_SINGLE_PRODUCT:
    {
      console.log('SHOW_SINGLE_PRODUCT reducer');
      return {
        ...state,
        type: types.SHOW_SINGLE_PRODUCT,
        singleProduct: action.singleProduct,
        singleLoading: false
      }
    }
    break;

    case types.SHOW_SINGLE_PRODUCT_ERROR:
    {
      console.log('SHOW_SINGLE_PRODUCT_ERROR reducer');
      return {
        ...state,
        type: types.SHOW_SINGLE_PRODUCT_ERROR,
        error: action.error,
        singleLoading: false
      }
    }
    break;

    case types.LOADING_SINGLE:
    {
      console.log('LOADING_SINGLE reducer');
      return {
        ...state,
        type: types.LOADING_SINGLE,
        singleLoading: true
      }
    }
    break;

    case types.SHOW_PRODUCT_OWNER:
    {
      console.log('SHOW_PRODUCT_OWNER reducer');
      return {
        ...state,
        type: types.SHOW_PRODUCT_OWNER,
        ownerProduct: action.ownerProduct,
        ownerProductLoading: false
      }
    }
    break;

    case types.SHOW_PRODUCT_OWNER_ERROR:
    {
      console.log('SHOW_PRODUCT_OWNER_ERROR reducer');
      return {
        ...state,
        type: types.SHOW_PRODUCT_OWNER_ERROR,
        ownerProduct: action.ownerProduct,
        ownerProductLoading: false
      }
    }
    break;

    case types.SHOW_PRODUCT_CATEGORY:
    {
      console.log('SHOW_PRODUCT_CATEGORY reducer');
      return {
        ...state,
        type: types.SHOW_PRODUCT_CATEGORY,
        data: action.products,
        loading: false
      }
    }
    break;

    case types.SHOW_PRODUCT_CATEGORY_ERROR:
    {
      console.log('SHOW_PRODUCT_CATEGORY_ERROR reducer');
      return {
        ...state,
        type: types.SHOW_PRODUCT_CATEGORY_ERROR,
        data: undefined,
        loading: false
      }
    }
    break;

    case types.CAN_YOU_LIKE:
    {
      console.log('CAN_YOU_LIKE reducer');
      return {
        ...state,
        type       : types.CAN_YOU_LIKE,
        canYouLike : action.products,
        loading    : false
      }
    }
    break;

    case types.CAN_YOU_LIKE_ERROR:
    {
      console.log('CAN_YOU_LIKE_ERROR reducer');
      return {
        ...state,
        type: types.CAN_YOU_LIKE_ERROR,
        data: [],
        canYouLike: [],
        loading: false
      }
    }
    break;

    default:
      return state;
  }
}
