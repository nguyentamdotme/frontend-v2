import * as types from '../constants/actionType';
import callAPI, {uploadMultiple} from '../api/callAPI';

export function addAuction(item, user, price) {
  return (dispatch) => {
    const data = {
      auctionItem: item,
      payBy: {
        owner: user._id,
        price
      },
      isAuction: true
    }
    const opt = {
      url    : '/transaction',
      method : 'POST',
      data   : data,
      image  : true
    }
    dispatch({type: types.ADDING_AUCTION});
    return callAPI(opt).then(newTransaction => {
      console.log('addAuction api');
      console.log(newTransaction);
      dispatch({
        type: types.ADDED_AUCTION_SUCCESS,
        newTransaction
      });
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function adding() {
  return {type: types.ADDING_EXCHANGE}
}

export function loading() {
  return {type: types.LOADING_DATA}
}

export function addChange(item, productExchange, payMore) {
  return (dispatch) => {
    const data = {
      auctionItem: item,
      payBy: {
        productId: productExchange._id,
        payMore
      },
      isAuction: false
    }
    const opt = {
      url    : '/transaction',
      method : 'POST',
      data   : data,
    }
    dispatch(adding());
    return callAPI(opt).then(res => {
      console.log('add EXCHANGE api');
      console.log(res);
      if(res.status == 200) {
        dispatch({
          type: types.ADDED_EXCHANGE_SUCCESS,
          data: res.data,
          message: res.message
        });
      } else {
        dispatch({
          type: types.ADDED_EXCHANGE_ERROR,
          message: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function showTransactionOfProduct(productId) {
  console.log(productId);
  return (dispatch) => {
    const opt = {
      url    : '/transaction/product/'+productId,
      method : 'GET'
    }
    dispatch(loading());
    return callAPI(opt).then(productRequest => {
      console.log('showTransactionOf api');
      dispatch({
        type: types.SHOW_PRODUCT_REQUEST,
        productRequest,
        progress: productRequest
      });
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function addingProgress() {
  return {type: types.ADD_PROGRESSING}
}

export function addProgress(idTransaction, payWith, isAuction) {
  console.log('idTransaction');
  console.log(idTransaction);
  return (dispatch) => {
    const opt = {
      url    : '/transaction/addprogress/',
      method : 'POST',
      data   :  {idTransaction, payWith, isAuction}
    }
    dispatch(addingProgress());
    const opt2 = {
      url    : '/transaction/id/'+idTransaction,
      method : 'GET'
    }
    dispatch(addingProgress());
    return callAPI(opt2).then(transaction => {
      return callAPI(opt).then(progress => {
        console.log('addProgress api');
        console.log(progress);
        console.log(transaction);
        dispatch({
          type: types.ADD_PROGRESS,
          progress,
          productRequest: transaction
        });
      }).catch(error => {
        console.log(error);
        throw(error);
      });
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function showTransactionOfUser(userId) {
  return (dispatch) => {
    const opt = {
      url    : '/transaction/user/'+userId,
      method : 'GET'
    }
    dispatch({type:types.LOADING_TRANS_USER});
    return callAPI(opt).then(res => {
      console.log('TRANS_OF_USER_SUCCESS');
      console.log(res);
      if(res.status == 200) {
        dispatch({
          type: types.TRANS_OF_USER_SUCCESS,
          transactionOfUser: res.data,
          message: res.message
        });
      } else {
        dispatch({
          type: types.TRANS_OF_USER_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function showTransaction() {
  return (dispatch) => {
    const opt = {
      url    : '/transaction',
      method : 'GET'
    }
    dispatch({type:types.LOADING_TRANS_ALL});
    return callAPI(opt).then(res => {
      console.log(res);
      if(res.status == 200) {
        dispatch({
          type: types.TRANS_ALL_SUCCESS,
          allTransaction: res.data,
          message: res.message
        });
      } else {
        dispatch({
          type: types.TRANS_ALL_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function updateStatusTrans(transId, value, productStatus) {
  return (dispatch) => {
    const opt = {
      url    : '/transaction/id/updatestatus/'+transId,
      method : 'POST',
      data   : {value, productStatus}
    }
    dispatch({type:types.LOADING_STATUS});
    return callAPI(opt).then(res => {
      console.log(res);
      if(res.status == 200) {
        dispatch({
          type: types.STATUS_SUCCESS,
          message: res.message
        });
      } else {
        dispatch({
          type: types.STATUS_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function showListAuction(userId) {
  return (dispatch)=> {
    const opt = {
      url    : '/transaction/auction/user/'+userId,
      method : 'GET',
    }
    dispatch({type:types.LOADING_AUCTION});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.AUCTION_SUCCESS,
          data: res.data,
          message: res.message
        });
      } else {
        dispatch({
          type: types.AUCTION_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function removeAuction(_id, index, userId) {
  return (dispatch)=> {
    const opt = {
      url    : '/transaction/auction/remove/',
      method : 'POST',
      data: {_id, index, userId}
    }
    dispatch({type:types.LOADING_REMOVE_AUCTION});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.REMOVE_AUCTION_SUCCESS,
          data: res.data,
          message: res.message
        });
        dispatch(showListAuction(userId));
      } else {
        dispatch({
          type: types.REMOVE_AUCTION_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      dispatch({
        type: types.REMOVE_AUCTION_ERROR,
        error: error
      });
    });
  }
}

export function showListChange(userId) {
  return (dispatch)=> {
    const opt = {
      url    : '/transaction/change/user/'+userId,
      method : 'GET',
    }
    dispatch({type:types.LOADING_CHANGE});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.CHANGE_SUCCESS,
          message: res.message,
          data: res.data
        });
      } else {
        dispatch({
          type: types.CHANGE_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function removeChange(_id, index, userId) {
  return (dispatch)=> {
    const opt = {
      url    : '/transaction/change/remove/',
      method : 'POST',
      data: {_id, index, userId}
    }
    dispatch({type:types.LOADING_REMOVE_CHANGE});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.REMOVE_CHANGE_SUCCESS,
          data: res.data,
          message: res.message
        });
        dispatch(showListChange(userId));
      } else {
        dispatch({
          type: types.REMOVE_CHANGE_ERROR,
          error: res.message
        });
      }
    }).catch(error => {
      dispatch({
        type: types.REMOVE_CHANGE_ERROR,
        error: error
      });
    });
  }
}
