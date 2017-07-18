import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Slider from 'react-slick';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import * as transactionActions from '../actions/transaction-actions';

import backend from '../config/backend.config';

class ProductRequest extends React.Component {
  handleAuction = (product, e) => {
    e.preventDefault();
    const productItem = this.props.productItem;
    this.props.transactionActions.addProgress(productItem, product, true);
  }

  listAuction = () => {
    const listAuction = this.props.listAuction;
    if(listAuction.length != 0) {
      return listAuction.map(auction => {
        const AvatarImg = auction.owner.avatar != null ? auction.owner.avatar.filename : '';
        return (
          <Col xs={4} key={auction._id}>
            <List>
              <ListItem
                onTouchTap={this.handleAuction.bind(this, auction)}
                leftAvatar={<Avatar src={backend.url + '/uploads/'+AvatarImg} />}
                primaryText={auction.owner.name.firstName + auction.owner.name.lastName}
                className="itemAuction"
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>
                      {(auction.price).formatMoney()} vnđ
                    </span>
                  </p>
                }
                secondaryTextLines={2}
              />
            </List>
          </Col>
        );
      });
    } else {
      return(<div className="textCenter"><h1>Không tìm thấy</h1></div>);
    }
  };

  handleExchange = (product, e) => {
    e.preventDefault();
    const productItem = this.props.productItem;
    this.props.transactionActions.addProgress(productItem, product, false);
  };

  slider = (listChange) => {
    if(listChange != null) {
      return listChange.map(e => {
        console.log('e');
        console.log(e);
        if(e.productId != null){
          const img = e.productId.image != null ? e.productId.image[0].filename : '';
          return(
            <a href="#" key={e._id} onClick={this.handleExchange.bind(this, e)}>
              <div className="productRequest">
                <img src={backend.url + '/uploads/'+img} className="imageSliderRequest"/>
                <div className="prouctInfo-request">
                    <h3>{e.productId.productName}</h3>
                    <p>{(e.productId.description).substr(0,50)}</p>
                    <p>Tình trạng: {e.productId.used}</p>
                    <p>Giá sản phẩm: {(e.productId.priceOut).formatMoney()}</p>
                    <p>
                    {
                      e.payMore > 0 ? 'Sẽ nhận '+(e.payMore).formatMoney() : 'Sẽ trả '+(e.payMore*-1).formatMoney()
                    } vnd nếu trao đổi
                    </p>
                    <p>Đồng Ý Trao Đổi</p>
                </div>
              </div>
            </a>
          );
        }
      });
    }
  };

  block = () => {
    const product = this.props.productSuccess;
    if(product.status > 0) {
      return(
        <div className="BlockContent">
          <div className="BlockContentText textCenter">
            <h1>Giao dịch đã thực hiện. chúng tôi đang giao hàng đến bạn</h1>
          </div>
        </div>
      );
    }
  };

  listChange = () => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true
    };
    const listChange = this.props.listChange;
    console.log('tam listChange');
    console.log(listChange);
    if(listChange != null) {
      return(
        <Slider {...settings} className="sliderProductRequest">
          {this.slider(listChange)}
        </Slider>
      );
    } else {
      return(<div className="textCenter"><h1>Không tìm thấy</h1></div>);
    }
  }

  render() {
    return(
      <div className="requestWrapper">
        <div className="listChangeWrapper">
          <h3>Sản phẩm muốn trao đổi</h3>
          {this.listChange()}
        </div>
        <div className="listAuction">
          <h3>Danh sách đấu gía</h3>
          <Row>
          {this.listAuction()}
          </Row>
        </div>
        {this.block()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transaction: state.transactionReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductRequest);
