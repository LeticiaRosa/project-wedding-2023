import { ContainerList } from './styles'
import { productsLists } from '../../../../constants/productsList'

export function List() {
  return (
    <ContainerList>
      {productsLists.map((item) => {
        return (
          <div className="item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>R${item.price / 100}</p>
            <button className="presentear-btn">Presentear</button>
          </div>
        )
      })}
    </ContainerList>
  )
}
