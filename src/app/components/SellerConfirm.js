import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { FloatingActionButton } from 'material-ui';
import { ActionGrade, ContentDrafts, ActionSwapHoriz,
  ContentSend, ContentInbox } from 'material-ui/svg-icons';
import SliderRelative from './SliderRelative';
import ProductRequest from './ProductRequest';
import ButtonChange from './ButtonChange';

import * as transactionActions from '../actions/transaction-actions';

import backend from '../config/backend.config';

class SellerConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      productId: this.props.params.productId,
    };
  }

  componentWillMount() {
    const transactionAct = this.props.transactionActions;
    transactionAct.showTransactionOfProduct(this.state.productId);
  }


  formatMoney = function(v,_c, _d, _t){
  let n = v,
      c = isNaN(_c = Math.abs(_c)) ? 0 : _c,
      d = _d == undefined ? "." : _d,
      t = _t == undefined ? "," : _t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  productSelected = () => {
    const transaction = this.props.transaction;
    const progress = transaction.progress;
    console.log('transaction.progressLoading');
    console.log(transaction.progressLoading);
    if(!transaction.progressLoading) {
      if(typeof progress == 'object' && progress != null) {
        if(progress.success.status >= 0) {
          const success = progress.success;
          const owner = success.payWith.owner;
          if(success.isAuction) {
          const avatarImg = owner.avatar == null ? '' : owner.avatar.filename;
            return(
              <div className="productSelected">
                <h3>Thỏa thuận với</h3>
                <img src={backend.url+'/uploads/'+avatarImg} className="avatar"/>
                <p><i>
                  {owner.name.firstName + ' ' + owner.name.lastName}
                </i></p>
                <p>Số tiền bạn sẽ nhận: {this.formatMoney(success.payWith.price)} vnđ</p>
              </div>
            );
          } else {
            const payWith = success.payWith;
            const product = success.payWith.productId;
            if(product != null) {
            const imgProduct = product.image != null ? product.image[0].filename : '';
              return(
                <div className="productSelected">
                  <h3>Trao Đổi Với</h3>
                  <img src={backend.url+'/uploads/' + imgProduct} className="imageProductConfirm"/>
                  <h3>{product.productName}</h3>
                  <p>Gía sản phẩm: {this.formatMoney(product.priceOut)} vnđ</p>
                  <p>Bạn sẽ
                    {
                    parseFloat(payWith.payMore) > 0 ?
                      ' nhận thêm: '+this.formatMoney(payWith.payMore) :
                      ' trả thêm: '+this.formatMoney(payWith.payMore*-1)
                    } vnđ
                  </p>
                </div>
              );
            }
          }
        }
      }
    }
  };

  content = () => {
    const transaction = this.props.transaction;
    const productRequest = transaction.productRequest;
    if(!transaction.loading) {
      if(typeof productRequest == 'object' && productRequest != null) {
        const product = productRequest.productId;
        if(product != undefined) {
          const imgProduct = product.image != null ? product.image[0].filename : '';
          console.log('dsafasfdsafsadasfsdafsd');
          console.log(productRequest.listChange);
          return(
            <div>
              <Row>
                <Col xs={3} className="changeWrapper">
                  <div className="productInfo-change">
                    <h3>Sản Phẩm Của Bạn</h3>
                    <img src={backend.url+'/uploads/' + imgProduct} className="imageProductConfirm"/>
                    <h3>{product.productName}</h3>
                    <p>Gía: {this.formatMoney(product.priceOut)} vnd</p>
                    <p>Miêu tả: {product.description.substr(0,60)}</p>
                  </div>
                  {
                    transaction.progress != undefined ?
                      this.productSelected() : ''
                  }
                </Col>
                <Col xs={1} className="changeWrapper btnChangeCol">
                  <div></div>
                </Col>
                <Col xs={8} className="changeWrapper">
                  {productRequest != null && <ProductRequest listChange={productRequest.listChange} listAuction={productRequest.listAuction} productItem={productRequest._id} productSuccess={productRequest.success}/>}
                  {transaction.progress.success.status == 0 &&
                    <div className="waitConfirm textCenter textRed bgWhite"><h3>Giao dịch của bạn đang chờ xác nhận</h3></div>
                  }
                </Col>
              </Row>
              <Row className="sliderRelative sliderSellerConfirm">
                <Col xs={12}>
                  <SliderRelative/>
                </Col>
              </Row>
            </div>
          );
        }
      } else {
        return(<div className='textCenter'><h1>Không tìm thấy</h1></div>);
      }
    } else {
      return(<div className='textCenter'><h1>Đang tải...</h1></div>);
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
    transaction: state.transactionReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(SellerConfirm);
