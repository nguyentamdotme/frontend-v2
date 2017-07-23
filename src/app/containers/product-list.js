import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import backend from '../config/backend.config';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';
import { IconButton, FlatButton } from 'material-ui';
import { ActionSwapHoriz,	ActionVisibility,	ActionShoppingCart } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors';

import BargainButton from '../components/bargainButton';
import * as productActions from '../actions/product-actions';

class ProductList extends React.Component {
	componentWillMount() {
		this.props.actions.showProduct();
	}

	list() {
	const { products, actions } = this.props;
		if(Array.isArray(products.data) && !products.loading) {
			return products.data.map(product => {
				// console.log(product.image.length);
				const imgProduct = product.image.length != 0 && product.image[0] != undefined ? product.image[0].filename : '';
				// console.log(imgProduct);
				if(product.status == 1) {
					return(
						<Col key={product._id} xs={2} className="productWrapper">
					  	<Link to={'/product-detail/' + product._id}>
					  		<img src={backend.url+'/uploads/' + imgProduct} className="imageProduct"/>
					  	</Link>
					  	<div className="price">{(product.priceOut).formatMoney()} vnđ</div>
					  	<div className="productDetail">
					  		<h3>
					  			<Link to={'/product-detail/' + product._id}>
					  				{product.productName.substr(0, 35)}...
					  			</Link>
					  		</h3>
					  		<p>Miêu Tả: {product.description.substr(0, 40)}...</p>
					  		<Row around="xs" className="buttonWrapper">
					  			<Col xs={6} md={6} lg={6} className="">
					  				<Link to={'/product-detail/' + product._id}>
											<FlatButton
	                      label      = "Xem"
	                      backgroundColor= "#00bcd4"
	                      labelStyle = {{color: "#ffffff"}}
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
				} // end if status
			});
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
