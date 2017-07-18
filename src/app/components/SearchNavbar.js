import React from 'react';
import { AutoComplete, MenuItem } from 'material-ui';

import callAPI from '../api/callAPI';
import convertVietnamese from '../middlewares/covertVietnamese';

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
        />
			</div>
		);
	}
}

export default SearchNavbar;
