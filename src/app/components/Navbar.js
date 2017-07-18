import React              from 'react';
import fetch 							from 'isomorphic-fetch'
import http 							from 'http';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Avatar, RaisedButton, Badge } from 'material-ui';
import {fullWhite}        from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import CategoryButton           from './CategoryButton';
import SearchNavbar             from './SearchNavbar';
import ButtonLogin              from './ButtonLogin';
import AvatarNavbar              from '../containers/avatarNavbar';


class Navbar extends React.Component {
	notice = () => {
		if(1==0) {
			return(
				<Badge
		    	badgeContent={10}
		      secondary={true}

		      className="iconNotice"
		    >
		      <IconButton tooltip="Notifications">
		        <NotificationsIcon />
		      </IconButton>
		    </Badge>
			);
		} else {
			return(
				<IconButton tooltip="Notifications">
	        <NotificationsIcon />
	      </IconButton>
			);
		}
	}


  render() {
    return (
    	<div className="navbar">
	    	<Grid fluid>
	        <Row>
	          <Col xs={6} md={1}>
	            <AvatarNavbar/>
	          </Col>
	          <Col xs={6} md={2}>
	          	<div>
	            	<CategoryButton/>
	            </div>
	          </Col>
	          <Col xs={6} md={5}>
	            <SearchNavbar/>
	          </Col>
	          <Col xs={6} md={2}>
					    <ButtonLogin/>
	          </Col>
	          <Col xs={1} md={2}>
	          </Col>
	        </Row>
	      </Grid>
      </div>
    );
  }
}

export default Navbar;
