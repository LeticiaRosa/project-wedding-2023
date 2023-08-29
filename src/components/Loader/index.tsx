import { ContainerLoader } from './styles'
import { FadeLoader } from 'react-spinners'

export function Loader() {
  return (
    <ContainerLoader>
      <FadeLoader />
    </ContainerLoader>
  )
}
