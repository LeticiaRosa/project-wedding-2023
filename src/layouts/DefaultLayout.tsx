import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '../components/Header'
import { ContainerMain, Container } from './defaultLayout'
import { Footer } from '../components/Footer'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../contexts/contexts'
import { ContextModalProvider } from '../contexts/contextModal'
import { ProductsContextProvider } from '../contexts/contextProducts'

export function DefaultLayout() {
  return (
    <>
      <ContainerMain>
        <CartContextProvider>
          <ProductsContextProvider>
            <ContextModalProvider>
              <>
                <Header />
                <Container>
                  <Outlet />
                </Container>
                <Cart />
                <Footer />
              </>
            </ContextModalProvider>

            <ScrollRestoration />
          </ProductsContextProvider>
        </CartContextProvider>
      </ContainerMain>
    </>
  )
}
