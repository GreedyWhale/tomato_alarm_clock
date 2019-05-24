import {
  INIT_TOMATO_LIST,
  ADD_TOMATO,
  UPDATE_TOMATO
 } from '../constant/actionsType';

export const initTomatoList = (tomatoList: any[]) => ({ type: INIT_TOMATO_LIST, tomatoList});
export const addTomato = (tomato: any) => ({ type: ADD_TOMATO, tomato});
export const updateTomato = (tomato: any) => ({ type: UPDATE_TOMATO, tomato});


