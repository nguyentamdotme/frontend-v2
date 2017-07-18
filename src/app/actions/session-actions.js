import {browserHistory} from 'react-router';
import * as types from '../constants/actionType';
import callAPI, {upload}  from '../api/callAPI';
import { push } from 'react-router-redux';

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function loginFail(error) {
  console.log('LoginFailed ' + error);
  return {type: types.LOGIN_FAIL, error};
}

export function loginUser(loginData) {
  return function(dispatch) {
    const opt = {
      url: '/user/signin',
      method: 'POST',
      data: {
        username: loginData.username,
        password: loginData.password
      }
    }
    return callAPI(opt).then(res => {
      if(typeof res == 'object') {
        if(res.status == 401) {
          dispatch(loginFail(res.data));
        } else {
          dispatch(loginSuccess(res.user));
          sessionStorage.setItem('accessToken', res.accessToken);
          browserHistory.push('/');
        }
      } else {
        dispatch(loginFail('Không thể kết nối server!'));
      }
    })
    .catch(err => err);
  }
}

export function logoutUser() {
  sessionStorage.removeItem('accessToken');
  browserHistory.push('/');
  return {type: types.LOGOUT_SUCCESS};
}

export function register(data) {
  return function(dispatch) {
    const opt = {
      url: '/user/signup',
      method: 'POST',
      data
    }
    dispatch({type: types.REQUESTING});
    return callAPI(opt).then(res => {
      if(typeof res == 'object') {
        // console.log(res);
        if(res.status == 401) {
          dispatch({type: types.REGISTER_FAIL});
        } else {
          //sessionStorage.setItem('accessToken', res.accessToken);
          dispatch({
            type: types.REGISTER_SUCCESS,
            user: res.user,
            message: 'Đăng ký thành công, vui lòng đăng nhập'
          });
          // dispatch(loginSuccess(res.user));
          browserHistory.push('/');
        }
      } else {
        dispatch(loginFail('Không thể kết nối server!'));
      }
    })
    .catch(err => err);
  }
}

export function uploadAvatar(files) {
  return function(dispatch) {
    return upload(files)
    .then(res => {
      if(res.status == 401) {
        dispatch({
          type: types.UPLOAD_AVATAR_ERROR,
          data: 'Upload error!',
          imageAvatar: null
        });
      } else {
        dispatch({
          type: types.UPLOAD_AVATAR_SUCCESS,
          imageAvatar: res
        });
      }
    }).catch(error => {
      console.log(error);
      throw(error);
    });
  }
}

export function updateProfile(userId, data) {
  return function(dispatch) {
    // const data = { password, newpassword};
    const opt = {
      url: '/user/'+userId,
      method: 'PUT',
      data
    };
    dispatch({type: types.UPDATING_USER});
    return callAPI(opt).then(res => {
      if(typeof res == 'object') {
        if(res.status == 401) {
          dispatch({type: types.UPDATE_USER_ERROR, error: res.message});
        } else {
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
            user: res.user,
            message: res.message
          });
        }
      } else {
        dispatch({type: types.UPDATE_USER_ERROR, error: "Server không hồi đáp"});
      }
    })
    .catch(err => err);
  }
}

export function updatePassword(userId, password, newpassword) {
  return function(dispatch) {
    // const data = { password, newpassword};
    const opt = {
      url: '/user/'+userId+'/password',
      method: 'POST',
      data: { password, newpassword}
    };
    dispatch({type: types.UPLOADING_PASS});
    return callAPI(opt).then(res => {
      if(typeof res == 'object') {
        if(res.status == 401) {
          dispatch({type: types.UPLOAD_PASS_ERROR, error: res.message});
        } else {
          dispatch({
            type: types.UPLOAD_PASS_SUCCESS,
            user: res.user,
            message: res.message
          });
        }
      } else {
        dispatch({type: types.UPLOAD_PASS_ERROR, error: "Server không hồi đáp"});
      }
    })
    .catch(err => err);
  }
}

export function verify() {
  return function(dispatch) {
    const opt = {
      url: '/user/verify/accesstoken',
      method: 'GET'
    };
    return callAPI(opt).then(res => {
      console.log('res');
      console.log(res);
      if(typeof res == 'object') {
        if(res.status == 200) {
          dispatch(loginSuccess(res.data));
        }
      }
    })
    .catch(err => err);
  }
}

export function showAllUser() {
  console.log('gooooooo');
  return function(dispatch) {
    const opt = {
      url: '/user',
      method: 'GET'
    };
    dispatch({type: types.LOADING_All_USER});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.LOAD_ALL_USER_SUCCESS,
          allUser: res.data,
          message: res.message
        });
      } else {
        dispatch({
          type: types.LOAD_ALL_USER_ERROR,
          error: res.message,
          isError: true
        });
      }
    })
    .catch(err => err);
  }
}
