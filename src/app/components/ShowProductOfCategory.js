import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';
import { IconButton, FlatButton } from 'material-ui';
import { ActionSwapHoriz, ActionVisibility, ActionShoppingCart } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors';

import backend from '../config/backend.config';

import BargainButton from '../components/bargainButton';
import * as productActions from '../actions/product-actions';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOfCategory: null
    }
  }

  // componentWillMount() {

  // }

  list() {
    const { products, actions } = this.props;
    if(!products.loading) {
      if(products.data[0] != undefined) {
        return products.data.map(product => {
          if(product.image !== null) {
            return(
              <Col key={product._id} xs={2} className="productWrapper">
                <Link to={'/product-detail/' + product._id}>
                  <img src={backend.url+'/uploads/' + product.image[0].filename} className="imageProduct"/>
                </Link>
                <div className="price">{(product.priceOut).formatMoney()}</div>
                <div className="productDetail">
                  <h3>
                    <Link to={'/product-detail/' + product._id}>
                      {product.productName.substr(0, 35)}...
                    </Link>
                  </h3>
                  <p>{product.description.substr(0, 40)}...</p>
                  <Row around="xs" className="buttonWrapper">
                    <Col xs={6} md={6} lg={6} className="defaultButton defaultButtonLeft">
                      <Link to={'/product-detail/' + product._id}>
                        <RaisedButton
                          label      = "Xem"
                          primary    = {true}
                          backgroundColor= "#3F51B5"
                        />
                      </Link>
                    </Col>
                    <Col xs={6} md={6} lg={6} className="defaultButton defaultButtonRight">
                      <BargainButton productSelected={product}/>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          } //end if product.image
        });
      } else {
        return (<div className="textCenter"><h1>Không tìm thấy sản phẩm</h1></div>);
      }
    } else {
      return(<div className="textCenter">Đang tải...</div>);
    }
  }
  render() {
    return (
      <Row>
        {this.list()}
      </Row>
    );
  }
}


function mapStateToProps(state) {
  return {
    products: state.productReducer,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductList);
