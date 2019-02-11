import { combineReducers } from 'redux';
import plandate from './plandate';
import employeesReducer from './employee';

export default combineReducers({
  plandate,
  employees: employeesReducer,
});
