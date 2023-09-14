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

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 50px;
    width: 50px;
  }
  p {
    padding-left: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`

export const ModalTitle = styled.div`
  display: block;

  span {
    font-size: 1rem;
    font-weight: 400;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.black};
`
export const ModalBody = styled.div`
  padding: 1rem 0;
  span {
    display: block;
    padding: 0.3rem 0;
    font-weight: 400;
    font-size: 0.8rem;
  }
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
    border: 1px solid ${(props) => props.theme.gray};
    border-radius: 6px;
    width: 100%;
    height: 2rem;
    margin: 0.5rem 0;
    padding: 1.5rem 1rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
`

export const ImageWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  span {
    font-weight: 600;
    font-size: 1rem;
  }
`
export const DivPrice = styled.div`
  padding: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  h4 {
    color: ${(props) => props.theme['terra-800']};
  }
`

export const Image = styled.img`
  width: 50%;
  height: auto;
`

export const ContainerSeparatorInputCopy = styled.div`
  position: relative;

  input {
    border: 1px solid ${(props) => props.theme.gray};
    border-radius: 6px;
    width: 100%;
    height: 2rem;
    margin: 0.5rem 0;
    padding: 1.5rem 1rem;
    transition: box-shadow 0.5s ease;
    &:not(:disabled):hover {
      box-shadow: 0 0 0 2px ${(props) => props.theme['terra-500']};
    }
  }
`

export const CopyButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  padding: 5px 10px;
  background-color: ${(props) => props.theme['terra-700']};
  color: ${(props) => props.theme.white};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
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
