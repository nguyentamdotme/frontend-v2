import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Rating } from 'material-ui-rating';
import { List, ListItem, Divider, Avatar, IconButton } from 'material-ui';
import {
  ActionSwapHoriz, ActionVisibility, ActionShoppingCart, CommunicationPhone,
  CommunicationForum, ActionGrade
} from 'material-ui/svg-icons';

import backend from '../config/backend.config';

class SellerInfo extends React.Component {
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
          <p>Đánh Gía</p>
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

export default SellerInfo;


