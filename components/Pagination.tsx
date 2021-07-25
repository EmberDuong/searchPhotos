import { useEffect, useState } from 'react';
import classNames from 'classnames';

export interface PaginationProps {
  limit: number
  total: number
  page: number
  totalPage: number
  onChangePage: (page: number) => void
  onChangePageSize?: (pageSize: number) => void
  className?: string
}

export default function Pagination (props: PaginationProps): JSX.Element {
  const {page, total, totalPage} = props
  const [startRange, setStartRange] = useState(0)
  const [endRange, setEndRange] = useState(0)
  const [range, setRange] = useState<number[]>([])

  useEffect(() => {
    let start = page - 2
    setStartRange(start)
    let end = page + 3
    if(end >= totalPage) {
      end = totalPage
      start = start - 2
    }
    if (start <= 0)
      start = 1
    if(start < 2) end = end + 2
    setEndRange(end)
    const list = []
    for(let i = start; i < end; i++){
      if(i !== 1 && i !== totalPage)
        list.push(i)
    }
    setRange(list)
  }, [page])

  const nextPage = () => {
    if(page > 0 && page < total)
      props.onChangePage(page + 1)
  }
  const previousPage = () => {
    if(page <= total && page > 1)
      props.onChangePage(page - 1)
  }
  const setPage = (pageNumber: number) => {
    if(pageNumber <= total && pageNumber > 0)
      props.onChangePage(pageNumber)
  }
  const ButtonPage = (pageNumber: number) => {
    return (
      <button
        onClick={() => setPage(pageNumber)}
        key={pageNumber}
        className={`mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg ${page === pageNumber && 'bg-gray-500'}`}>
        <p className={`font-bold ${page === pageNumber && 'text-gray-100'}`}>{pageNumber}</p>
      </button>
    )}

  return (
    <ul className={classNames('flex', props?.className)}>
      <button className="flex items-center font-bold hover:bg-gray-300 rounded-lg"
              onClick={() => previousPage()}
              disabled={page <= 1}>
        <span className={`mx-1 ${page <= 1 && 'font-bold text-gray-100'}`}>previous</span>
      </button>

      {totalPage > 0 && ButtonPage(1)}

      { startRange > 2 &&
      <div className="flex items-center font-bold m-2">
        <span className={`mx-1 ${page <= 1 && 'text-gray'}`}>...</span>
      </div> }

      {range.map(item => ButtonPage(item))}

      { (endRange < totalPage - 2) &&
      <div className="flex items-center font-bold m-2">
        <span className={`mx-1 ${page <= 1 && 'text-gray'}`}>...</span>
      </div> }

      {totalPage > 1 && ButtonPage(totalPage)}

      <button className="flex items-center font-bold hover:bg-gray-300 rounded-lg" onClick={() => nextPage()} disabled={page >= total}>
        <span className={`mx-1 ${page >= total && 'font-bold text-gray-100'}`}>Next</span>
      </button>
    </ul>
  )
}