import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { List, ListItem, Divider } from 'material-ui';
import { ActionStore, ContentDrafts,
  ContentSend, ContentInbox} from 'material-ui/svg-icons';
import {
  ActionHistory,
  ActionAccountBox,
  ActionList,
  ActionSupervisorAccount,
  ActionShoppingBasket
} from 'material-ui/svg-icons';

import * as userActions from '../actions/session-actions';


class LeftMenu extends React.Component {
  menuUser = () => {
    return(
      <div>
        <Link to="/my-products">
          <ListItem className="listItem" leftIcon={<ActionList />} />
        </Link>
        <Link to="/my-billing">
          <ListItem className="listItem" leftIcon={<ActionHistory />}/>
        </Link>
        <Link to="/my-profile">
          <ListItem className="listItem" leftIcon={<ActionAccountBox />} />
        </Link>
      </div>
    );
  };

  menuAdmin = () => {
    return(
      <div>
        <Link to='/all-transaction'>
          <ListItem className="listItem" leftIcon={<ContentInbox />} />
        </Link>
        <Link to="/my-profile">
          <ListItem className="listItem" leftIcon={<ActionAccountBox />} />
        </Link>
        <Link to="/all-user">
          <ListItem className="listItem" leftIcon={<ActionSupervisorAccount />} />
        </Link>
        <Link to="/all-product">
          <ListItem className="listItem" leftIcon={<ActionShoppingBasket />} />
        </Link>
      </div>
    );
  };

  showMenu = () => {
    const user = this.props.user;
    if(user.isLogin && user.data != undefined) {
      if(user.data.role == 0) {
        return(this.menuUser());
      }else {
        return(this.menuAdmin());
      }
    }
  };

  render() {
    return(
      <div className="leftMenu">
        <List>
          <Link to="/">
            <ListItem className="listItem" leftIcon={<ActionStore />}/>
          </Link>
          {this.showMenu()}
        </List>
        <Divider />
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

export default connect(mapStateToProps, matchDispatchToProps)(LeftMenu)
