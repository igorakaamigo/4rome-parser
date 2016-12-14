import { combineReducers } from 'redux';
import dummyReducer from 'redux/reducers/dummyReducer';

export default combineReducers({
  dummy: dummyReducer
});
