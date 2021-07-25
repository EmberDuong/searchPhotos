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
    let end = page + 2
    if(end >= totalPage)
      end = totalPage
    if (start <= 0)
      start = 1
    if(start < 2) end = end + 2
    setStartRange(start)
    setEndRange(end)
    const list = []
    for(let i = start; i < end; i++){
      if(i !== 1 && i !== totalPage)
        list.push(i)
    }
    setRange(list)
  }, [page])

  const nextPage = () => {
    if(page > 0 && page < totalPage)
      props.onChangePage(page + 1)
  }
  const previousPage = () => {
    if(page <= totalPage && page > 1)
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
        className={`mx-1 lg:px-3 lg:py-2 p-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg ${page === pageNumber && 'bg-gray-500'}`}>
        <p className={`font-bold lg:text-sm text-xs  ${page === pageNumber && 'text-gray-100'}`}>{pageNumber}</p>
      </button>
    )}
  return (
    <ul className={classNames('flex', props?.className)}>
      <button className={`flex items-center font-bold rounded-lg ${page > 1 && 'hover:bg-gray-300'}`}
              onClick={() => previousPage()}
              disabled={page <= 1}>
        <span className={`lg:text-sm text-xs mx-1 ${page <= 1 && ' text-gray-300'}`}>
          <img
            className='w-6 h-6'
            src="https://img.icons8.com/pastel-glyph/64/000000/double-left.png" alt='pre'/>
        </span>
      </button>

      {totalPage > 0 && ButtonPage(1)}

      { startRange > 2 &&
      <div className="flex items-center font-bold lg:m-2">
        <span className={`mx-1 ${page <= 1 && 'text-gray'}`}>...</span>
      </div> }

      {range.map(item => ButtonPage(item))}

      { (endRange < totalPage - 2) &&
      <div className="flex items-center font-bold lg:m-2">
        <span className={`mx-1 ${page <= 1 && 'text-gray'}`}>...</span>
      </div> }

      {totalPage > 1 && ButtonPage(totalPage)}

      <button className={`flex items-center font-bold rounded-lg ${page < totalPage && 'hover:bg-gray-300'}`}
              onClick={() => nextPage()}
              disabled={page >= totalPage}>
        <span className={`lg:text-sm text-xs mx-1 ${page >= totalPage && ' text-gray-300'}`}>
          <img
            className={`w-6 h-6 ${page >= totalPage && 'text-gray-300'}`}
            alt={'next'}
            src="https://img.icons8.com/pastel-glyph/64/000000/double-right.png"/>
        </span>
      </button>
    </ul>
  )
}