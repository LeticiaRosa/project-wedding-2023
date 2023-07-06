import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ContainerMain, Container } from './defaultLayout'
import { Footer } from '../components/Footer'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../contexts/contexts'

export function DefaultLayout() {
  return (
    <ContainerMain>
      <CartContextProvider>
        <>
          <Header />
          <Container>
            <Outlet />
          </Container>
          <Cart />
          <Footer />
        </>
      </CartContextProvider>
    </ContainerMain>
  )
}
