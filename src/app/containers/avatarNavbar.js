import React from 'react';
import { connect } from 'react-redux';

import backend from '../config/backend.config';

import {Avatar} from 'material-ui';

class AvatarNavbar extends React.Component {
  avatar = () => {
    const user= this.props.user;
    if(user.isLogin && user.data != undefined) {
      return(<Avatar src={backend.url+'/uploads/'+user.data.avatar.filename} />);
    } else {
      return(<div></div>);
    }
  };
  render() {
    return (
      <div>
        {this.avatar()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.authReducer,
  }
}

export default connect(mapStateToProps, null)(AvatarNavbar);
