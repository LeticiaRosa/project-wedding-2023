import { styled } from 'styled-components'

type menuProps = {
  expandedMenu: boolean
}

export const ContainerCart = styled.div<menuProps>`
  border-radius: 8px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  bottom: 0;
  right: 0;
  width: 100%;
  height: 80%;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  max-height: 600px;
  ${({ expandedMenu }) =>
    expandedMenu &&
    `
    height: 60px;
    background: rgba(255,166,77,1);

  `}
  .dropdown-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #ddd;
    cursor: pointer;
  }
`

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 0.5rem 0;
  padding-bottom: 1rem;
  p {
    padding: 0 1rem;
    z-index: 1000;
  }
`

export const ContainerElements = styled.div`
  flex-direction: column;
  padding: 1.2rem;

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
  max-height: 400px;

  .item {
    display: flex;
    align-items: center;
    text-align: center;
  }
`

export const FooterCart = styled.div`
  padding: 1.2rem;
`

export const ContainerTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
