/* eslint-disable no-unused-vars */
import { CartContextType } from '../../contexts/contexts'

export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  REMOVE_ALL_ITENS = 'REMOVE_ALL_ITENS',
  UPDATED_PRODUCTS = 'UPDATED_PRODUCTS',
}

export function addNewItemAction(newItem: CartContextType) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: { newItem },
  }
}

export function removeItemAction(id: number) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: id,
  }
}

export function removeAllItensAction() {
  return {
    type: ActionTypes.REMOVE_ALL_ITENS,
    payload: '',
  }
}

export function updatedProductsAction() {
  return {
    type: ActionTypes.UPDATED_PRODUCTS,
    payload: '',
  }
}
