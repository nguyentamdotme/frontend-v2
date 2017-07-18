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

import * as transactionActions from '../actions/transaction-actions';

class ListBilling extends React.Component{

  componentWillMount() {
    const user = this.props.user;
    if(user.isLogin && user.data != undefined) {
      const transactionAct = this.props.transactionActions;
      transactionAct.showTransactionOfUser(user.data._id);
    }
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
  }

  content = () => {
    const trans = this.props.transaction;
    const data = trans.transOfUser;
    if(!trans.loadingTransUser) {
      if(data.length != 0) {
        return data.map( (row, index) => {
          if(row) {
            const success = row.success;
            if(success.status >=0){
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
                </TableRow>
              );
            }
          } //end if Row
        });
      } else {
        return(<TableRowColumn colSpan="6">Dữ liệu trống</TableRowColumn>);
      }
    } else {
      return(<TableRowColumn colSpan="6">Đang tải</TableRowColumn>);
    }
  };

  render() {
    return(
      <div>
        <Table
          height="400px"
          fixedHeader={true}
          fixedFooter={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Super Header" style={{textAlign: 'center'}}>
                <h3 className="textCenter">Danh Sách Đơn Hàng</h3>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">STT</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Tên Sản Phẩm</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Hình Thức</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Giao Dịch</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Số Tiền</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Trạng Thái</TableHeaderColumn>
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

export default connect(mapStateToProps, matchDispatchToProps)(ListBilling);
