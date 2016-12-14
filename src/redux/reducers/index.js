import { combineReducers } from 'redux';
import parserReducer from 'redux/reducers/parserReducer';

export default combineReducers({
  parser: parserReducer
});
