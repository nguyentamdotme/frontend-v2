import * as types from '../constants/actionType';
import {browserHistory} from 'react-router';

const initState = {
  type        : '',
  data        : [],
  productRequest: [],
  progress    : undefined,
  transacting : false,
  loading     : false,
  progressLoading: false,
  message     : '',
  isError     : false,
  error       : '',
  loadingTransUser: false,
  transOfUser: [],
  loadingAllTrans: false,
  allTransaction: [],
  updatingStatus: false,
  loadingAuction: false,
  listAuction: [],
  loadingChange: false,
  listChange: [],
  loadingRemoveAution: false

}
export default function(state = initState, action) {
  switch(action.type) {
    case types.ADDING_AUCTION:
    {
      console.log('ADDING_AUCTION reducer');
      return {
        ...state,
        type: types.ADDING_AUCTION,
        data: [],
        transacting: true
      }
    }
    break;

    case types.ADDED_AUCTION_SUCCESS:
    {
      console.log('ADDED_AUCTION_SUCCESS reducer');
      return {
        ...state,
        type: types.ADDED_AUCTION_SUCCESS,
        data: action.newTransaction,
        transacting: false
      }
    }
    break;

    case types.ADDING_EXCHANGE:
    {
      console.log('ADDING_EXCHANGE reducer');
      return {
        type: types.ADDING_EXCHANGE,
        data: [],
        transacting: true
      }
    }
    break;

    case types.ADDED_EXCHANGE_SUCCESS:
    {
      console.log('ADDED_EXCHANGE_SUCCESS reducer');
      return {
        ...state,
        type: types.ADDED_EXCHANGE_SUCCESS,
        data: action.data,
        transacting: false,
        message: action.message
      }
    }
    break;

    case types.ADDED_EXCHANGE_ERROR:
    {
      console.log('ADDED_EXCHANGE_ERROR reducer');
      return {
        ...state,
        type: types.ADDED_EXCHANGE_ERROR,
        data: null,
        transacting: false,
        message: action.message
      }
    }
    break;

    case types.LOADING_DATA:
    {
      console.log('LOADING_DATA reducer');
      return {
        ...state,
        type: types.LOADING_DATA,
        loading: true
      }
    }
    break;

    case types.SHOW_PRODUCT_REQUEST:
    {
      console.log('SHOW_PRODUCT_REQUEST reducer');
      return {
        ...state,
        type: types.SHOW_PRODUCT_REQUEST,
        productRequest: action.productRequest,
        progress: action.progress,
        loading: false
      }
    }
    break;

    case types.ADD_PROGRESSING:
    {
      console.log('ADD_PROGRESSING reducer');
      return {
        ...state,
        type: types.ADD_PROGRESSING,
        progressLoading: true,
        loading: true
      }
    }
    break;

    case types.ADD_PROGRESS:
    {
      console.log('ADD_PROGRESS reducer');
      return {
        ...state,
        type: types.ADD_PROGRESS,
        progress: action.progress,
        productRequest: action.productRequest,
        progressLoading: false,
        loading: false
      }
      dispatch(push('/my-products'));
    }
    break;

    case types.ADD_PROGRESS_ERROR:
    {
      console.log('ADD_PROGRESS_ERROR reducer');
      return {
        ...state,
        type: types.ADD_PROGRESS_ERROR,
        progressLoading: false,
        loading: false
      }
    }
    break;

    case types.LOADING_TRANS_USER:
    {
      return {
        ...state,
        type: types.LOADING_TRANS_USER,
        loadingTransUser: true
      }
    }
    break;

    case types.TRANS_OF_USER_SUCCESS:
    {
      return {
        ...state,
        type: types.TRANS_OF_USER_SUCCESS,
        message     : action.message,
        isError     : false,
        loadingTransUser: false,
        transOfUser : action.transactionOfUser
      }
    }
    break;

    case types.TRANS_OF_USER_ERROR:
    {
      return {
        ...state,
        type: types.TRANS_OF_USER_ERROR,
        isError     : true,
        error       : action.error,
        loadingTransUser: false
      }
    }
    break;

    case types.LOADING_TRANS_ALL:
    {
      return {
        ...state,
        type: types.LOADING_TRANS_ALL,
        loadingAllTrans: true
      }
    }
    break;

    case types.TRANS_ALL_SUCCESS:
    {
      return {
        ...state,
        type: types.TRANS_ALL_SUCCESS,
        message     : action.message,
        isError     : false,
        loadingAllTrans: false,
        allTransaction : action.allTransaction
      }
    }
    break;

    case types.TRANS_ALL_ERROR:
    {
      return {
        ...state,
        type: types.TRANS_ALL_ERROR,
        isError     : true,
        error       : action.error,
        loadingAllTrans: false
      }
    }
    break;

    case types.LOADING_STATUS:
    {
      return {
        ...state,
        type: types.LOADING_STATUS,
        updatingStatus: true
      }
    }
    break;

    case types.STATUS_SUCCESS:
    {
      return {
        ...state,
        type: types.STATUS_SUCCESS,
        message     : action.message,
        isError     : false,
        updatingStatus: false,
      }
    }
    break;

    case types.STATUS_ERROR:
    {
      return {
        ...state,
        type: types.STATUS_ERROR,
        isError     : true,
        error       : action.error,
        updatingStatus: false
      }
    }
    break;

    case types.LOADING_AUCTION:
    {
      return {
        ...state,
        type: types.LOADING_AUCTION,
        loadingAuction: true
      }
    }
    break;

    case types.AUCTION_SUCCESS:
    {
      return {
        ...state,
        type: types.AUCTION_SUCCESS,
        message     : action.message,
        isError     : false,
        loadingAuction: false,
        listAuction: action.data
      }
    }
    break;

    case types.AUCTION_ERROR:
    {
      return {
        ...state,
        type: types.AUCTION_ERROR,
        isError     : true,
        error       : action.error,
        loadingAuction: false
      }
    }
    break;

    case types.LOADING_REMOVE_AUCTION:
    {
      return {
        ...state,
        type: types.LOADING_REMOVE_AUCTION,
        loadingRemoveAution: true
      }
    }
    break;

    case types.REMOVE_AUCTION_SUCCESS:
    {
      return {
        ...state,
        type: types.REMOVE_AUCTION_SUCCESS,
        message     : action.message,
        isError     : false,
        loadingRemoveAution: false,
      }
    }
    break;

    case types.REMOVE_AUCTION_ERROR:
    {
      return {
        ...state,
        type: types.REMOVE_AUCTION_ERROR,
        isError     : true,
        error       : action.error,
        loadingRemoveAution: false
      }
    }
    break;

    default:
      return state;
  }
}
