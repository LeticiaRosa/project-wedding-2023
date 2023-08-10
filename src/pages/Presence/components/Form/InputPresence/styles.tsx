import styled from 'styled-components'

export const ContainerSeparatorInputs = styled.div`
  input[type='text'] {
    border: 1px solid gray;
    border-radius: 6px;
    width: 50%;
    height: 1rem;
    margin: 1rem 0;
    padding: 1.5rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
`
