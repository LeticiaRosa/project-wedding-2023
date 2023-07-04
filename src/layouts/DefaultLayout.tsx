import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ContainerMain, Container } from './defaultLayout'
import { Footer } from '../components/Footer'

export function DefaultLayout() {
  return (
    <ContainerMain>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </ContainerMain>
  )
}
