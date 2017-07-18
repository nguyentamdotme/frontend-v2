import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { IconMotorcycle, ActionSwapHoriz } from 'material-ui/svg-icons';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';

class ButtonChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    console.log(this.state.open);
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <RaisedButton
        label="Đồng Ý"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton
          label     = 'OK'
          primary    = {true}
          backgroundColor= "#3F51B5"
          className  = {this.props.className || ''}
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          title   = "Xác nhận giao dịch"
          actions = {actions}
          modal   = {true}
          open    = {this.state.open}
        >
          Bạn sẽ đổi <span>Sản Phẩm A</span> để lấy <span>Sản Phẩm B</span> của <span>Nguyễn B</span>.
        </Dialog>
      </div>
    );
  }
}

export default ButtonChange;
