import {browserHistory} from 'react-router';

import * as types from '../constants/actionType';
import {showProduct} from '../actions/product-actions';

const initState = {
  type: '',
  error: '',
  message: '',
  isError: false,
  isLogin: false,
  data: undefined,
  requesting: false,
  imageAvatar: null,
  uploading: false,
  uploadingPass: false,
  updatingUser: false,
  allUser: [],
  loadAllUser: false,
  isRegister: false,
}

export default function(state = initState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS: {
      console.log('LOGIN SUCCESS');
      return {
        ...state,
        type: types.LOGIN_SUCCESS,
        error: action.error,
        isLogin: true,
        data: action.user,
        isRegister: false
      }
    } break;

    case types.LOGIN_FAIL: {
      return {
        ...state,
        type: types.LOGIN_FAIL,
        error: action.error,
        isLogin: false,
        isError: true,
      }
    } break;

    case types.REQUESTING: {
      console.log('REQUESTING');
      return {
        ...state,
        type: types.REQUESTING,
        requesting: true,
        isRegister: false
      }
    } break;

    case types.REGISTER_SUCCESS: {
      console.log('REGISTER SUCCESS');
      return {
        ...state,
        type: types.REGISTER_SUCCESS,
        requesting: false,
        isLogin: false,
        data: action.user,
        isRegister: true,
        message: action.message
      }
    } break;

    case types.REGISTER_FAIL: {
      return {
        ...state,
        type: types.REGISTER_FAIL,
        error: action.error,
        isLogin: false,
        isError: true,
        requesting: false
      }
    } break;

    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        type: types.LOGOUT_SUCCESS,
        isLogin: false
      }
    } break;

    case types.UPLOADING: {
      return {
        ...state,
        type: types.UPLOADING,
        imageAvatar: null,
        uploading: true
      }
    } break;

    case types.UPLOAD_AVATAR_ERROR: {
      return {
        ...state,
        type: types.UPLOAD_AVATAR_ERROR,
        error: action.error,
        imageAvatar: action.imageAvatar,
        uploading: false
      }
    } break;

    case types.UPLOAD_AVATAR_SUCCESS: {
      return {
        ...state,
        type: types.UPLOAD_AVATAR_SUCCESS,
        imageAvatar: action.imageAvatar,
        uploading: false
      }
    } break;

    case types.UPLOADING_PASS: {
      return {
        ...state,
        type: types.UPLOADING_PASS,
        uploadingPass: true,
        isError: false
      }
    } break;

    case types.UPLOAD_PASS_ERROR: {
      return {
        ...state,
        type: types.UPLOAD_PASS_ERROR,
        error: action.error,
        isError: true,
        uploadingPass: false
      }
    } break;

    case types.UPLOAD_PASS_SUCCESS: {
      return {
        ...state,
        type: types.UPLOAD_PASS_SUCCESS,
        uploadingPass: false,
        isError: false,
        message: action.message
      }
    } break;

    case types.UPDATING_USER: {
      return {
        ...state,
        type: types.UPDATING_USER,
        updatingUser: true,
        isError: false
      }
    } break;

    case types.UPDATE_USER_ERROR: {
      return {
        ...state,
        type: types.UPDATE_USER_ERROR,
        error: action.error,
        isError: true,
        updatingUser: false
      }
    } break;

    case types.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        type: types.UPDATE_USER_SUCCESS,
        updatingUser: false,
        isError: false,
        message: action.message,
        data: action.user
      }
    } break;

    case types.LOADING_All_USER: {
      return {
        ...state,
        type: types.LOADING_All_USER,
        loadAllUser: true,
        isError: false
      }
    } break;

    case types.LOAD_ALL_USER_ERROR: {
      return {
        ...state,
        type: types.LOAD_ALL_USER_ERROR,
        error: action.error,
        isError: true,
        loadAllUser: false
      }
    } break;

    case types.LOAD_ALL_USER_SUCCESS: {
      return {
        ...state,
        type: types.LOAD_ALL_USER_SUCCESS,
        loadAllUser: false,
        isError: false,
        message: action.message,
        allUser: action.allUser
      }
    } break;

    default:
      return state;
  }
}
