import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import * as productActions from '../actions/product-actions';
import * as userActions from '../actions/session-actions';

import backend from '../config/backend.config';

class ProductRequest extends React.Component {
  componentWillMount() {
    this.props.userActions.verify();
    if(this.props.user.data != undefined) {
      console.log('get list owner');
      console.log(this.props.user);
      this.props.actions.showOwnerProduct(this.props.user.data._id);
    }
  }

  delProduct = (idProduct) => {
    console.log('Deleting ');
    this.props.actions.delProduct(idProduct);
    if(!this.props.products.deleting) {
      console.log(this.props.products.deleting);
      console.log('deteted 11');
      this.props.actions.showOwnerProduct(this.props.user.data._id);
    }
  };

  handleChoose = (_id) => {
    browserHistory.push('seller-confirm/'+_id);
  };

  list = (products) => {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
    if(products != undefined && products.length != 0) {
      return products.map(product => {
        const rightIconMenu = (
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem>Sửa</MenuItem>
            <MenuItem onClick={this.delProduct.bind(this, product._id)}>Xóa</MenuItem>
          </IconMenu>
        );
        const image = product.image;
        const imgPro = image.length != 0 ? image[0].filename : '';
        return(
          <ListItem key={product._id} onTouchTap={this.handleChoose.bind(this,product._id)}
            leftAvatar={<Avatar src={backend.url+'/uploads/' + imgPro} />}
            rightIconButton={rightIconMenu}
            primaryText={product.productName}
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>
                  {product.priceOut > 0 ?
                    (product.priceOut).formatMoney() : (product.priceOut * -1).formatMoney()
                  } vnđ
                  </span>
                -- Tình trạng: {product.used} {product.description.substr(0,50)}
              </p>
            }
            secondaryTextLines={2}
            className="eachOwnerProduct"
          />
        );
      });
    }
  };

  content = () => {
    const products = this.props.products;
    const user = this.props.user;
    if(user.data != undefined) {
      console.log('products');
      console.log(products);
      if(!products.ownerProductLoading) {
        if(products.ownerProduct != undefined && products.ownerProduct.length != 0) {
            return(
              <List>
                <Subheader>Sản Phẩm Của Bạn</Subheader>
                {typeof products.ownerProduct == 'object' && this.list(products.ownerProduct)}
              </List>
            );

        } else {
          return(<div className="textCenter"><h1>Không tìm thấy</h1></div>);
        }
      } else {
        return(<div className="textCenter"><h1>Đang tải...</h1></div>);
      }
    } else {
      return(<div className="textCenter"><h1>Vui Lòng Đăng Nhập</h1></div>);
    }
  }
  render() {
    return(
      <div>
        {this.content()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductRequest);
