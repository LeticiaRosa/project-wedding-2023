import { ReactNode, createContext, useContext, useReducer } from 'react'
import { productsReducer } from '../reducers/presents/reducer'
import { updatedProductsAction } from '../reducers/presents/actions'

export interface ProductsContextType {
  id: number
  image: string
  name: string
  price: number
  url: string
}

export interface ListContextType {
  state: ProductsContextType[]
  updatedProducts: () => void
}

type ChildrenType = {
  children: ReactNode
}

const ProductsContext = createContext<ListContextType>({} as ListContextType)

function ProductsContextProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(productsReducer, [])
  function updatedProducts() {
    console.log('Entrou')
    dispatch(updatedProductsAction())
  }

  return (
    <ProductsContext.Provider
      value={{
        state,
        updatedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const context = useContext(ProductsContext)
  return context
}

export { ProductsContextProvider, useProducts }
