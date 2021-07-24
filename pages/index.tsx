import Head from 'next/head'
import request from '../utils/request'
import { useEffect, useState } from 'react'
import * as type from '../interfaces'
import { toStringParams } from '../utils/helper'
import useDebounce from '../components/Debounce'
import Image from '../components/ImageBlock'
import SearchInput from '../components/SearchInput'
import Pagination from '../components/Pagination'
const defaultPayload = {
    page: 1,
    per_page: 16
}

export default function Home() {
  const [pagination, setPagination] = useState<type.PaginationType>(defaultPayload)
  const [data, setData] = useState<type.DataType | undefined>(undefined)
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const searchPhoto = () => {
    if(pagination && debouncedSearchTerm)
    {
      const params = toStringParams({...pagination, query: debouncedSearchTerm})
      request.get('/photos?' + params).then(results => {
        setIsSearching(false)
        return setData(results.data as unknown as type.DataType )
      })
    }
  }
  const handleChangePagination = (page: number) => {
    const newPagination = {page}
    setPagination({...pagination, ...newPagination})
  }

  useEffect(() => {
    if(debouncedSearchTerm) {
      setIsSearching(true)
      searchPhoto()
    }
  }, [debouncedSearchTerm, pagination])

  const onChangeSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleClickImage = (url: string) => {
    window.open(url)
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Searching image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full flex-1 px-20 text-center p-4">
        <h1 className="text-6xl font-bold">
          Welcome to image searching!
        </h1>
      <div className='w-1/2'>
        <SearchInput
          placeholder="Type something to search for image"
          onChange={onChangeSearch}
        />
      </div>
        <div className='flex flex-wrap content-start w-full p-2'>
          {data && data?.results.map((item: type.PhotoType) => (
            <div key={item.id} className='w-1/4 p-2'>
              <Image
                src={item.urls.regular}
                loading={isSearching}
                className='h-60'
                onClick={() => handleClickImage(item.urls.regular)}
                alt={item.description || ''}/>
            </div>
          ))}
        </div>
        {data && data?.results &&
        <Pagination
          className='p-4'
          limit={16} onChangePage={handleChangePagination} page={pagination.page} total={data?.total} totalPage={data?.total_pages}/>}
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
      </footer>
    </div>
  )
}
