import * as types from '../constants/actionType';

const initState = {
  type: '',
  openChatBox: false,

  chatListLoading: false,
  chatList: [],

  chatWithLoading: false,
  chatWith: null,
  roomId: null,
  roomExist: false,

  showMessageloading: false,
  showMessage: [],

  sendMessageloading: false,
  // showMessage: [],

  isError: false,
  message: ''
}
export default function(state = initState, action) {
  switch(action.type) {
    case types.TOGGLE_CHAT_BOX:
    {
      return {
        ...state,
        type: types.TOGGLE_CHAT_BOX,
        openChatBox: action.openChatBox,
        chatWith: action.chatWith
      }
    }
    break;

    case types.LOADING_SHOW_CHATLIST:
    {
      return {
        ...state,
        type: types.LOADING_SHOW_CHATLIST,
        chatListLoading: true,
      }
    }
    break;

    case types.SHOW_CHATLIST_ERROR:
    {
      return {
        ...state,
        type: types.SHOW_CHATLIST_ERROR,
        chatListLoading: false,
        isError: true,
        message: action.message
      }
    }
    break;

    case types.SHOW_CHATLIST_SUCCESS:
    {
      return {
        ...state,
        type: types.SHOW_CHATLIST_SUCCESS,
        chatListLoading: false,
        chatList: action.chatList
      }
    }
    break;

    case types.LOADING_SHOW_MESSAGE:
    {
      return {
        ...state,
        type: types.LOADING_SHOW_MESSAGE,
        showMessageloading: true,
        roomId: null
      }
    }
    break;

    case types.SHOW_MESSAGE_ERROR:
    {
      return {
        ...state,
        type: types.SHOW_MESSAGE_ERROR,
        showMessageloading: false,
        isError: true,
        message: action.message,
        roomId: null
      }
    }
    break;

    case types.SHOW_MESSAGE_SUCCESS:
    {
      return {
        ...state,
        type: types.SHOW_MESSAGE_SUCCESS,
        showMessageloading: false,
        showMessage: action.messageList,
        roomId: action.roomId
      }
    }
    break;

    case types.LOADING_SEND_MESSAGE:
    {
      return {
        ...state,
        type: types.LOADING_SEND_MESSAGE,
        sendMessageloading: true,
      }
    }
    break;

    case types.SEND_MESSAGE_ERROR:
    {
      return {
        ...state,
        type: types.SEND_MESSAGE_ERROR,
        sendMessageloading: false,
        isError: true,
        message: action.message,
        roomId: null
      }
    }
    break;

    case types.SEND_MESSAGE_SUCCESS:
    {
      return {
        ...state,
        type: types.SEND_MESSAGE_SUCCESS,
        sendMessageloading: false,
        roomId: action.roomId
      }
    }
    break;

    default:
      return state;
  }
}
