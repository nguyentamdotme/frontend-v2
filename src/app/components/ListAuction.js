import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {browserHistory} from 'react-router';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import {FlatButton, Dialog} from 'material-ui';

import * as transactionActions from '../actions/transaction-actions';

class ListAuction extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  componentWillMount() {
    this.loadAuction();
  }

  loadAuction = () => {
    const user = this.props.user;
    if(user != undefined) {
      const transactionAct = this.props.transactionActions;
      transactionAct.showListAuction(user.data._id);
    }
  }

  getFullName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  removeAuction = (trans) => {
    const user = this.props.user;
    const userId = user.data._id;
    const transactionAct = this.props.transactionActions;
    transactionAct.removeAuction(trans.id, trans.index, userId);
  };

  handleOpen = () => {
    if(this.props.user.isLogin) {
      this.setState({openDialog: true});
    } else {
      this.handOpenError('Vui lòng đăng nhập');
    }
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

  dialogContent = () => {
    const trans = this.props.transaction;
    if(!trans.updatingStatus) {
      if(trans.isError) {
        return(<div className="textCenter">{trans.error}</div>);
      } else {
        return(<div className="textCenter">{trans.message}</div>);
      }
    } else {
      return(<div className="textCenter">Đang xử lý   </div>);
    }
  };

  content = () => {
    const trans = this.props.transaction;
    const listAuction = trans.listAuction;
    const user = this.props.user;
    const userId = user.data._id;
    if(!trans.loadingAuction) {
      if(listAuction.length != 0) {
        return listAuction.map( (trans, index) => {
          if(trans != null) {
            const success = trans.success;
            if(success.status <= 0) {
              let payWith = {}
              const i = trans.listAuction.findIndex(e => e.owner == userId);
              payWith = trans.listAuction[i];
              return(
                <TableRow key={index}>
                  <TableRowColumn>{(index + 1)}</TableRowColumn>
                  <TableRowColumn>{trans.productId.productName}</TableRowColumn>
                  <TableRowColumn>
                    {(payWith.price)}
                  </TableRowColumn>
                  <TableRowColumn>
                    <FlatButton
                      label      = "Hủy"
                      primary    = {true}
                      onTouchTap = {this.removeAuction.bind(this, {id:trans._id, index:i})}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            }
          } // end if Row
        });
      } else {
        return(<TableRowColumn colSpan="5">Dữ liệu trống</TableRowColumn>);
      }
    }
  };

  render() {
    const actionButton = [
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />
    ];
    return(
      <div>
        <Table
          height="350px"
          fixedHeader={true}
        >
          <TableHeader
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header">
                <h2 className="textCenter">Danh Sách Đấu Giá</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>STT</TableHeaderColumn>
              <TableHeaderColumn>Tên Sản Phẩm</TableHeaderColumn>
              <TableHeaderColumn>Số Tiền</TableHeaderColumn>
              <TableHeaderColumn>Tùy Chọn</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={true}
          >
            {this.content()}
          </TableBody>
        </Table>
        <Dialog
          actions = {actionButton}
          modal   = {true}
          open    = {this.state.openDialog}
        >
          {this.dialogContent()}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transaction: state.transactionReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ListAuction);
