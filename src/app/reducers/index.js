import {combineReducers} from 'redux';
import authReducer from './auth-reducer';
import productReducer from './product-reducer';
import categoryReducer from './category-reducer';
import transactionReducer from './transaction-reducer';
import messageReducer from './message-reducer';
import { routerReducer } from 'react-router-redux';

const allReducers = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  transactionReducer,
  messageReducer,
  routing:routerReducer
});

export default allReducers;
