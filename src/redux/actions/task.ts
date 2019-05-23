import { INIT_TASK_LIST, ADD_TASK, UPDATE_TASK } from '../constant/actionsType';

const initTaskList = (taskList: any[]) => ({ type: INIT_TASK_LIST, taskList});
const addTask = (task: any) => ({ type: ADD_TASK, task})
const updateTask = (task: any) => ({ type: UPDATE_TASK, task})

export {
  initTaskList,
  addTask,
  updateTask
}