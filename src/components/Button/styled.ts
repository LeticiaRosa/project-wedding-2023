import { styled } from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 200px;
  height: 50px;
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.5s ease;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['terra-600']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['terra-700']};
  }
  &:disabled {
    cursor: default;
    background-color: ${(props) => props.theme.gray};
  }
`
export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    width: 30px;
    height: 30px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
