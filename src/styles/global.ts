import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        box-sizing: border-box;
        padding: 0;
    }

    :focus{
        outline: 0;
        box-shadow:  0 0 0 2px ${(props) => props.theme['terra-500']};
    }

    body{
        background: ${(props) => props.theme.white};
        color:${(props) => props.theme.black};
        -webkit-font-smoothing: antialiased;
        font-size: 1rem;
        font-family: 'Sintony', sans-serif;
    }

    html {
        scroll-behavior: smooth;
    }

    border-style, input-security, textarea, button, input {
        font-family: 'Sintony', sans-serif;
        font-weight: 400;
        font-size: 0.8rem;
    }
    h1,h2,h3{
        font-family: 'Dancing Script', cursive;
        font-weight: 500; 
        font-size: 2rem; 
        
    }

    ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color:${(props) => props.theme.gray};
    border-radius: 5px;
  }

  /* Estilos para navegadores Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.gray} transparent;

 

`
