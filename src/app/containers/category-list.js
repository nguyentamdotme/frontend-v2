import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import backend from '../config/backend.config';

import {
  ActionHelp,
  ActionIconMotorcycle
} from 'material-ui/svg-icons/';

import * as productActions from '../actions/product-actions';
import * as categoryActions from '../actions/category-actions';

class CategoryList extends React.Component {
  componentWillMount() {
    this.props.categoryActions.showCategory();
  }
  handleClick = (categoryId) => {
    this.props.productActions.showProductOfCategory(categoryId);
  }
  list() {
    const {categories, actions} = this.props;
    if(Array.isArray(categories.data)) {
      return categories.data.map(category => {
        return(
          <Link key={category._id} to={'/cat/'+category._id} onClick={this.handleClick.bind(this, category._id)}>
            <div className="categoryWrapper"
              className="categoryChild btnHover">
              <div className="bgRed400 textCenter">
                <img src={backend.url+'/uploads/' + category.categoryImage.filename} className="imageCategory"/>
              </div>
              <h3>{category.categoryName}</h3>
            </div>
          </Link>
        );
      });
    }
  }
  render() {
    return(
      <div className="categoryWrapper">
        {this.list()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryList);
