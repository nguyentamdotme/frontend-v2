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

class ListTransaction extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  componentWillMount() {
    const transactionAct = this.props.transactionActions;
    transactionAct.showTransaction();
  }

  getFullName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  getStatus = (value) => {
    switch(value) {
      case 0: return 'Chờ Xử Lý'; break;
      case 1: return 'Đang Giao Hàng'; break;
      case 2: return 'Hoàn Tất'; break;
      case 3: return 'Trả Hàng'; break;
      default: return 'Có Lỗi Xảy Ra';
    }
  };

  handleChange = (transId, e) => {
    const transactionAct = this.props.transactionActions;
    const value = e.target.value;
    let productStatus = -1;
    if(value == 0 || value == 3) {
      productStatus = 1;
    } else {
      productStatus = 0;
    }
    transactionAct.updateStatusTrans(transId, value, productStatus);
    this.setState({openDialog: true});
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
    const data = trans.allTransaction;
    if(!trans.loadingAllTrans) {
      if(data.length != 0) {
        return data.map( (row, index) => {
          if(row) {
            const success = row.success;
            if(success.status >= 0) {
              return(
                <TableRow key={index}>
                  <TableRowColumn>{(index + 1)}</TableRowColumn>
                  <TableRowColumn>{row.productId.productName}</TableRowColumn>
                  <TableRowColumn>
                    {success.isAuction ? 'Đấu gía' : 'Trao Đổi'}
                  </TableRowColumn>
                  <TableRowColumn>
                    {success.isAuction ?
                      this.getFullName(success.payWith.owner.name) :
                      success.payWith.productId.productName
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    {success.isAuction ?
                      (success.payWith.price).formatMoney() :
                      (success.payWith.payMore).formatMoney()
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.getStatus(success.status)}
                  </TableRowColumn>
                  <TableRowColumn>
                    <select onChange={this.handleChange.bind(this,row._id)}>
                      <option value="-2" readOnly="true">Chọn</option>
                      <option value="0">Chờ Xử Lý</option>
                      <option value="1">Đang Giao Hàng</option>
                      <option value="2">Hoàn Tất</option>
                      <option value="3">Trả Hàng</option>
                    </select>
                  </TableRowColumn>
                </TableRow>
              );
            }
          } // end if Row
        });
      } else {
        return(<TableRowColumn colSpan="7">Dữ liệu trống</TableRowColumn>);
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
              <TableHeaderColumn colSpan="7" tooltip="Super Header" style={{textAlign: 'center'}}>
                <h2 className="textCenter">Danh Sách Giao Dịch</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>STT</TableHeaderColumn>
              <TableHeaderColumn>Tên Sản Phẩm</TableHeaderColumn>
              <TableHeaderColumn>Hình Thức</TableHeaderColumn>
              <TableHeaderColumn>Giao Dịch</TableHeaderColumn>
              <TableHeaderColumn>Số Tiền</TableHeaderColumn>
              <TableHeaderColumn>Trạng Thái</TableHeaderColumn>
              <TableHeaderColumn>Tùy Chọn</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
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

export default connect(mapStateToProps, matchDispatchToProps)(ListTransaction);
