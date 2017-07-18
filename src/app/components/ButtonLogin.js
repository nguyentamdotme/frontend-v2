import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';
import { blue900, red500, indigo500, fullWhite } from 'material-ui/styles/colors';

import * as sessionActions from '../actions/session-actions';

class ButtonLogin extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
	  	open: false,
	  	loginData: {
	  		username: 'hongtam',
	  		password: 'matkhau'
	  	},
	  	error: ''
	  }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onLogout = this.onLogout.bind(this);
	}

	handleOpen = () => {
	  this.setState({open: true});
	};

	handleClose = () => {
	  this.setState({open: false});
	};

	onChange = (e) => {
		const field = e.target.name;
		const loginData = this.state.loginData;
		loginData[field] = e.target.value;
		return this.setState({loginData});
	};

	onSave = (e) => {
		e.preventDefault();
		const { username, password } = this.state.loginData;
		if(password == '') {
			this.state.error = 'Password is empty';
		}else if(username == '') {
			this.state.error = 'username is empty';
		} else {
			this.state.error = '';
		}
		if(this.state.error == ''){
			this.props.actions.loginUser(this.state.loginData);
			if(this.props.login.isLogin == true) {
				this.setState({open: false});
				return true;
			}
		}else {
			this.props.actions.loginFail(this.state.error);
		}
	};

	onLogout = (e) => {
		this.props.actions.logoutUser();
	};

	renderButtonLogin = () => {
		console.log(this.props.login.isLogin);
		if(this.props.login.isLogin == true) {
			return (
				<RaisedButton
		  		label      = "Đăng Xuất"
		  		primary    = {true}
		  		onTouchTap = {this.onLogout}
		  	/>
			);
		} else {
			return(
				<RaisedButton
		  		label      = "Đăng Nhập"
		  		primary    = {true}
		  		onTouchTap = {this.handleOpen}
		  	/>
			);
		}
	};

	render() {
		const actions = [
	    <FlatButton
	      label      = "Đóng"
	      primary    = {true}
	      onTouchTap = {this.handleClose}
	    />
	  ];

		return(
			<div>
				{this.renderButtonLogin()}
		  	<Dialog
					actions = {actions}
					modal   = {true}
					open    = {this.state.open}
				>
					<div className="formLogin">
						<Grid fluid>
							<Row>
								<Col xs={6}>
									<TextField
							      floatingLabelText = "Tài Khoản"
							      onChange          = {this.onChange}
							      name              = "username"
							      defaultValue			= "hongtam"
							    /><br />
							    <TextField
							      floatingLabelText = "Mật Khẩu"
							      type              = "password"
							      name              = "password"
							      onChange          = {this.onChange}
							      defaultValue			= "matkhau"
							    /><br />
									<p>{this.props.login.error}</p>
							    <RaisedButton
							  		label      = "Đăng Nhập"
							  		primary    = {true}
							  		onTouchTap = {this.onSave}
							  	/>
							  </Col>
							  <Col xs ={6} className="socialLogin">
							  	<h3>Hoặc đăng nhập bằng:</h3>
							  	<RaisedButton
							  		label      = "Facebook"
							  		backgroundColor= "#1565C0"
							  		className="btnSocial"
							  		labelColor={fullWhite}
							  	/>
							  	<RaisedButton
							  		label      = "Google"
							  		backgroundColor= "#F44336"
							  		className="btnSocial"
							  		labelColor={fullWhite}
							  	/>
							  	<hr />
							  	<p>Bạn chưa có tài khoản? <Link to="/register" onClick={this.handleClose}>Đăng Ký</Link> </p>
							  </Col>
					  	</Row>
					  </Grid>
				  </div>
	      </Dialog>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		login: state.authReducer,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogin);
