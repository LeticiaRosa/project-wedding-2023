import styled from 'styled-components'

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
