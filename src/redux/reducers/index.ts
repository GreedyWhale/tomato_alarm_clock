import { combineReducers } from 'redux'
import tasks from './tasksReducers';
import tomatos from './tomatosReducers';

const rootReducer = combineReducers({
  tasks,
  tomatos,
});

export default rootReducer;