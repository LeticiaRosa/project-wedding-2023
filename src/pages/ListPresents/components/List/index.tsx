import { ContainerSort, ContainerList } from './styles'
import { ChangeEvent, useEffect, useState } from 'react'
import { Loader } from './Loader'
import { useCart } from '../../../../contexts/contexts'
import { useProducts } from '../../../../contexts/contextProducts'
import { CaretDoubleUp } from 'phosphor-react'
import { Pagination } from './Pagination'

interface Product {
  id: number
  name: string
  price: number
  qtd: number
  url: string
}
export function List() {
  const { newItemCart } = useCart()
  const { updatedProducts } = useProducts()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<
    'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc'
  >('nameAsc')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([]) // State para armazenar os produtos da API

  const getInitialProductsPerPage = () => {
    const screenWidth = window.innerWidth
    if (screenWidth <= 800 && screenWidth > 500) {
      return 6
    } else if (screenWidth <= 500 && screenWidth > 300) {
      return 4
    } else if (screenWidth <= 300) {
      return 2
    } else {
      return 8
    }
  }

  const [productsPerPage, setProductsPerPage] = useState(
    getInitialProductsPerPage(),
  )

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(getInitialProductsPerPage())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)

    fetch('https://64ffc94f18c34dee0cd3f38a.mockapi.io/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter((item: Product) => item.qtd > 0)
        setProducts(filteredProducts)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error)
        setIsLoading(false)
      })
  }, [currentPage, sortOption, updatedProducts])

  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleSortOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(
      event.target.value as 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc',
    )
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'nameAsc') {
      return a.name.localeCompare(b.name)
    } else if (sortOption === 'nameDesc') {
      return b.name.localeCompare(a.name)
    } else if (sortOption === 'priceAsc') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  return (
    <>
      <ContainerSort>
        <label htmlFor="sortOption">Ordenar por:</label>
        <div>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortOptionChange}
          >
            <option value="nameAsc">Nome (A a Z)</option>
            <option value="nameDesc">Nome (Z a A)</option>
            <option value="priceAsc">Preço (Menor para Maior)</option>
            <option value="priceDesc">Preço (Maior para Menor)</option>
          </select>
          <div className="arrow">
            <CaretDoubleUp />
          </div>
        </div>
      </ContainerSort>

      {isLoading ? (
        <Loader />
      ) : (
        <ContainerList>
          {paginatedProducts.map((item) => {
            return (
              <div className="item" key={item.id}>
                <img src={item.url} alt={item.name} />

                <h4>{item.name}</h4>
                <span>
                  {item.qtd}
                  {item.qtd > 1 ? ' disponíveis' : ' disponível'}
                </span>
                <p>
                  {(item.price / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>

                <button
                  className="presentear-btn"
                  onClick={() =>
                    newItemCart({
                      id: item.id,
                      image: item.url,
                      name: item.name,
                      price: item.price,
                    })
                  }
                >
                  <strong>Presentear</strong>
                </button>
              </div>
            )
          })}
        </ContainerList>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  )
}
