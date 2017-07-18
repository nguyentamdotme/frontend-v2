import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';

import * as productActions from '../actions/product-actions';
import backend from '../config/backend.config';

class MyProduct extends React.Component {
  componentWillMount() {
    console.log('obj');
    if(this.props.user.data != undefined) {
      console.log('get list owner');
      console.log(this.props.user);
      this.props.actions.showOwnerProduct(this.props.user.data._id);
    }
  }

  delProduct = (idProduct) => {
    alert('Hello');
    console.log('Deleting ');
    // this.props.actions.delProduct(idProduct);
    // if(!this.props.products.deleting) {
    //   console.log(this.props.products.deleting);
    //   console.log('deteted 11');
    //   this.props.actions.showOwnerProduct(this.props.user.data._id);
    // }
  }

  componentWillReceiveProps() {
    // if(!this.props.products.deleting) {
    //   this.props.actions.showOwnerProduct(this.props.user.data._id);
    // }
    this.forceUpdate();
  }

  listProduct() {
    const { products, actions } = this.props;
    if(this.props.user !== null) {
      const user = this.props.user;
      console.log(products);
      if(user.isLogin) {
        const productOwner = products.ownerProduct;
        if(!products.OwnerProductLoading && Array.isArray(productOwner)) {
          // console.log('productOwner');
          // console.log(productOwner);
          return productOwner.map(product => {
            if(product.image !== null) {
              return(
                <Col key={product._id} xs={2} className="productWrapper">
                  <Link to={'/product-detail/' + product._id}>
                    <img src={backend.url+'/uploads/' + product.image[0].filename} className="imageProduct"/>
                  </Link>
                  <div className="price">{product.priceOut}</div>
                  <div className="productDetail">
                    <h3>
                      <Link to={'/product-detail/' + product._id}>
                        {product.productName.substr(0, 40)}...
                      </Link>
                    </h3>
                    <p>{product.description.substr(0, 45)}...</p>
                    <Row around="xs" className="buttonWrapperMyProduct">
                      <Col xs={6} md={6} lg={6} className="defaultButton defaultButtonLeft">
                        <RaisedButton
                          label      = "Sửa"
                          primary    = {true}
                          backgroundColor= "#3F51B5"
                          className="btn"
                        />
                      </Col>
                      <Col xs={6} md={6} lg={6} className="defaultButton defaultButtonRight">

                      </Col>
                    </Row>
                  </div>
                </Col>
              );
            } //end if product.image
          });
        }
      } else {//end  if  check isLogin
        return(
          <div><center><h1>Vui lòng đăng nhập</h1></center></div>
        );
      }
    }
  }

  render() {
    return(
      <Row>
        {this.listProduct()}
      </Row>
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
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(MyProduct);
