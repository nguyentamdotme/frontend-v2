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

class ListChange extends React.Component{
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
      transactionAct.showListChange(user.data._id);
    }
  }

  getFullName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  removeChange = (trans) => {
    console.log('Remove');
    const user = this.props.user;
    const userId = user.data._id;
    const transactionAct = this.props.transactionActions;
    transactionAct.removeChange(trans.id, trans.index, userId);
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
    const listChangeRequest = trans.listChange;
    const user = this.props.user;
    const userId = user.data._id;
    if(!trans.loadingChange) {
      if(listChangeRequest.length != 0) {
        return listChangeRequest.map( (transItem, index) => {
          if(transItem != null) {
            const success = transItem.success;
            if(success.status <= 0) {
              const listChange = transItem.listChange;
              if(listChange.length > 0) {
                return listChange.map((changeItem, i) => {
                  if(changeItem.productId.owner == userId) {
                    return(
                      <TableRow key={i}>
                        <TableRowColumn>{(i + 1)}</TableRowColumn>
                        <TableRowColumn>{transItem.productId.productName}</TableRowColumn>
                        <TableRowColumn>
                          {changeItem.productId.productName}
                        </TableRowColumn>
                        <TableRowColumn>
                          {(changeItem.payMore)}
                        </TableRowColumn>
                        <TableRowColumn>
                          <FlatButton
                            label      = "Hủy"
                            primary    = {true}
                            onTouchTap = {this.removeChange.bind(this, {id:transItem._id, index:i})}
                          />
                        </TableRowColumn>
                      </TableRow>
                    );
                  }
                });
              }
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
              <TableHeaderColumn colSpan="5" tooltip="Super Header">
                <h2 className="textCenter">Danh Sách Yêu Cầu Trao Đổi</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>STT</TableHeaderColumn>
              <TableHeaderColumn>Sản Phẩm Đổi</TableHeaderColumn>
              <TableHeaderColumn>Sản Phẩm Của Bạn</TableHeaderColumn>
              <TableHeaderColumn>Số Tiền Được Nhận</TableHeaderColumn>
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

export default connect(mapStateToProps, matchDispatchToProps)(ListChange);
