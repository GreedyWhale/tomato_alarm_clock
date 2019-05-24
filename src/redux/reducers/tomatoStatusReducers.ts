import { SET_TOMATO_STATUS } from '../constant/actionsType';

// processing 进行中
// resting 休息中

const initialState: string = '';

const tomatoStatus = (state = initialState, action: any) => {
  switch(action.type) {
    case SET_TOMATO_STATUS:
      return action.status
    default:
      return state
  }
}

export default tomatoStatus;