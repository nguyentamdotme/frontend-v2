import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {browserHistory} from 'react-router';

import Slider from 'react-slick';

import * as productActions from '../actions/product-actions';
import backend from '../config/backend.config';

class SliderRelative extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      idProduct: '',
    };
  }
  componentWillMount() {
    const user = this.props.user;
    const categoryId = this.props.categoryId || null;
    let arrCategory = [];
    if(categoryId != null) {
      arrCategory = [categoryId];
    }
    if(user.isLogin && user.data != undefined && user.data.interest.length != 0) {
        arrCategory = user.data.interest;
    }
    this.props.actions.canYouLike(arrCategory);
  }

  handleClickProduct = (_id, e) => {
    e.preventDefault();
    this.setState({idProduct: _id});
    this.props.actions.singleProduct(_id);
    const link = '/product-detail/'+_id;
    browserHistory.push(link);
  };

  slider = (products) => {
    return products.map(product => {
      if(product.image != undefined) {
        return(
          <a key={product._id} onClick={this.handleClickProduct.bind(this,product._id)}>
            <div className="productRelativeWrapper">
              <img src={backend.url+'/uploads/' + product.image[0].filename} className="imgSlider"/>
              <p className="titleSilder textCenter">{product.productName.substr(0,20)}</p>
            </div>
          </a>
        );
      }
    });
  };

  content = () => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    const user = this.props.user;
    const {data, canYouLike, } = this.props.products;
    let productList = canYouLike;
    if(!this.props.products.loading) {
      if(productList.length == 0 || productList.length == undefined) {
        if(data.length != 0 && data.length != undefined) {
          return(
            <Slider {...settings}>
              {this.slider(data)}
            </Slider>
          );
        } else {
          return(<div className="textCenter"><h3>Không tìm thấy</h3></div>);
        }
      } else {
        return(
          <Slider {...settings}>
            {this.slider(productList)}
          </Slider>
        );
      }
    }else {
      return(
        <div>Đang tải...</div>
      );
    }
  };

  render() {
    return(
      <div>
        <h3 className="removeMargin">Có thể bạn sẽ thích:</h3>
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
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(SliderRelative);
