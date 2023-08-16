import styled from 'styled-components'
import { BaseButton } from '../../../Cart/styles'

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
  z-index: 1000;
`

export const ModalContentWrapper = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  overflow: auto;
  max-height: 600px;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ModalTitle = styled.div`
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
  padding: 0.5rem 0px 1rem 0;
`
export const ContainerTitleForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleForm = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  padding: 0 0.5rem;
  position: relative;
  background-color: white;
`
export const BoxContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
`
export const ContainerSeparatorInputs = styled.div`
  label {
    width: 100%;
    display: block;
    font-weight: 600;
    font-size: 0.75rem;
  }
  legend {
    width: 100%;
    padding-bottom: 1rem;
  }

  p {
    font-size: 0.6rem;
    font-style: italic;
  }

  input {
    border: 1px solid ${(props) => props.theme.gray};
    border-radius: 6px;
    width: 100%;
    height: 1rem;
    margin: 0.5rem 0;
    padding: 1rem 1rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }

  select {
    width: 100%;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.gray};
    gap: 0.5rem;
    min-width: 85px;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
`

export const SeparatorInputs = styled.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

export const DivPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding-bottom: 1rem;

  h4 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.85rem;
    padding: 3px;
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
