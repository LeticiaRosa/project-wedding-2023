import styled from 'styled-components'

export const Container = styled.main`
  h1 {
    font-size: 3rem;
    padding: 0 0 2rem 0;
    text-align: center;
  }

  p {
    padding: 1rem 0;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2rem;
    }
  }
`
