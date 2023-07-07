import { ReactNode, createContext, useContext, useReducer } from 'react'
import { cartReducer } from '../reducers/presents/reducer'
import {
  addNewItemAction,
  removeItemAction,
  removeAllItensAction,
} from '../reducers/presents/actions'

export interface CartContextType {
  id: number
  image: string
  name: string
  price: number
}

export interface ListContextType {
  state: CartContextType[]
  newItemCart: (values: CartContextType) => void
  removeItemCart: (values: number) => void
  removeAllItemsCart: () => void
  totalPrice: number
}

type ChildrenType = {
  children: ReactNode
}

const CartContext = createContext<ListContextType>({} as ListContextType)

function CartContextProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(cartReducer, [])

  function newItemCart(values: CartContextType) {
    dispatch(addNewItemAction(values))
  }

  function removeItemCart(value: number) {
    dispatch(removeItemAction(value))
  }

  function removeAllItemsCart() {
    dispatch(removeAllItensAction())
  }

  const totalPrice = state.reduce((total, item) => total + item.price, 0)

  return (
    <CartContext.Provider
      value={{
        newItemCart,
        state,
        removeItemCart,
        removeAllItemsCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  return context
}

export { CartContextProvider, useCart }
