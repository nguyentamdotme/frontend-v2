import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { IconButton, Dialog, FlatButton, RaisedButton } from 'material-ui';
import { ActionStore, ContentDrafts, ActionSwapHoriz,
  ContentSend, ContentInbox, ActionNoteAdd } from 'material-ui/svg-icons';
  import { fullWhite,red500, indigo500, cyan500 } from 'material-ui/styles/colors';
import ButtonAddProduct from './ButtonAddProduct'

import ProductOfUser from '../containers/product-of-user'
import * as productActions from '../actions/product-actions';

class ChangeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    // const userId = this.props.user.data._id;
    // console.log('userId');
    // console.log(userId);
    // this.props.actions.showOwnerProduct(userId);
  }

  listOwnerProduct() {
    return(
      <div key='1' className="product-each">
        Gello
      </div>
    );
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  dialogContent() {
    const user = this.props.user;
    const product = this.props.productItem;
    if(user.isLogin) {
      if(user.data._id == product.owner._id ) {
        return(<center><h3>Bạn không thể trao đổi với chính mình</h3></center>);
      } else {
        return (
          <div className="WrapperProductChange">
            <h3>Chọn món hàng bạn muốn dùng để trao đổi</h3>
            <Row>
              <Col xs={9}>
                <ProductOfUser productItem={this.props.productItem}/>
              </Col>
              <Col xs={3}>
                <div className="product-each">
                  <ButtonAddProduct className="btnAdd"/>
                </div>
              </Col>
            </Row>
          </div>
        );
      }
    }else {
      return(<center><h3>Vui lòng đăng nhập</h3></center>);
    }
  }
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
        <FlatButton
          label      = "Trao Đổi"
          primary    = {true}
          backgroundColor= "#ffffff"
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          actions = {actions}
          modal   = {true}
          open    = {this.state.open}
        >
          <div>
            {this.dialogContent()}
          </div>
        </Dialog>
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

export default connect(mapStateToProps, matchDispatchToProps)(ChangeProduct);
