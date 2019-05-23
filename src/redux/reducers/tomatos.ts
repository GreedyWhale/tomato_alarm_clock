import { INIT_TOMATO_LIST } from '../constant/actionsType';

const initialState: any[] = [];

const tomatos = (state = initialState, action: any) => {
  switch(action.type) {
    case INIT_TOMATO_LIST:
      return [...action.tomatoList, ...initialState]
    default:
      return state
  }
}

export default tomatos;