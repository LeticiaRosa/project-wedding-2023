import { ReactNode, createContext, useContext, useState } from 'react'

export interface CartContextType {
  id: number
  image: string
  name: string
  price: number
}

export interface ListContextType {
  listPresents: CartContextType[]
  setListPresents: (values: CartContextType[]) => void
}

type ChildrenType = {
  children: ReactNode
}

const CartContext = createContext<ListContextType>({} as ListContextType)

function CartContextProvider({ children }: ChildrenType) {
  const [listPresents, setListPresents] = useState<CartContextType[]>([])
  return (
    <CartContext.Provider value={{ listPresents, setListPresents }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  return context
}

export { CartContextProvider, useCart }
