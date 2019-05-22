import { INIT_TASK_LIST, ADD_TASK, UPDATE_TASK } from '../constant/actionsType';

const initialState: any[] = [];

const tasks = (state = initialState, action: any) => {
  switch(action.type) {
    case INIT_TASK_LIST:
      return [...action.taskList, ...initialState]
    case ADD_TASK:
      return [action.task, ...state]
    case UPDATE_TASK:
      return state.map(item => {
        if(item.id === action.task.id) { return action.task }
        else { return item }
      })
    default:
      return state
  }
}

export default tasks;