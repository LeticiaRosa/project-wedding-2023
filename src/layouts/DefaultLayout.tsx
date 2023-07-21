import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '../components/Header'
import { ContainerMain, Container } from './defaultLayout'
import { Footer } from '../components/Footer'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../contexts/contexts'
import { ContextModalProvider } from '../contexts/contextModal'

export function DefaultLayout() {
  return (
    <>
      <ContainerMain>
        <CartContextProvider>
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
        </CartContextProvider>
      </ContainerMain>
    </>
  )
}
