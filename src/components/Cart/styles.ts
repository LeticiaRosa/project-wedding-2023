import { styled, keyframes, css } from 'styled-components'

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
  height: ${({ expandedM }) => (expandedM ? '80%' : '80%')};

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

const firstOpenKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg)
  }
`

const firstCloseKeyFrame = keyframes`
  0% {
    transform:rotate(180deg);
  }
  100% {
    transform:rotate(0);

  }
`

const firstOpenAnimation = css`
  animation: 1s linear ${firstOpenKeyframe} forwards;
`

const firstCloseAnimation = css`
  animation: 1s linear ${firstCloseKeyFrame} forwards;
`

export const ContainerTitle = styled.button<menuProps>`
  /* display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 0.5rem 0;
  padding-bottom: 1rem;
  p {
    padding: 0 1rem;
    z-index: 1;
  } */

  ${({ expandedM }) =>
    expandedM !== null &&
    (expandedM ? firstOpenAnimation : firstCloseAnimation)}
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

  button {
    padding: 8px 16px;
    margin: 0.3rem;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  .continuarCompra {
    background-color: ${(props) => props.theme['terra-700']};

    cursor: pointer;
    color: white;

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['terra-600']};
    }
    &:disabled {
      border-radius: 0;
      border-bottom: 3px solid ${(props) => props.theme['terra-500']};
    }
  }
  .cancelarCompra {
    color: ${(props) => props.theme.black};
    &:not(:disabled):hover {
      background-color: ${(props) => props.theme.gray};
    }
    &:disabled {
      border-radius: 0;
      border-bottom: 3px solid ${(props) => props.theme.black};
    }
  }
`
