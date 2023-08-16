import styled from 'styled-components'
import { BaseButton } from '../../../../components/Cart/styles'

export const ContainerForm = styled.form`
  width: 80%;
  background-color: ${(props) => props.theme['terra-100']};
  padding: 2rem;
  margin-top: 1rem;

  @media (max-width: 800px) {
    width: 100%;
    padding: 1rem 0 0 0;
    margin-top: 1rem;
  }
`

export const TitleForm = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  text-align: center;
`

export const ContainerSeparatorInputs = styled.div`
  padding: 1rem 0;

  label {
    width: 100%;
    display: block;
  }
  legend {
    width: 100%;
    padding-bottom: 1rem;
  }
  h6 {
    width: 100%;
    padding-top: 0.5rem;
  }

  input[type='text'] {
    border: 1px solid gray;
    border-radius: 6px;
    width: 100%;
    height: 2rem;
    margin: 1rem 0 0 0;
    padding: 1.5rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
  textarea {
    border: 1px solid gray;
    border-radius: 6px;
    width: 100%;
    height: 10rem;
    margin: 1rem 0;
    padding: 1.5rem;
    resize: none;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
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

  .checkmark::after {
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
`
export const ContainerRadio = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
`

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PresentButton = styled(BaseButton)`
  padding: 1rem;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['terra-600']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['terra-700']};
  }
`

export const SelectContainer = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  z-index: 2;
  background-color: white;
  min-width: 300px;
`

export const SelectInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  ${SelectContainer} {
    display: block;
  }
`

export const SelectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
`

export const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`
