import { Loader, Button as StyleButton } from './styled'

interface PropsButton {
  name: string
  isLoading: boolean
}

export function Button({ name, isLoading }: PropsButton) {
  console.log(isLoading)
  return (
    <StyleButton disabled={isLoading} type="submit">
      {isLoading ? (
        <Loader>
          <span className="loader"></span>
        </Loader>
      ) : (
        <> {name}</>
      )}
    </StyleButton>
  )
}
