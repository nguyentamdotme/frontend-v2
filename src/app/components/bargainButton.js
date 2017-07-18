import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as productActions from '../actions/product-actions';
import * as transactionActions from '../actions/transaction-actions';

import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';
import { red500, cyan500 } from 'material-ui/styles/colors';

import backend from '../config/backend.config';

class BargainButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openDialogError: false,
      priceWillPay: 0,
      error: ''
    };
  }

  handleOpen = () => {
    if(this.props.user.isLogin) {
      this.setState({openDialog: true});
    } else {
      this.handOpenError('Vui lòng đăng nhập');
    }
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

  handOpenError = (error) => {
    this.setState({error});
    this.setState({openDialogError: true});
  };

  handleCloseError = () => {
    this.setState({openDialogError: false});
  };

  changePrice = (e) => {
    const priceWillPay = e.target.value.replaceAll(',','');
    this.setState({priceWillPay});
    e.target.value = parseFloat(priceWillPay).formatMoney();

  };

  onSubmit = () => {
    const priceWillPay = this.state.priceWillPay;
    const product = this.props.productSelected;
    if(priceWillPay <= product.priceOut) {
      this.handOpenError('Giá bạn trả không được thấp hơn hoặc bằng giá ban đầu');
    } else {
      if(product.owner._id == this.props.user.data._id) {
        this.handOpenError('Bạn không được trả giá cho sản phẩm của mình');
      } else {
        const item = this.props.productSelected;
        const user = this.props.user.data;
        const price = this.state.priceWillPay;
        this.props.transactionActions.addAuction(item, user, price);
        if(!this.props.transaction.transacting) {
          console.log('close');
          this.handOpenError('Thành Công');
        }else {
          console.log('waiting');
          this.handOpenError('Vui lòng chờ...');
        }
      }
    }
  };


  render() {
    const {categories, actions, productSelected} = this.props;
    const actionButton = [
      <RaisedButton
        label="Đồng Ý"
        primary={true}
        type="submit"
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />,
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />
    ];

    const actionButtonError = [
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleCloseError}
      />
    ];
    const imgProduct = productSelected.image.length != 0 ? productSelected.image[0].filename : '';
    return(
      <div>
        <FlatButton
          label      = "Đấu Giá"
          backgroundColor= {!this.props.className ? '#00bcd4' : '#ffffff'}
          labelStyle = {!this.props.className ? {color: "#ffffff"} : {color: "#00bcd4"}}
          className = {this.props.className || ""}
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          actions = {actionButton}
          modal   = {true}
          open    = {this.state.openDialog}
        >
          <div className='singleProductBargain'>
            <img src={backend.url+'/uploads/' + imgProduct} className="imageProduct"/>
            <center>
              <h3>{productSelected.productName}</h3>
              <p>{productSelected.description.substr(0,180)}</p>
              <i>Số tiền bạn sẽ trả</i>
              <br />
              <TextField
                floatingLabelText="Giá"
                ref="bargainPrice"
                onChange={this.changePrice}
                defaultValue={parseFloat(productSelected.priceOut).formatMoney()}
              /><br />
            </center>
          </div>
        </Dialog>
        <Dialog
          actions = {actionButtonError}
          modal   = {true}
          open    = {this.state.openDialogError}
        >
          <div className='textCenter'>
            {this.state.error}
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products    : state.productReducer,
    user        : state.authReducer,
    transaction : state.transactionReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
    transactionActions: bindActionCreators(transactionActions, dispatch),
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(BargainButton);
