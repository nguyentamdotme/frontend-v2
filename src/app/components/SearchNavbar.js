import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { AutoComplete, MenuItem } from 'material-ui';
import {browserHistory} from 'react-router';

import callAPI from '../api/callAPI';
import convertVietnamese from '../middlewares/covertVietnamese';

import * as productActions from '../actions/product-actions';


class SearchNavbar extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
		  dataSource: [],
	  };
  }

  delay = (function(){
    let timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

	handleUpdateInput = (value) => {
    value = convertVietnamese(value);
    this.delay(()=>{
      console.log(value);
      if(value === '') {
        this.setState({
          dataSource: []
        });
      }else {
        const opt = {
          url: '/product/find',
          method: 'post',
          data: {value}
        }
        callAPI(opt)
          .then(result => {
            this.setState({
              dataSource: result
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({
              dataSource: []
            });
          });
      }
    }, 700);
  };

  selected = (e) => {
    this.props.actions.singleProduct(e._id);
    browserHistory.push('/product-detail/'+e._id);
  }

	render() {
    const dataSourceConfig = {
      text: 'productName',
      value: '_id',
    };
		return (
			<div>
        <AutoComplete
          hintText="Tìm Kiếm"
          filter={AutoComplete.noFilter}
          onUpdateInput={this.handleUpdateInput}
          dataSource={this.state.dataSource}
          openOnFocus={true}
          fullWidth={true}
          dataSourceConfig={dataSourceConfig}
          onNewRequest={this.selected}
        />
			</div>
		);
	}
}
function mapStateToProps(state) {
  return {
    products: state.productReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchNavbar);
