import { combineReducers } from 'redux'
import tasks from './tasksReducers';
import tomatos from './tomatosReducers';
import tomatoStatus from './tomatoStatusReducers';

const rootReducer = combineReducers({
  tasks,
  tomatos,
  tomatoStatus
});

export default rootReducer;