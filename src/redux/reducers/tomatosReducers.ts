import { INIT_TOMATO_LIST, ADD_TOMATO, UPDATE_TOMATO } from '../constant/actionsType';

const initialState: any[] = [];

const tomatos = (state = initialState, action: any) => {
  switch(action.type) {
    case INIT_TOMATO_LIST:
      return [...action.tomatoList]
    case ADD_TOMATO:
        return [...action.tomato, ...state]
    case UPDATE_TOMATO:
      return state.map(value => {
        if(value.id === action.tomato.id) {
          return action.tomato
        }
        return value
      })
    default:
      return state
  }
}

export default tomatos;