import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import * as userActions from '../actions/session-actions';

import { DropDownMenu, Dialog, RaisedButton, FlatButton, TextField, MenuItem, SelectField, DatePicker, Toggle} from 'material-ui';
import { NavigationExpandMoreIcon, ActionNoteAdd} from 'material-ui/svg-icons';
import { red500, cyan500 } from 'material-ui/styles/colors';

import backend from '../config/backend.config'

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user.data;
    if(user != undefined) {
      const DOB = user.DOB != undefined ? new Date(user.DOB) : new Date();
      // const DOB = new Date();
      console.log('user.DOB');
      console.log(DOB);
      this.state = {
        openCategory: false,
        isError: false,
        formData : {
          name: {
            firstName: user.name.firstName || '',
            lastName: user.name.lastName || ''
          },
          email: user.email || '',
          gender: user.gender || '0', //default 0
          phone: user.phone || '',
          DOB: DOB,
          address: user.address || '',
          username: user.username || '',
          password: '',
          avatar: user.avatar || null,
          newpassword: ''
        },
        repassword: '',
        openDialog: false,
        typeDialog: '',
        child: '0',
        genderChild: false,
        name: user.name.lastName + '' + user.name.firstName
      };
    } else {
      this.state = {
        formData : {
          name: {
            firstName:  '',
            lastName: '',
          },
          email    : '',
          gender   : '0',
          phone    : '',
          DOB      : {},
          address  : '',
          username : '',
          avatar   : null,
          password: '',
          newpassword: '',
        },
        repassword: '',
        openDialog: false,
        typeDialog: '',
        child: '0',
        genderChild: false,
        name:''
      }
    }
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }

  delay = (function(){
    let timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  handleOpen = (type) => {
    this.setState({typeDialog: type});
    this.setState({openDialog: true});
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

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

  handleChangePassword = (field, e) => {
    const repassword = e.target.value;
    const newpassword = this.state.formData.newpassword;
    this.setState({repassword: e.target.value});
    if(repassword == newpassword) {
      this.refs.repassword.state.errorText = '';
    } else {
      this.refs.repassword.state.errorText = "Lặp lại mật khẩu không đúng";
    }
  };

  handleChangeInput = (field, e) => {
      // console.log(field);
      let formData = this.state.formData;
      switch(field) {
        case 'name'     : {
            const name = e.target.value;
            console.log('name', name);
            this.setState({name});
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
        case 'newpassword' :  {
          const newpassword = e.target.value;
          formData.newpassword = e.target.value;
          if(newpassword.toString().length >= 8) {
            this.refs.newpassword.state.errorText = '';
          } else {
            this.refs.newpassword.state.errorText = 'Mật khẩu từ 8 ký tự trở lên';
          }
        }
          break;
        default: null; break;
      }

      this.setState(formData);
  };

  handleChangeName = (e) => {
    const name = e.target.value;
    this.setState({name});
  }

  handleUploadAvatar = (e) => {
    this.props.userActions.uploadAvatar(e.target.files[0]);
    // setTimeout(() => {
    //   const user = this.props.user;
    //   if(!user.uploading && user.imageAvatar != null) {
    //     let formData = this.state.formData;
    //     formData.avatar = user.imageAvatar;
    //     this.setState(formData);
    //   }
    // }, 1000);
  };

  onSubmit = () => {
    const user = this.props.user;
    const userId = user.data._id;
    if(!user.uploading && user.imageAvatar != null) {
      let formData = this.state.formData;
      formData.avatar = user.imageAvatar;
      this.setState(formData);
    }
    let data = this.state.formData;

    const arr  = this.state.name.split(' ');
    let nameObj = {
      firstName: '',
      lastName: ''
    }
    if(arr.length < 2) {
      nameObj = {
        firstName: arr[0],
        lastName: ' '
      }
    } else {
      const firstName = arr[arr.length-1];
      arr.pop();
      const lastName = arr.toString().replace(',',' ');
      nameObj = {
        firstName,
        lastName
      }
    }
    data.name = nameObj;
    delete data.password;
    delete data.newpassword;
    // console.log('data', data);
    this.props.userActions.updateProfile(userId, data);
    this.handleOpen('updateProfile');
  };

  onChange = () => {
    const {password, newpassword} = this.state.formData;
    const userId = this.props.user.data._id;
    this.props.userActions.updatePassword(userId, password, newpassword);
    this.handleOpen('updatePassword');
  };

  handleChangeDOB = (event, date) => {
    const formData = this.state.formData;
    formData.DOB = date;
    this.setState(formData);
  };

  handleChangeDate = (event, date) => {
    this.setState({
      childDOB: date,
    });
  };

  handleToggleChild = (event, toggled) => {
    this.setState({
      genderChild: toggled,
    });
  };

  ChildContent = () => {
    return(
      <Row>
        <Col xs={12}>
          <TextField
            floatingLabelText="Số Con"
            fullWidth={true}
            ref="child"
            errorText=""
            value={this.state.child}
            onChange={this.handleChangeInput.bind(this,'child')}
          />
        </Col>
        <Col xs={6}>
          <DatePicker hintText="Ngày sinh của bé" />
        </Col>
        <Col xs={6}>
          <Toggle
            name="genderChild"
            value="genderChild"
            label="Là bé trai?"
            toggled={this.state.genderChild}
            onToggle={this.handleToggleChild}
          />
        </Col>
      </Row>
    );
  }

  DialogContent = () => {
    const type = this.state.typeDialog;
    const user = this.props.user;
    if(type == 'updatePassword') {
      if(!user.uploadingPass) {
        if(user.isError) {
          return(<div className="textCenter"><h3>{user.error}</h3></div>);
        }else {
          return(<div className="textCenter"><h3>{user.message}</h3></div>);
        }
      } else {
        return(<div className="textCenter"><h3>Đang tải</h3></div>);
      }
    }else if(type == 'updateProfile') {
      if(!user.updatingUser) {
        if(user.isError) {
          return(<div className="textCenter"><h3>{user.error}</h3></div>);
        }else {
          return(<div className="textCenter"><h3>{user.message}</h3></div>);
        }
      } else {
        return(<div className="textCenter"><h3>Đang tải</h3></div>);
      }
    } else {
      return(<div className="textCenter"><h3>Có lỗi xảy ra</h3></div>);
    }
  };

  avatar = () => {
    const user = this.props.user;
    if(!user.uploading && user.data.avatar != undefined) {
      return(
        <div className="textCenter">
          <div className="AvatarWrapper">
            <img src={backend.url + "/uploads/"+user.data.avatar.filename} />
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
        </div>
      );
    } else {
      return(
        <div className="textCenter">
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
        </div>
      );
    }
  };

  render() {
    console.log(this.state.openDialog);
    const {name, email, gender, phone, address, username, password, newpassword, DOB} = this.state.formData;
    const user = this.props.user;
    const actionButton = [
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />
    ];
    if(user.isLogin && user.data != undefined) {
      return(
        <div className="registerWrapper">
          <h1 className="textCenter">Thông Tin Tài Khoản</h1>

          <Row>
            <Col xs={6} className="textCenter">
              <Row>
                <TextField
                  floatingLabelText="Họ Tên"
                  fullWidth={true}
                  ref="name"
                  errorText=""
                  value={this.state.name}
                  onChange={this.handleChangeName.bind(this)}
                />
              </Row>
              <Row>
                <Col xs={6}>
                  <TextField
                    floatingLabelText="Tài Khoản"
                    disabled={true}
                    fullWidth={true}
                    ref="username"
                    errorText=""
                    value={username}
                    onChange={this.handleChangeInput.bind(this,'username')}
                  />
                </Col>
                <Col xs={6}>
                  <SelectField
                    value={gender}
                    onChange={this.handleChange}
                    autoWidth = {false}
                    className="DropdownCategory"
                    ref="gender"
                    floatingLabelText="Giới tính"
                  >
                    <MenuItem value={1} primaryText="Nam" />
                    <MenuItem value={2} primaryText="Nữ" />
                  </SelectField>
                </Col>
              </Row>
              <DatePicker
                floatingLabelText="Ngày Sinh"
                fullWidth={true}
                defaultDate={DOB}
              />
              <TextField
                floatingLabelText="Email"
                fullWidth={true}
                ref="email"
                errorText=""
                value={email}
                onChange={this.handleChangeInput.bind(this,'email')}
              />
              <TextField
                floatingLabelText="Điện Thoại"
                fullWidth={true}
                ref="phone"
                errorText=""
                value={phone}
                onChange={this.handleChangeInput.bind(this,'phone')}
              />
              <TextField
                floatingLabelText="Địa Chỉ"
                fullWidth={true}
                ref="address"
                errorText=""
                value={address}
                onChange={this.handleChangeInput.bind(this,'address')}
              />
              <Col xs={12} className="textCenter">
                <RaisedButton
                  label="Cập Nhật"
                  labelPosition="before"
                  containerElement="label"
                  primary={true}
                  type="submit"
                  className="btnRegister"
                  onClick={this.onSubmit.bind(this)}
                >
                </RaisedButton>
              </Col>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12} className="avatarWrapper">
                  {this.avatar()}
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="textCenter">
                  <TextField
                    floatingLabelText="Mật Khẩu Hiện Tại"
                    fullWidth={true}
                    type = "password"
                    ref="password"
                    errorText=""
                    value={password}
                    onChange={this.handleChangeInput.bind(this,'password')}
                  />
                  <TextField
                    floatingLabelText="Mật Khẩu Mới"
                    fullWidth={true}
                    type = "password"
                    ref="newpassword"
                    errorText=""
                    value={newpassword}
                    onChange={this.handleChangeInput.bind(this,'newpassword')}
                  />
                  <TextField
                    floatingLabelText="Lặp Lại Mật Khẩu"
                    fullWidth={true}
                    type = "password"
                    ref="repassword"
                    errorText=""
                    value={this.state.repassword}
                    onChange={this.handleChangePassword.bind(this,'repassword')}
                  />
                  <RaisedButton
                      label="Đổi Mật Khẩu"
                      labelPosition="before"
                      containerElement="label"
                      primary={true}
                      className="btnChangePass"
                      onClick={this.onChange.bind(this)}
                    >
                  </RaisedButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Dialog
            actions = {actionButton}
            modal   = {true}
            open    = {this.state.openDialog}
          >
            {this.DialogContent()}
          </Dialog>
        </div>
      );
    } else {
      return(<div className="textCenter"><h1>Vui lòng đăng nhập</h1></div>);
    }
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

export default connect(mapStateToProps, matchDispatchToProps)(Profiles);
