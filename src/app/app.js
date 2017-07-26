import React           from 'react';
import ReactDOM        from 'react-dom';
import babelPolyfill   from 'babel-polyfill';
import { Provider }    from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import storeConfig   from './store/storeConfig';
import Main          from './components/Main';
import MainContent   from './components/MainContent';
import SellerConfirm from './components/SellerConfirm';
import ChangeProduct from './components/ChangeProduct';
import MyProduct     from './components/MyProduct';
import ListRequest   from './components/ListRequest';
import Register      from './components/Register';
import Profile       from './components/Profile';
import ListBilling   from './components/ListBilling';
import allUser       from './components/allUser';
import allProduct    from './components/allProduct';
import ListTransaction   from './components/ListTransaction';
import ShowProductOfCategory  from './components/ShowProductOfCategory';
import ChatList from './components/ChatList';
import ListAuction from './components/ListAuction';

import ProductDetail from './containers/product-detail';

import {verify} from './actions/session-actions';

import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';

injectTapEventPlugin();
const store = storeConfig();
const history = syncHistoryWithStore(browserHistory, store);
// history.listen(location => analyticsService.track(location.pathname));
store.subscribe(() => {
  // console.log('store state');
  console.log(store.getState());
});

if(sessionStorage.accessToken != undefined) {
    store.dispatch(verify());
}

Number.prototype.formatMoney = function(_c, _d, _t){
let n = this,
    c = isNaN(_c = Math.abs(_c)) ? 0 : _c,
    d = _d == undefined ? "." : _d,
    t = _t == undefined ? "," : _t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

ReactDOM.render(
	<Provider store={store}>
    <Router history={history}>
      <Router path="/" component={Main}>
        <IndexRoute component={MainContent} />
        <Route path="product-detail/:idProductDetail" component={ProductDetail}/>
        <Route path="product-details/:idProductDetail" component={ProductDetail}/>
        <Route path="seller-confirm/:productId" component={SellerConfirm}/>
        <Route path="change-product" component={ChangeProduct}/>
        <Route path="my-products" component={ListRequest}/>
        <Route path="cat/:categoryId" component={ShowProductOfCategory}/>
        <Route path="register" component={Register}/>
        <Route path="my-profile" component={Profile}/>
        <Route path="my-billing" component={ListBilling}/>
        <Route path="all-transaction" component={ListTransaction}/>
        <Route path="all-user" component={allUser}/>
        <Route path="all-product" component={allProduct}/>
        <Route path="chat-list" component={ChatList}/>
        <Route path="list-auction" component={ListAuction}/>
      </Router>
    </Router>
	</Provider>
	,document.getElementById('app')
);
