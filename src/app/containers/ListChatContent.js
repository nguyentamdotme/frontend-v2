import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Clear from 'material-ui/svg-icons/content/clear';

import backend from '../config/backend.config';
import * as messageActions from '../actions/message-actions';

class ListChatContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: false,
      chatOpen: false
    }
  }

  componentWillMount() {
    const user = this.props.user.data;
    this.props.messageActions.getChatList(user._id);
  }
  getName = (name) => {
    return name.firstName + '' + name.lastName;
  };

  list = (chatList) => {
    console.log('Chat List ', chatList);
    if(chatList.length != 0) {
      return chatList.map(room => {
        const withUser = room.withUser;
        return(
          <ListItem key={room._id}
            primaryText={this.getName(withUser.name)}
            leftAvatar={
              <Avatar src={backend.url+'/uploads/'+withUser.avatar.filename}/>
            }
          />
        );
      });
    } else {
      return(
        <ListItem
          primaryText="Trống"
          leftIcon={<Clear />}
        />
      );
    }
  };

  render() {
    const user = this.props.user.data;
    const message = this.props.message;
    const chatList = message.chatList;
    return(
      <div>
      { !message.chatListLoading &&
        <List>
          {chatList != undefined && this.list(chatList)}
        </List>
      }
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
export default connect(mapStateToProps, matchDispatchToProps)(ListChatContent);
