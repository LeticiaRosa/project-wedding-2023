import styled from 'styled-components'
export const Container = styled.main`
  h1 {
    font-size: 3rem;
    text-align: center;
  }
  h2 {
    font-size: 1rem;
    font-weight: 700;
    padding-bottom: 3rem;
  }

  div {
    padding-top: 1rem;
    p {
      display: flex;
      align-items: end;
      padding: 0.5rem;
    }
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 2rem;
    }
  }
`
