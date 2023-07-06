import { styled } from 'styled-components'

export const ContainerSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  label {
    width: 20%;
    white-space: nowrap;
  }
  select {
    padding: 0.5rem;
    color: ${(props) => props.theme.black};
    margin: 0.5rem;
    border-radius: 8px;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.gray};
    gap: 0.5rem;
    cursor: pointer;
  }
`
export const ContainerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  max-width: 900px;
  min-height: 300px;

  .item {
    text-align: center;
    background-color: ${(props) => props.theme['terra-100']};
  }

  img {
    width: 80%;
    max-width: 150px;
    height: auto;
    border-radius: 8px;
  }

  h4 {
    margin-top: 1rem;
    font-size: 1rem;
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  .presentear-btn {
    padding: 8px 16px;
    background-color: ${(props) => props.theme['terra-600']};
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    font-weight: 500;
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    padding: 0.5rem;
    color: ${(props) => props.theme.black};
    margin: 0.5rem;
    border-radius: 8px;
    border: none;

    font-size: 1rem;
    font-weight: bold;
    gap: 0.5rem;
    cursor: pointer;

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme.gray};
    }
    &:disabled {
      border-radius: 0;
      border-bottom: 3px solid ${(props) => props.theme.black};
    }
  }
`
