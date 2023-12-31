import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img.imageBackgroung {
    width: 100%;
    max-height: 600px;
    min-height: 400px;
    object-fit: cover;
    object-position: 50% 50%;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;
  }
  img.imageSeparador {
    width: 15rem;
    padding-top: 1rem;
  }
`
export const MenuContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  top: 0;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 0.5rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  nav {
    display: flex;
    gap: 1.5rem;
    padding: 0.5rem;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-weight: 500;
      box-shadow: none;
      text-align: center;

      color: ${(props) => props.theme.black};

      font-style: none;

      &:hover {
        border-bottom: 1px solid ${(props) => props.theme.black};
        font-weight: 600;
      }
      &.active {
        color: ${(props) => props.theme['terra-600']};
        font-weight: 600;
        border-bottom: 2px solid ${(props) => props.theme['terra-500']};
      }
    }
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 1rem;
      padding: 0.5rem;
    }

    nav {
      gap: 0.97rem;
      padding: 0.5rem 1rem;
    }
  }
`
