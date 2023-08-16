import styled from 'styled-components'
export const Container = styled.main`
  h1 {
    font-size: 3rem;
    padding: 0 0 2rem 0;
    text-align: center;
  }

  iframe {
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
  p {
    padding: 0.5rem;
    text-align: center;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2rem;
    }
  }
`
