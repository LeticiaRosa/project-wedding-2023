import { CartContextType } from '../../contexts/contexts'
import { ActionTypes } from './actions'

export function cartReducer(state: CartContextType[], action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM:
      // eslint-disable-next-line no-case-declarations
      const verificaArray = state.find(
        (item) => item.id === action.payload.newItem.id,
      )
      if (verificaArray) {
        return [...state]
      } else {
        return [...state, action.payload.newItem]
      }

    case ActionTypes.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload)

    case ActionTypes.REMOVE_ALL_ITENS:
      return []

    default:
      return state
  }
}
