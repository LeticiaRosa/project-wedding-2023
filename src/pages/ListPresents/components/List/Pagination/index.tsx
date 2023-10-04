import { ContainerPagination } from '../../List/styles'

interface PaginationProps {
  totalPages: number
  currentPage: number
  handlePageChange: (page: number) => void
}

export function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationProps) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const renderPageButtons = () => {
    const maxPagesToShow = 6
    const halfMaxPages = Math.floor(maxPagesToShow / 2)
    let startPage = Math.max(1, currentPage - halfMaxPages)
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    const buttons = []
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>,
      )
    }
    return buttons
  }

  return (
    <ContainerPagination>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        &#8249; {/* Seta para a esquerda */}
      </button>
      {renderPageButtons()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        &#8250; {/* Seta para a direita */}
      </button>
    </ContainerPagination>
  )
}
