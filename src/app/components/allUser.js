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

class AllUser extends React.Component{

  componentWillMount() {
    const user = this.props.user;
    if(user.isLogin && user.data != undefined) {
      const userActions = this.props.userActions;
      userActions.showAllUser();
    }
  }

  getFullName = (name) => {
    return name.firstName + ' ' + name.lastName;
  };

  getRole = (value) => {
    switch(value) {
      case 0: return 'Người Dùng'; break;
      case 1: return 'Quản Trị'; break;
    }
  };

  content = () => {
    const user = this.props.user;
    const data = user.allUser;
    if(user.isLogin && !user.loadAllUser){
      if(data != undefined) {
        if(data.length != 0) {
          return data.map( (row, index) => {
            // const success = row.success;

            return(
              <TableRow key={index}>
                <TableRowColumn>{(index + 1)}</TableRowColumn>
                <TableRowColumn>{this.getFullName(row.name)}</TableRowColumn>
                <TableRowColumn>
                  {row.gender == 1 ? 'Nam' : 'Nữ'}
                </TableRowColumn>
                <TableRowColumn>
                  {row.email}
                </TableRowColumn>
                <TableRowColumn>
                  {row.phone}
                </TableRowColumn>
                <TableRowColumn>
                  {this.getRole(row.role)}
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
              <TableHeaderColumn tooltip="The Name">Họ Tên</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Giới Tính</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Điện Thoại</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Phân Quyền</TableHeaderColumn>
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
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(AllUser);
