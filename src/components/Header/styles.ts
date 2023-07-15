import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img.imageBackgroung {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: 10% 40%;
  }
  img.imageSeparador {
    width: 20%;
    padding: 1rem;
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
    gap: 2rem;
    padding: 0.5rem;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-weight: 500;
      box-shadow: none;

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
`
