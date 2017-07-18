import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import backend from '../config/backend.config';

import Slider from 'react-slick';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { IconButton, Dialog, FlatButton, TextField, RaisedButton } from 'material-ui';
import { ActionSwapHoriz, ActionVisibility, ActionShoppingCart } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors';

import * as productActions from '../actions/product-actions';
import * as transactionActions from '../actions/transaction-actions';
// import * as UserActions from '../actions/session-actions';


class ProductOfUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      willPay: 0,
      message: '',
      productExchange: {},
      openNotice: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log('Product Of User');
    // console.log(this.props.userActions);
    // this.props.userActions.verify();
    this.props.actions.showOwnerProduct(this.props.user.data._id);
  }

  formatMoney = function(value,_c, _d, _t){
    let n = value,
        c = isNaN(_c = Math.abs(_c)) ? 0 : _c,
        d = _d == undefined ? "." : _d,
        t = _t == undefined ? "," : _t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };

  handleClick = (productExchange, e) => {
    e.preventDefault();
    this.setState({productExchange});
    this.setState({open: true});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpenNotice = (message) => {
    this.setState({message});
    this.setState({openNotice: true});
  };

  handleCloseNotice = () => {
    this.setState({openNotice: false});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const productItem = this.props.productItem;
    const productExchange = this.state.productExchange;
    const price = parseFloat(productItem.priceOut) - parseFloat(productExchange.priceOut);
    let payMore = 0;
    if(this.state.willPay == 0) {
      payMore = price;
    } else {
      payMore = this.state.willPay;
    }
    this.props.transactionActions.addChange(productItem, productExchange, payMore);
    this.setState({open: false});
    this.setState({openNotice: true});
  };

  handleChange = (e) => {
    let willPay = e.target.value.replaceAll(',','');
    if(willPay == '') {
      willPay = 0;
    }
    this.setState({willPay});
    e.target.value = this.formatMoney(willPay);
  }

  contentDialog() {
    const productItem = this.props.productItem;
    const productExchange = this.state.productExchange;
    const willPay = parseFloat(productItem.priceOut) - parseFloat(productExchange.priceOut);
    const productExchangeImage = productExchange.image !== undefined ? productExchange.image[0].filename : "";
    if(productItem != undefined) {
      return(
        <div>
          <Row>
            <Col xs={3} className="textCenter">
              <h3>Sản Phẩm Trao Đổi</h3>
              <img src={backend.url+'/uploads/' + productItem.image[0].filename} className="imagePreviewChange"/>
              {productItem.productName}
              <br/>
              <i className="textBule">Giá: {this.formatMoney(productItem.priceOut)} vnđ</i>
            </Col>
            <Col xs={3} className="textCenter">
              <h3>Sản Phẩm Của Bạn</h3>
              {
                productExchange.image !== undefined ? "" : ""
              }
              <img src={backend.url+'/uploads/' + productExchangeImage} className='imagePreviewChange'/>
              {productExchange.productName}
              <br/>
              <i className="textBule">Giá: {this.formatMoney(productExchange.priceOut)} vnđ</i>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="textCenter">
              <p>
                Bạn sẽ
                <i className="textRed">
                {willPay > 0 ? ' trả '+this.formatMoney(willPay)+' vnđ ' : ' nhận '+this.formatMoney(willPay*-1)+' vnđ '}
                </i>
                khi trao đổi sản phẩm này
              </p>
              <br/>
              <i>hoặc</i>
              <br/>
              <TextField
                floatingLabelText={
                  willPay > 0 ?
                  'Điều chỉnh số tiền bạn phải trả' :
                  'Điều chỉnh số tiền bạn sẽ nhận'
                }
                ref="payMore"
                onChange={this.handleChange}
              />
              <br/>
            </Col>
          </Row>
        </div>
      );
    }
  }


  list(products) {
    return products.ownerProduct.map(product => {
      if(product.image !== null) {
        return(
          <div key={product._id}>
            <a href="#" onClick={this.handleClick.bind(this, product)} className="product-each">
              <img src={backend.url+'/uploads/' + product.image[0].filename} className="imageProductOwner"/>
              {product.productName.substr(0,30)}
            </a>
          </div>
        );
      }
    });
  }

  slider() {
    const { products } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    if(products.ownerProduct[0]!== undefined) {
      return(
        <Slider {...settings}>
          {this.list(products)}
        </Slider>
      );
    }
  }
  render() {
    const actions = [
      <RaisedButton
        label      = "Đồng Ý"
        primary    = {true}
        onTouchTap = {this.handleSubmit}
      />,
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />
    ];
    const actionsNotice = [
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleCloseNotice}
      />
    ];
    const transaction = this.props.transaction;
    return (
      <div>
        <div className="SliderProductOfUser">
        {this.slider()}
        </div>
        <Dialog
          actions = {actions}
          modal   = {true}
          open    = {this.state.open}
        >
          <div>
            {this.contentDialog()}
          </div>
        </Dialog>
        <Dialog
          actions = {actionsNotice}
          modal   = {true}
          open    = {this.state.openNotice}
        >
          <div className="textCenter">
            {
              !transaction.transacting ?
                transaction.message :
                'Vui lòng chờ'
            }
          </div>
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    products: state.productReducer,
    user: state.authReducer,
    transaction: state.transactionReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
    transactionActions: bindActionCreators(transactionActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductOfUser);
