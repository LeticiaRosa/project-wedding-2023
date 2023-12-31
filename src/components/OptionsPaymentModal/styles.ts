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
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.black};
`

export const CloseButton = styled.button`
  color: ${(props) => props.theme.black};
  background: none;
  border: none;
  cursor: pointer;
`

export const ModalBody = styled.div`
  padding: 2rem 0px;
`

export const OptionsButton = styled.button`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
  &:not(:disabled):hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
  }
  p {
    font-size: 1.25rem;
  }
  span {
    font-size: 0.7rem;
    font-weight: 400;
  }
  svg {
    width: 3rem;
    height: auto;
    background-color: transparent;
  }
`

export const ContainerTitleButton = styled.div`
  color: ${(props) => props.theme.black};
  display: flex;
  align-items: start;
  text-align: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
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
