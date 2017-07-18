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

import * as userActions from '../actions/session-actions';
import * as productActions from '../actions/product-actions';

class AllProduct extends React.Component{

  componentWillMount() {
    const productActions = this.props.productActions;
    productActions.showProduct();
    // const user = this.props.user;
    // if(user.isLogin && user.data != undefined) {
    // }
  }

  getFullName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  getStatus = (value) => {
    switch(value) {
      case 0: return 'Hết Hàng'; break;
      case 1: return 'Còn Hàng'; break;
      default: return 'Lỗi'; break;
    }
  };

  content = () => {
    const products = this.props.products;
    const data = products.data;
    const user = this.props.user;
    if(user.isLogin && !products.loading){
      if(data != undefined) {
        if(data.length != 0) {
          return data.map( (row, index) => {
            // const success = row.success;

            return(
              <TableRow key={index}>
                <TableRowColumn>{(index + 1)}</TableRowColumn>
                <TableRowColumn>{row.productName}</TableRowColumn>
                <TableRowColumn tooltip={row.category.categoryName}>
                  {row.category.categoryName}
                </TableRowColumn>
                <TableRowColumn>
                  {this.getFullName(row.owner.name)}
                </TableRowColumn>
                <TableRowColumn>
                  {(row.priceOut).formatMoney()}
                </TableRowColumn>
                <TableRowColumn>
                  {this.getStatus(row.status)}
                </TableRowColumn>
              </TableRow>
            );
          });
        } else {
          return(<TableRowColumn colSpan="6">Dữ liệu trống</TableRowColumn>);
        }
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
              <TableHeaderColumn tooltip="The Name">Sản Phẩm</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Loại</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Người Đăng</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Gía</TableHeaderColumn>
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
    user: state.authReducer,
    products: state.productReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(AllProduct);
