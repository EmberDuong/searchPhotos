export interface PaginationProps {
  limit: number
  total: number
  page: number
  onChangePage: (page: number) => void
  onChangePageSize?: (pageSize: number) => void
}

export default function Pagination (prop: PaginationProps): JSX.Element {


  return (
    <div>
      Pagination here
      {prop.limit}
    </div>
  )
}