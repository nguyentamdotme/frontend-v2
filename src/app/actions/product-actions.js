import {browserHistory} from 'react-router';
import * as types from '../constants/actionType';
import callAPI, {uploadMultiple} from '../api/callAPI';

export function getData() {
  return {
    type: types.FETCHING_DATA
  }
}

export function showProduct() {
  return function(dispatch) {
    console.log('showProduct Action');
    const opt = {
      url    : '/product',
      method : 'GET',
      data   : {}
    }
    return callAPI(opt).then(products => {
      if(products.length != 0) {
        dispatch({
          type: types.SHOW_PRODUCT,
          products
        });
      } else {
        dispatch({
          type: types.SHOW_PRODUCT_ERROR,
          products: []
        });
      }
    }).catch(error => {
      throw(error);
    });
  };
}


export function addProduct(productData) {
  return function(dispatch) {
    console.log('AddProduct Action');
    const opt = {
      url    : '/product',
      method : 'POST',
      data   : productData,
      image  : true
    }
    return callAPI(opt).then(productAdded => {
      console.log('add product api');
      dispatch({
        type: types.SHOW_PRODUCT,
        productAdded
      });
      // if(window.location.href == 'http://localhost:3001/') {
      //   browserHistory.push('/my-products');
      // }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function uploadProductImage(files) {
  return function(dispatch) {
    return uploadMultiple(files)
    .then(res => {
      // console.log('array upload');
      // console.log(res);
      if(res.status == 401) {
        dispatch({
          type: types.UPLOAD_ERROR,
          data: 'Have a login!',
          imageArray: []
        });
      } else {
        dispatch({
          type: types.UPLOAD_SUCCESS,
          imageArray: res
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function showOwnerProduct(userId) {
  return function(dispatch) {
    console.log('showOwnerProduct Action');
    const opt = {
      url    : '/user/' + userId + '/product/',
      method : 'GET',
      data   : {}
    }
    dispatch({type: types.PRODUCT_OWNER_FETCHING});
    callAPI(opt).then(ownerProduct => {
      // console.log(ownerProduct);
      if(ownerProduct.length != 0) {
        dispatch({
          type: types.SHOW_PRODUCT_OWNER,
          ownerProduct
        });
      } else {
        dispatch({
          type: types.SHOW_PRODUCT_OWNER_ERROR,
          ownerProduct: []
        });
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadingSingle() {
  return {
    type: types.LOADING_SINGLE
  }
}

export function fetchSingleProductSuccess(data) {
  console.log('fetchSingleProductSuccess');
  browserHistory.push('/product-detail/'+data._id);
  return {
    type: types.SHOW_SINGLE_PRODUCT,
    singleProduct: data
  }
}

export function singleProduct(productId) {
  return function(dispatch) {
    console.log('singleProduct Action');
    const opt = {
      url    : '/product/'+productId,
      method : 'GET',
      data   : {}
    }
    dispatch(loadingSingle());
    callAPI(opt)
      .then(singleProduct => {
        dispatch(fetchSingleProductSuccess(singleProduct));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function detetingProduct() {
  console.log('detetingProduct');
  // console.log(data);
  return {
    type: types.DELETING_PRODUCT,
  }
}

export function deteteProductSuccess() {
  console.log('deteteProductSuccess');
  // console.log(data);
  return {
    type: types.DELETED_PRODUCT,
  }
}

export function delProduct(productId) {
  return function(dispatch) {
    console.log('delProduct Action');
    const opt = {
      url    : '/product/'+productId,
      method : 'DELETE',
      data   : {}
    }
    dispatch({type: types.DELETING_PRODUCT});
    callAPI(opt)
      .then(deleted => {

        dispatch(deteteProductSuccess());
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function showProductOfCategory(categoryId) {
  return function(dispatch) {
    console.log('showProductOfCategory Action');
    const opt = {
      url    : '/product/cat/'+categoryId,
      method : 'GET',
      data   : {}
    }
    dispatch({type: types.FETCHING_DATA});
    return callAPI(opt).then(products => {
      if(Array.isArray(products)) {
        dispatch({
          type: types.SHOW_PRODUCT_CATEGORY,
          products
        });
      } else {
        dispatch({
          type: types.SHOW_PRODUCT_CATEGORY_ERROR
        });
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function canYouLike(arrCategory) {
  return function(dispatch) {
    console.log('canYouLike Action');
    const opt = {
      url    : '/product/suggest',
      method : 'POST',
      data   : {arrCategory}
    }
    dispatch({type: types.FETCHING_DATA});
    return callAPI(opt).then(products => {
      if(Array.isArray(products)) {
        dispatch({
          type: types.CAN_YOU_LIKE,
          products
        });
      } else {
        dispatch({
          type: types.CAN_YOU_LIKE_ERROR
        });
      }
    }).catch(error => {
      throw(error);
    });
  };
}
