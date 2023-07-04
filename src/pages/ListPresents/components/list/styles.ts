import { styled } from 'styled-components'

export const ContainerList = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  .item {
    text-align: center;
    background-color: ${(props) => props.theme['terra-100']};
  }

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 8px;
  }

  h4 {
    margin-top: 10px;
    font-size: 16px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
  }

  .presentear-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: ${(props) => props.theme['terra-700']};
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    color: white;
  }
`
