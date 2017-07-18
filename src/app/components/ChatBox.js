import React from 'react';
import { RaisedButton, TextField, FlatButton} from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { red500, cyan500 } from 'material-ui/styles/colors';

class ChatBox extends React.Component{
  render() {
    return(
      <div className= "chatbox">
        <div className="chatboxTitle">
          <Row className="titleWrapper">
            <Col xs={8} className="titleContent">
              Tam Nguyen
            </Col>
            <Col xs={3} className="titleButton">
              <button type="button" className="btnChatBox">-</button>
              <button type="button" className="btnChatBox">x</button>
            </Col>
          </Row>
        </div>
        <div className="chatboxContentWrapper">
          <ul className="chatboxContent">
              <li className="message">Helo</li>
              <li className="messageOwn">Helo 2</li>
              <li className="message">Helo</li>
              <li className="messageOwn">Helo 2</li>
              <li className="message">Helo</li>
              <li className="messageOwn">Helo 2</li>
              <li className="message">Helo</li>
              <li className="messageOwn">Helo 2</li>
          </ul>
        </div>
        <hr/>
          <Row className="chatboxInput">
            <Col xs={8} className="inputChat">
              <TextField
                fullWidth={true}
                multiLine={true}
              />
            </Col>
            <Col xs={3} className="btnChat">
              <RaisedButton label="Gửi"/>
            </Col>
          </Row>
      </div>
    );
  }
}

export default ChatBox;
