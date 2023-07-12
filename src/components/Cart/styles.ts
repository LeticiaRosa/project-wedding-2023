import { styled, keyframes } from 'styled-components'

type menuProps = {
  expandedM: boolean
}

export const ContainerCart = styled.div<menuProps>`
  border-radius: 8px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  max-height: 600px;
  height: ${({ expandedM }) => (expandedM ? '50px' : '80%')};

  background: ${({ expandedM }) =>
    expandedM ? 'rgba(255,166,77,1)' : 'rgba(255, 255, 255, 1)'};

  .dropdown-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #ddd;
    cursor: pointer;
  }
`

const rotateClockwise = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`

const rotateCounterclockwise = keyframes`
  from {
    transform: rotate(0deg);
    
  }
  to {
    transform: rotate(180deg);
  }
`

export const CartIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
`

export const NotificationCount = styled.div`
  position: absolute;
  top: -5px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.red};
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
`

export const ContainerTitle = styled.div<menuProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 0.5rem 0;
  padding-bottom: 1rem;
  border: none;
  background-color: transparent;
  width: 100%;
  p {
    padding: 0 1rem;
    z-index: 1;
  }

  .rotate-clockwise {
    animation: ${rotateClockwise} 0.5s linear forwards;
  }

  .rotate-counterclockwise {
    animation: ${rotateCounterclockwise} 0.5s forwards;
  }
`

export const ContainerElements = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;

  .item {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme['terra-100']};
    .item-name {
      display: flex;
      align-items: center;
      justify-content: start;
      text-align: start;
      img {
        width: 35%;
        padding: 0.5rem;
      }
    }

    p {
      padding: 1rem;
    }
  }
`

export const ContainerListPresents = styled.div`
  overflow: auto;
  max-height: 350px;
  &::-webkit-scrollbar {
    width: 6px;
  }

  .item {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .item-remove {
    display: flex;
    align-items: center;
    text-align: center;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
  @media (max-width: 800px) {
    max-height: 300px;
  }

  @media (max-width: 500px) {
    max-height: 300px;
  }

  @media (max-width: 300px) {
    max-height: 100px;
  }
`

export const FooterCart = styled.div`
  padding: 1.2rem;
`

export const ContainerRemoveAllItens = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`

export const ContainerTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  strong {
    font-weight: 700;
    font-size: 1.5rem;
    color: black;
  }
`

export const ContainerButtons = styled.div`
  display: block;
`

export const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.5s ease;
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.gray};
  }
`

export const ConcludeButton = styled(BaseButton)`
  background-color: ${(props) => props.theme['terra-700']};
  cursor: not-allowed;
  color: white;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['terra-600']};
    cursor: pointer;
  }
  &:disabled:hover .tooltip {
    display: block;
    z-index: 1;
  }
`
export const Tooltip = styled.div`
  position: relative;
  opacity: 0.5;
  cursor: not-allowed;
  .tooltip {
    font-size: 0.75rem;
    position: absolute;
    width: 90%;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    background-color: #f9f9f9;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`
export const CancelButton = styled.button`
  color: ${(props) => props.theme.black};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.gray};
  }
  &:disabled {
    border-radius: 0;
    border-bottom: 3px solid ${(props) => props.theme.black};
  }
`
