import React, {Component} from 'react';
import { connect } from 'react-redux';

import { cyan500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import MainContent from './MainContent';
import LeftMenu from './LeftMenu';
import ButtonAddProduct from './ButtonAddProduct';
import ChatBox from './ChatBox';

import backend from '../config/backend.config';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: cyan500,
  },
});

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          <Navbar />
          <div className="noPadding">
            <Grid fluid className="noPadding mainContent">
              <Row>
                <Col xs={1} md={1} className="leftMenuWrapper">
                  <LeftMenu />
                  <ButtonAddProduct className="btn-addProduct-float">
                    <div className="addIcon">+</div>
                  </ButtonAddProduct>
                </Col>
                <Col xs={11} md={11} className="rightWrapper">
                  {this.props.children}
                </Col>
                <ChatBox/>
              </Row>
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(Main);
