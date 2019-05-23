import { combineReducers } from 'redux'
import tasks from './tasks';
import tomatos from './tomatos';

const rootReducer = combineReducers({
  tasks,
  tomatos
});

export default rootReducer;