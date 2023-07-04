import { styled } from 'styled-components'
export const ContainerCart = styled.main`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  button {
    padding: 0.5rem;
    color: ${(props) => props.theme.black};
    margin: 0.5rem;
    border-radius: 8px;
    border: none;

    font-size: 1rem;
    font-weight: bold;
    gap: 0.5rem;
    cursor: pointer;

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme.gray};
    }
    &:disabled {
      border-radius: 0;
      border-bottom: 3px solid ${(props) => props.theme.black};
    }
  }
`
