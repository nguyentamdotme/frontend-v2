import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as categoryActions from '../actions/category-actions';
import * as productActions from '../actions/product-actions';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { DropDownMenu, Dialog, RaisedButton, FlatButton, TextField, MenuItem, SelectField } from 'material-ui';
import { NavigationExpandMoreIcon, ActionNoteAdd } from 'material-ui/svg-icons';
import { red500, cyan500 } from 'material-ui/styles/colors';

class ButtonAddProduct extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openDiaAddProduct: false,
      openCategory : 1,
      pictures: {},
      categorySelected: '0',
      arrayImage : [],
      productData : {
        productName: '',
        category: '',
        description: '',
        priceIn: 0,
        priceOut: 0,
        image: ''
      }
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  componentWillMount() {
    console.log('this.props.categoryActions');
    console.log(this.props.categoryActions);
    this.props.categoryActions.showCategory();
  }

  handleOpen = () => {
    if(this.props.user.isLogin && this.props.user.data != undefined) {
      this.setState({openDiaAddProduct: true});
    } else {
      alert("Vui lòng đăng nhập");
    }
  };

  handleClose = () => {
    this.setState({openDiaAddProduct: false});
  };

  handleCategoryOpen = () => {
    this.setState({
      openCategory: true,
    });
  };

  handleChange = (event, index, value) => {
    this.setState({categorySelected: value})
  };

  handleUploadImage = (e) => {
    this.props.productActions.uploadProductImage(e.target.files);
  };

  handleChangePrice = (e) => {
    let price = parseInt(e.target.value.replaceAll(',','')).formatMoney();
    e.target.value = price;
  };

  onSubmit = (e) => {
    const used = parseFloat(this.refs.used.input.value);
    const userValue = used > 100 ? 100 : used;
    this.state.productData = {
      productName: this.refs.productName.input.value,
      category: this.state.categorySelected,
      description: this.refs.productDescription.input.value,
      priceIn: parseFloat(this.refs.productPriceIn.input.value.replaceAll(',','')),
      priceOut: parseFloat(this.refs.productPriceOut.input.value.replaceAll(',','')),
      image: this.props.products.imageArray,
      owner: this.props.user.data._id,
      used: userValue,
    }
    this.props.productActions.addProduct(this.state.productData);
    this.props.productActions.showOwnerProduct(this.props.user.data._id);
    this.handleClose();
  };

  CategoryList = () => {
    return this.props.categories.data.map(cat => {
      return(
        <MenuItem key={cat._id} value={cat._id} primaryText={cat.categoryName} />
      );
    });
  };

  dialogContent() {
    return (
      <div>
        <h3>Thêm Sản Phẩm Mới</h3>
        <form id="frmAddProduct" encType="multipart/form-data">
          <div className="formAddProduct">
            <TextField
              floatingLabelText="Tên Sản Phẩm"
              fullWidth={true}
              ref="productName"
            /><br />
            <TextField
              floatingLabelText="Miêu Tả"
              fullWidth={true}
              ref="productDescription"
            /><br />
            <Row>
              <Col xs={6}>
                <DropDownMenu
                  value={this.state.categorySelected}
                  onChange={this.handleChange}
                  autoWidth = {false}
                  className="DropdownCategory"
                  ref="productCategory"
                >
                  <MenuItem value='0' primaryText="Chọn chuyên mục sản phẩm" />
                  {this.CategoryList()}
                </DropDownMenu>
              </Col>
              <Col xs={6}>
                <TextField
                  floatingLabelText="Tình Trạng (%)"
                  fullWidth={true}
                  ref="used"
                /><br />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <TextField
                  floatingLabelText="Giá Mua"
                  fullWidth={true}
                  ref="productPriceIn"
                  onChange={this.handleChangePrice.bind(this)}
                /><br />
              </Col>
              <Col xs={6}>
                <TextField
                  floatingLabelText="Giá Bán"
                  fullWidth={true}
                  ref="productPriceOut"
                  onChange={this.handleChangePrice.bind(this)}
                /><br />
              </Col>
            </Row>
            <RaisedButton
              label="Choose an Image"
              labelPosition="before"
              containerElement="label"
              ref="productImage"
              onChange={this.handleUploadImage}
            >
              <input ref="file" type="file" name="file" className="btnUpload" multiple/>
            </RaisedButton>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const {categories, actions} = this.props;
    const actionButton = [
      <RaisedButton
        label="Đồng Ý"
        primary={true}
        type="submit"
        keyboardFocused={true}
        onTouchTap={this.props.user.data !== undefined ?
          this.onSubmit : this.handleClose}
      />,
      <FlatButton
        label      = "Đóng"
        primary    = {true}
        onTouchTap = {this.handleClose}
      />
    ];
    if(this.props.className != 'btn-addProduct-float'){
      return(
        <div className  = "btnAddWrapper">
          <button
            className  = {this.props.className || ''}
            onTouchTap = {this.handleOpen}
          >
            <ActionNoteAdd className="iconAdd" color={cyan500}/>
          </button>
          <Dialog
            actions = {actionButton}
            modal   = {true}
            open    = {this.state.openDiaAddProduct}
          >
            {
              this.props.user.data !== undefined ?
                this.dialogContent() :
                'Vui lòng đăng nhập'
            }
          </Dialog>
        </div>
      );
    } else {
      if(this.props.user.data !== undefined) {
        return(
          <div className  = "btnAddWrapper">
            <button
              className  = {this.props.className || ''}
              onTouchTap = {this.handleOpen}
            >
              <ActionNoteAdd className="iconAdd" color={cyan500}/>
            </button>
            <Dialog
              actions = {actionButton}
              modal   = {true}
              open    = {this.state.openDiaAddProduct}
            >
              {
                this.props.user.data !== undefined ?
                  this.dialogContent() :
                  'Vui lòng đăng nhập'
              }
            </Dialog>
          </div>
        );
      } else {
        return(<div></div>);
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
    products: state.productReducer,
    user: state.authReducer
  }
}

function matchDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    categoryActions: bindActionCreators(categoryActions, dispatch)
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(ButtonAddProduct);
