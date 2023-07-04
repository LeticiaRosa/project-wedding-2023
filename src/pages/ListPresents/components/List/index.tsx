import { ContainerSort, ContainerList, ContainerPagination } from './styles'
import { productsLists } from '../../../../constants/productsList'
import { ChangeEvent, useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { Cart } from '../Cart'

export function List() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<
    'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc'
  >('nameAsc')
  const [isLoading, setIsLoading] = useState(false)
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
    // Simulando um atraso de 1 segundo para mostrar o carregamento
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentPage, sortOption])

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(getInitialProductsPerPage())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalPages = Math.ceil(productsLists.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleSortOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(
      event.target.value as 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc',
    )
  }

  const sortedProducts = [...productsLists].sort((a, b) => {
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
        <Cart />
        <label htmlFor="sortOption">Ordenar por:</label>
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
      </ContainerSort>

      {isLoading ? (
        <Loader />
      ) : (
        <ContainerList>
          {paginatedProducts.map((item) => {
            return (
              <div className="item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>
                  {(item.price / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <button className="presentear-btn">Presentear</button>
              </div>
            )
          })}
        </ContainerList>
      )}

      <ContainerPagination>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ),
        )}
      </ContainerPagination>
    </>
  )
}
