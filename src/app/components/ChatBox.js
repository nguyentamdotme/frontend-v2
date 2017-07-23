import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import { RaisedButton, TextField} from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { red500, cyan500 } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Send from 'material-ui/svg-icons/content/send';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';

import * as messageActions from '../actions/message-actions';
import backend from '../config/backend.config';

import socket from '../middlewares/socket';

import ListChatContent from '../containers/ListChatContent'

class ChatBox extends React.Component{
  constructor(props){
    super(props);
    this.state={
      open: false,
      chatOpen: false,
      message: null,
      messageList:[],
      chatList: [],
      newMessage: '',
      openNotice: false,
    }
  }

  handleToggle = () =>{
    const openChatList = this.state.open;
    if(!openChatList) {
      const user = this.props.user.data;
      if(user != undefined && !this.state.open) {
        socket.emit('GET_CHATLIST', user);
      }
      socket.on('CHATLIST', data => {
        console.log(data);
        this.setState(data);
      });
    }
    this.setState({open: !openChatList});
  };

  handleCloseChat = () => {
    const isOpen = this.props.message.openChatBox;
    this.props.messageActions.toggleChatBox(!isOpen, null, null, null);
  };

  chatWith = (chatWith) => {
    const user = this.props.user.data;
    const isOpen = this.props.message.openChatBox;
    this.props.messageActions.toggleChatBox(!isOpen, user, chatWith, null);
    this.setState({open: false});
  };
  handleRequestClose = () => {
    this.setState({
      openNotice: false,
    });
  };

  getName = (name) => {
    return name.firstName + ' ' + name.lastName;
    // rightAvatar={
    //   <Avatar
    //     src={backend.url+'/uploads/'+mess.createdBy.avatar.filename}
    //     size={30}
    //     style={{margin:'2px'}}
    //   />
    // }
  };

  showMessage = () => {
    const user = this.props.user;
    if(user != undefined) {
      const userData = user.data;
      const listMessage = this.state.messageList;
      console.log(listMessage);
      console.log(this.state);
      if(listMessage != undefined) {
        if(listMessage.length != 0) {
          return listMessage.map((mess, i) => {
            if(mess.createdBy._id == userData._id) {
              return(
                <li key={i} disabled={true}>
                  <div className="msgUser">
                    <Row>
                      <Col xs={10}>
                        <span>{mess.content}</span>
                      </Col>
                      <Col xs={2} className="avaChat">
                        <Avatar
                          src={backend.url+'/uploads/'+mess.createdBy.avatar.filename}
                          size={30}
                          style={{margin:'2px'}}
                        />
                      </Col>
                    </Row>
                  </div>
                </li>
              );
            } else {
              return(
                <li key={i} disabled={true}>
                  <div className="msgGuest">
                    <Row>
                      <Col xs={2} className="avaChat">
                        <Avatar
                          src={backend.url+'/uploads/'+mess.createdBy.avatar.filename}
                          size={30}
                          style={{margin:'2px'}}
                        />
                      </Col>
                      <Col xs={10}>
                        <span>{mess.content}</span>
                      </Col>
                    </Row>
                  </div>
                </li>
              );
            }
          });
        }
      }
    }
  };

  handleOnchange = (e) => {
    const message = e.target.value;
    if(message=='') {
      this.setState({message: null});
    } else {
      this.setState({message});
    }
  };

  sendMessage = () => {
    const message = this.refs.message.input.value;
    const userId = this.props.user.data._id;
    const chatWithId = this.props.message.chatWith._id;
    const roomId = this.props.message.roomId;
    if(message == '') {
      alert('Bạn chưa nhập tin nhắn');
    } else {
      const data = {
        createdBy: userId,
        message
      }
      socket.emit('user-chat', data);
      this.refs.message.input.value = '';
    }
  };

  getName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  list = () => {
    const chatList = this.state.chatList;
    if(chatList.length > 0) {
      return chatList.map((listItem,i) => {
        const withUser = listItem.withUser
        return(
          <ListItem key={i}
            onTouchTap={this.chatWith.bind(this, withUser)}
            primaryText={this.getName(withUser.name)}
            leftAvatar={
              <Avatar src={backend.url+'/uploads/'+withUser.avatar.filename}/>
            }
          />
        );
      });
    }
  };

  render() {
    socket.on('MESSAGE_LIST', message => {
      console.log('message', message);
      this.setState({messageList: message});
    });
    socket.on('NEW_MESSAGE', newMsg => {
      const msg = 'Có tin nhắn từ '+ this.getName(newMsg.createdBy.name);
      this.setState({openNotice: true, newMessage: msg});
    });
    const ListChat = () => (
      <IconButton
        onTouchTap={this.handleToggle}
      >
        <MoreVertIcon color='#ffffff'/>
      </IconButton>
    );
    const chatWith = this.props.message.chatWith;
    const message = this.props.message;
    return(
      <div>
      { this.props.message.openChatBox && chatWith != null &&
        <div className="wrapperChat">
          <AppBar
            titleStyle={{"lineHeight": "inherit", "fontSize":"1.3em"}}
            title={this.getName(chatWith.name)}
            className="chatTitle"
            onLeftIconButtonTouchTap={this.handleCloseChat}
            iconElementLeft={
              <IconButton className="iconTitleWrapper">
                <NavigationClose className="iconTile"/>
              </IconButton>
            }
            iconElementRight={
              <ListChat />
            }
          />
          <ul className="chatContent" ref="chatContent">
            {!message.showMessageLoading && this.showMessage()}
          </ul>
          <div className="chatInputWrapper">
            <TextField
              hintText="Chat..."
              className="chatInput"
              ref="message"
            />
            <FlatButton
              icon={<Send color='#ffffff' className="iconChatBtn"/>}
              className="chatButton"
              backgroundColor='#00bcd4'
              onTouchTap={this.sendMessage}
            />
          </div>
        </div>
      }
        <Drawer width={300} openSecondary={true} open={this.state.open} >
          <AppBar
            title="Danh Sách Chat"
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementLeft={
              <IconButton className="iconTitleWrapper">
                <NavigationClose className="iconTile"/>
              </IconButton>
            }
          />
          <List>
          {
            this.props.user.data != null &&
            this.list()
          }
          </List>
        </Drawer>
        { this.props.user.data != null &&
          <FloatingActionButton
           className="floatBtnChatbox"
            onTouchTap={this.handleToggle}
          >
            <CommunicationForum color='#ffffff'/>
          </FloatingActionButton>
        }
        <Snackbar
          open={this.state.openNotice}
          message={this.state.newMessage}
          autoHideDuration={1000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authReducer,
    message: state.messageReducer,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    messageActions: bindActionCreators(messageActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatBox);
