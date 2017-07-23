import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from 'react-flexbox-grid';
import { Rating } from 'material-ui-rating';
import { List, ListItem, Divider, Avatar, IconButton } from 'material-ui';
import {
  ActionSwapHoriz, ActionVisibility, ActionShoppingCart, CommunicationPhone,
  CommunicationForum, ActionGrade
} from 'material-ui/svg-icons';

import backend from '../config/backend.config';
import * as messageActions from '../actions/message-actions';
import socket from '../middlewares/socket';

class SellerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openChat: false
    }
  }

  handleOpenChat = () => {
    const isOpen = this.state.openChat;
    this.setState({openChat: !isOpen});
    this.props.messageActions.toggleChatBox(!isOpen, this.props.user.data, this.props.sellerInfo, this.props.product);
    const roomId = this.props.message.roomId;
    if(roomId != null) {
      socket.emit('TaoRoom', roomId);
      socket.room = roomId;

      socket.on('user-chat', (data) => {
        io.sockets.in(socket.room).emit('server-chat',data);
      });
    }
  }
  render() {
    const user = this.props.sellerInfo;
    if(user != undefined){
      return(
        <div className="sellerWrapper">
          <List>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar src={backend.url + '/uploads/'+user.avatar.filename} />
              }
            >
              {
                user !== undefined ?
                  user.name.firstName + ' ' + user.name.lastName : ''
              }
            </ListItem>
          </List>
          <p>Đánh Giá</p>
          <Rating
            value={3}
            max={5}
            onChange={(value) => console.log(`Rated with value ${value}`)}
          />
          <Row around="xs" className="productButton">
            <Col xs={4} md={4} lg={4} className="buttonPrimary">
              <IconButton tooltip="Đánh Gía" touch={true}
                tooltipPosition="bottom-center" className="iconGrey"
                color="#ffffff"
                >
                <ActionGrade />
              </IconButton>
            </Col>
            <Col xs={4} md={4} lg={4} className="buttonPrimary">
              <IconButton tooltip="Nhắn Tin" touch={true}
                tooltipPosition="bottom-center" className="iconGrey"
                color="#ffffff"
                onTouchTap={this.handleOpenChat}
                >
                <CommunicationForum />
              </IconButton>
            </Col>
            <Col xs={4} md={4} lg={4} className="buttonPrimary">
              <IconButton tooltip="Gọi Điện" touch={true}
                tooltipPosition="bottom-center" className="iconGrey"
                color="#ffffff"
                >
                <CommunicationPhone />
              </IconButton>
            </Col>
          </Row>
        </div>
      );
    } else {
      return(<div className="textCenter">Đang Tải</div>);
    }
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

export default connect(mapStateToProps, matchDispatchToProps)(SellerInfo);


