import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
	Dialog,
	RaisedButton,
	FlatButton,
} from 'material-ui';

import CategoryList from '../containers/category-list';

class CategoryButton extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
	    open: false,
	  };
	}

	handleOpen = () => {
	  this.setState({open: true});
	};

	handleClose = () => {
	  this.setState({open: false});
	};

	render() {
		const actions = [
	    <FlatButton
	      label      = "Đóng"
	      primary    = {true}
	      onTouchTap = {this.handleClose}
	    />
	  ];

	  return (
	  	<div>
		  	<RaisedButton
		  		label      = "Danh Mục Sản Phẩm"
		  		primary    = {true}
		  		onTouchTap = {this.handleOpen}
		  	/>
		  	<Dialog
					title   = "Danh Mục Sản Phẩm"
					actions = {actions}
					modal   = {true}
					open    = {this.state.open}
				>
	        <CategoryList/>
	      </Dialog>
			</div>
	  );
	}
}

export default CategoryButton;
