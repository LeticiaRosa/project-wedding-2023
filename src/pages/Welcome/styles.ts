import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 700;
    padding-bottom: 3rem;
  }

  div {
    display: flex;
    align-items: start;
    padding-top: 1rem;
    p {
      display: flex;
      align-items: end;
      padding: 0.5rem;
    }
  }
`
