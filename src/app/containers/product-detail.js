import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import backend from '../config/backend.config';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { IconButton, Paper } from 'material-ui';
import Slider from 'react-slick';
import {
  ActionSwapHoriz,
  ActionVisibility,
  ActionShoppingCart,
} from 'material-ui/svg-icons';

import SliderRelative from '../components/SliderRelative';
import SellerInfo from '../components/SellerInfo';
import ChangeProduct from '../components/ChangeProduct';
import BargainButton from '../components/bargainButton';

import * as productActions from '../actions/product-actions';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      productId: this.props.params.idProductDetail,
    };
  }


  componentWillMount() {
    const productId = this.props.params.idProductDetail;
    this.setState({productId});
    this.props.actions.singleProduct(productId);
  }

  productInfo() {
    if(this.props.product.singleLoading) {
      return(<div>Loading</div>);
    } else {
      const product = this.props.product.singleProduct;
      return(
        <Col xs={3} xsOffset={1}>
          <div className="productInfo">
            <div className="arrow-left"></div>
            <h2>{product.productName}</h2>
            <div className="productPrice">
              Giá: {(product.priceOut).formatMoney()} vnđ
            </div>
            <div className="descriptionProduct">
              <p>{product.description}</p>
            </div>
            <Row around="xs" className="productButton">
              <Col xs={6} md={6} lg={6} className="textCenter">
                <ChangeProduct productItem={product}/>
              </Col>
              <Col xs={6} md={6} lg={6} className="textCenter">
                <BargainButton productSelected={product} className="a"/>
              </Col>
            </Row>
          </div>
        </Col>
      );
    }
  }


  productSlider() {
      if(this.props.product.singleLoading) {
        return(<div>Loading</div>);
      } else {
        const product = this.props.product.singleProduct;
        // console.log(product);
        if(product.image != undefined){
          if(product.image.length != 0) {
            let settings = {
              customPaging: function(i) {
                if(product !== undefined) {
                  return <a><img src={backend.url+'/uploads/'+ product.image[i].filename} className="imageProduct"/></a>
                }
              },
              dots: true,
              dotsClass: 'slick-dots slick-thumb',
              infinite: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
            };
            return(
              <Col xs={4} xsOffset={1}>
                <div className="productSlider">
                  <Slider {...settings} className="productSliderWrapper">
                    {
                      product.image.map((i, key) =>{
                        return(
                          <div key={key}>
                            <img src={backend.url+'/uploads/'+i.filename} className="imageProduct"/>
                          </div>
                        );
                      })
                    }
                  </Slider>
                </div>
              </Col>
            );
          }
        }
      }
  }
  render() {
    const product = this.props.product.singleProduct;
    return(
      <div>
        <Row>
          <Col xs={3}>
            <SellerInfo sellerInfo={product.owner} product={product}/>
          </Col>
            {this.productSlider()}
            {this.productInfo()}
        </Row>
        <Row className="silderRelative">
          <Col xs={12}>
            <SliderRelative/>
          </Col>
        </Row>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    product: state.productReducer,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductDetail);
