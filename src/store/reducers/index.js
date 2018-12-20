import { combineReducers } from 'redux';
import exerciseReducer from './exerciseReducer';
import statisticsReducer from './statisticsReducer';

export default combineReducers({
  exercises: exerciseReducer,
  statistics: statisticsReducer,
});
