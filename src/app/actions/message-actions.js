import * as types from '../constants/actionType';
import socket from '../middlewares/socket';
import callAPI from '../api/callAPI';

export function getChatList(userId) {
  return function(dispatch){
    const opt = {
      url : '/chat/chatlist',
      method: 'POST',
      data: {userId}
    }
    dispatch({type: types.LOADING_SHOW_CHATLIST});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.SHOW_CHATLIST_SUCCESS,
          chatList: res.data
        });
      } else {
        dispatch({
          type: types.SHOW_CHATLIST_ERROR,
          message: res.message
        });
      }
    }).catch(err => {
      dispatch({
        type: types.SHOW_CHATLIST_ERROR,
        message: err
      });
    });
  }
}

export function getRoomId(userId, chatWithId) {
  if(userId < chatWithId) {
    return userId + '-' + chatWithId;
  } else {
    return chatWithId + '-' + userId;
  }
}

export function toggleChatBox(current, user, chatWith, product) {
  return function(dispatch){
    if(user != null && chatWith != null) {
      if(current) {
        const roomId = getRoomId(user._id, chatWith._id);
        if(product != null) {
          const data = {
            roomId,
            userId: user._id,
            chatWithId: chatWith._id,
            product
          }
          socket.emit('REQUEST_CHAT', data);
          setTimeout(() => {
            console.log('GET MESSAGE in 1');
            socket.emit('GET_MESSAGE_LIST', roomId);
          },1000);
        }else {
          socket.emit('GET_MESSAGE_LIST', roomId);
        }
      }
    }
    dispatch({
      type: types.TOGGLE_CHAT_BOX,
      openChatBox: current,
      chatWith
    });
  }
}

export function getMessageRoom(userId, chatWithId) {
  return function(dispatch) {
    const opt = {
      url : '/chat/room/message',
      method: 'POST',
      data: {userId, chatWithId}
    }
    dispatch({type: types.LOADING_SHOW_MESSAGE});
    return callAPI(opt).then(res => {
      console.log('Load Message', res);
      if(res.status == 200) {
        if(res.roomId != null) {
          socket.emit('TaoRoom', res.roomId);
        }
        dispatch({
          type: types.SHOW_MESSAGE_SUCCESS,
          messageList: res.data,
          roomId: res.roomId
        });
      } else {
        dispatch({
          type: types.SHOW_MESSAGE_ERROR,
          message: res.message
        });
      }
    }).catch(err => {
      dispatch({
        type: types.SHOW_MESSAGE_ERROR,
        message: err
      });
    });
  }
}

export function sendMessage(userId, chatWithId, roomId, content) {
  return function(dispatch) {
    const opt = {
      url : '/chat/send',
      method: 'POST',
      data: {userId, chatWithId, roomId, content}
    }
    dispatch({type: types.LOADING_SEND_MESSAGE});
    return callAPI(opt).then(res => {
      if(res.status == 200) {
        dispatch({
          type: types.SEND_MESSAGE_SUCCESS,
          messageList: res.data,
          roomId: res.roomId
        });
      } else {
        dispatch({
          type: types.SEND_MESSAGE_ERROR,
          message: roomId
        });
      }
    }).catch(err => {
      dispatch({
        type: types.SEND_MESSAGE_ERROR,
        message: err
      });
    });
  }
}
