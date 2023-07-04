import { styled } from 'styled-components'

export const ContainerForm = styled.form`
  width: 80%;
  background-color: ${(props) => props.theme['terra-100']};
`

export const ContainerInputs = styled.div`
  div > input[type='text'] {
    border: 1px solid;
    border-radius: 6px;
    width: 100%;
    height: 2rem;
    margin: 1rem 0;
    padding: 1rem;
  }
  div > label {
    width: 100%;
  }
  legend {
    width: 100%;
    padding-bottom: 1rem;
  }
  h6 {
    width: 100%;
    padding-top: 1rem;
  }
  .radio {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .radio input[type='radio'] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 2px solid ${(props) => props.theme.black};
    border-radius: 50%;
  }

  .radio input[type='radio']:checked + .checkmark::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.black};
    border-radius: 50%;
  }

  textarea {
    border: 1px solid;
    border-radius: 6px;
    width: 100%;
    height: 10rem;
    margin: 1rem 0;
    padding: 1rem;
    resize: none;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 30%;
    padding: 1rem;
    color: ${(props) => props.theme.white};

    border-radius: 8px;
    border-style: none;
    border: 0;

    font-size: 1rem;
    font-weight: bold;
    gap: 0.5rem;
    cursor: pointer;

    background-color: ${(props) => props.theme['terra-600']};
    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['terra-700']};
    }
  }
`
