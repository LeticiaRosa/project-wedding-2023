import { styled } from 'styled-components'

export const ContainerList = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  .item {
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 8px;
  }

  h3 {
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
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
`
