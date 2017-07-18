import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import * as userActions from '../actions/session-actions';

import { DropDownMenu, Dialog, RaisedButton, FlatButton, TextField, MenuItem, SelectField } from 'material-ui';
import { NavigationExpandMoreIcon, ActionNoteAdd} from 'material-ui/svg-icons';
import { red500, cyan500 } from 'material-ui/styles/colors';

import backend from '../config/backend.config';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openCategory : false,
      isError: false,
      formData : {
        name: {
          firstName: '',
          lastName: ''
        },
        email:'',
        gender: '0', //default 1
        phone: '',
        address: '',
        username: '',
        password: '',
        avatar: this.props.user.imageAvatar
      }
    };
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }

  handleCategoryOpen = () => {
    this.setState({
      openCategory: true,
    });
  };

  handleChange = (event, index, value) => {
    let formData = this.state.formData;
    formData.gender = value;
    this.setState(formData);
  };

  handleChangeInput = (field, e) => {
    console.log(field);
    let formData = this.state.formData;
    switch(field) {
      case 'name'     : {
        const name = e.target.value;
        const arr  = name.split('');
        let nameObj = {
          firstName: '',
          lastName: ''
        }
        if(arr.length < 2) {
          nameObj.firstName = arr[0];
        } else {
          const firstName = name.match(/^\w*\s/)[0].replace(/\s\s+/g, ' ').replace(/^\s+/g, '');
          const lastName = name.split(/^\w*\s/)[1].replace(/\s\s+/g, ' ');
          nameObj = {
            firstName,
            lastName
          }
        }
        formData.name = nameObj;
      };
        break;
      case 'email'    : formData.email = e.target.value;
        break;
      case 'phone'    : formData.phone = e.target.value;
        break;
      case 'address'  : formData.address = e.target.value;
        break;
      case 'username' : formData.username = e.target.value;
        break;
      case 'password' : formData.password = e.target.value;
        break;
      default: null; break;
    }
    this.setState(formData);
  };

  handleSelect = (e) => {
    console.log(e);
  }

  handleUploadAvatar = (e) => {
    this.props.userActions.uploadAvatar(e.target.files[0]);
  };

  onSubmit = () => {
    console.log(this.state);
    const formData = this.state.formData;
    formData.avatar =  this.props.user.imageAvatar;
    this.setState(formData);
    this.props.userActions.register(this.state.formData);
  };

  avatar = () => {
    const user = this.props.user;
    if(!user.uploading && user.imageAvatar != undefined) {
      return(
        <Col xs={6} className="textCenter">
          <div className="AvatarWrapper">
            <img src={backend.url+"/uploads/"+user.imageAvatar.filename} />
          </div>
          <RaisedButton
            label="Avatar"
            labelPosition="before"
            containerElement="label"
            ref="productImage"
            onChange={this.handleUploadAvatar}
          >
            <input ref="file" type="file" name="file" className="btnUpload"/>
          </RaisedButton>
        </Col>
      );
    } else {
      return(
        <Col xs={6} className="textCenter">
          <RaisedButton
            label="Avatar"
            labelPosition="before"
            containerElement="label"
            ref="productImage"
            onChange={this.handleUploadAvatar}
            className="btnAvatarBottom"
          >
            <input ref="file" type="file" name="file" className="btnUpload"/>
          </RaisedButton>
        </Col>
      );
    }
  }

  render() {
    const {name, email, gender, phone, address, username, password} = this.state.formData;
    if(this.props.user.isRegister) {
      alert(this.props.user.message);
    }
    return(
      <div className="registerWrapper">
        <h1 className="textCenter">Đăng ký tài khoản mới</h1>
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit.bind(this)}
            onError={errors => console.log(errors)}
            instantValidate={true}
          >
          <div className="formAddProduct">
            <Row>
              {this.avatar()}
              <Col xs={6} className="textCenter">
                <TextValidator
                  floatingLabelText="Họ Tên"
                  onChange={this.handleChangeInput.bind(this, 'name')}
                  name="name"
                  type="text"
                  fullWidth={true}
                  value={name.firstName + ' ' + name.lastName}
                  validators={['required']}
                  errorMessages={['Không được bỏ trống']}
                />
                <DropDownMenu
                  value={gender}
                  onChange={this.handleChange}
                  autoWidth = {false}
                  className="DropdownCategory"
                  ref="gender"
                >
                  <MenuItem value='0' primaryText="Giới Tính" />
                  <MenuItem value='1' primaryText="Nam" />
                  <MenuItem value='2' primaryText="Nữ" />
                </DropDownMenu>
                <TextValidator
                  floatingLabelText="Email"
                  onChange={this.handleChangeInput.bind(this,'email')}
                  name="email"
                  fullWidth={true}
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                  floatingLabelText="Điện Thoại"
                  fullWidth={true}
                  ref="phone"
                  name="phone"
                  errorText=""
                  onChange={this.handleChangeInput.bind(this,'phone')}
                  validators={['required']}
                  errorMessages={['Không được bỏ trống']}
                  value={phone}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <TextField
                  floatingLabelText="Tài Khoản"
                  fullWidth={true}
                  ref="username"
                  errorText=""
                  value={username}
                  onChange={this.handleChangeInput.bind(this,'username')}
                />
              </Col>
              <Col xs={6}>
                <TextField
                  floatingLabelText="Mật Khẩu"
                  fullWidth={true}
                  type = "password"
                  ref="password"
                  errorText=""
                  value={password}
                  onChange={this.handleChangeInput.bind(this,'password')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextField
                  floatingLabelText="Địa Chỉ"
                  fullWidth={true}
                  ref="address"
                  errorText=""
                  value={address}
                  onChange={this.handleChangeInput.bind(this,'address')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="textCenter">
                <RaisedButton
                  label="Đăng Ký"
                  labelPosition="before"
                  containerElement="label"
                  primary={true}
                  type="submit"
                  className="btnRegister"
                  onClick={this.onSubmit.bind(this)}
                >
                </RaisedButton>
              </Col>
            </Row>
          </div>
          </ValidatorForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
