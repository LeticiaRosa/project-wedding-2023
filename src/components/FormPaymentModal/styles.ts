import styled from 'styled-components'
import { BaseButton } from '../Cart/styles'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContentWrapper = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`

export const ModalTitle = styled.p`
  margin: 0;
  font-weight: 600;
  p {
    font-size: 1.5rem;
  }
  span {
    font-size: 0.7rem;
    font-weight: 400;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export const ModalBody = styled.div`
  padding: 2rem 0px;
`
export const ContainerSeparatorInputs = styled.div`
  label {
    width: 100%;
    display: block;
    font-weight: 600;
  }
  legend {
    width: 100%;
    padding-bottom: 1rem;
  }

  p {
    font-size: 0.7rem;
  }

  input {
    border: 1px solid gray;
    border-radius: 6px;
    width: 100%;
    height: 2rem;
    margin: 0.75rem 0;
    padding: 1.5rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PaymentButton = styled(BaseButton)`
  background-color: ${(props) => props.theme['terra-700']};
  color: white;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['terra-600']};
  }
  &:disabled {
    border-radius: 0;
    border-bottom: 3px solid ${(props) => props.theme['terra-500']};
  }
`

export const CancelButton = styled(BaseButton)`
  color: ${(props) => props.theme.black};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.gray};
  }
  &:disabled {
    border-radius: 0;
    border-bottom: 3px solid ${(props) => props.theme.black};
  }
`
