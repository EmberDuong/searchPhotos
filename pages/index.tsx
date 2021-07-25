import Head from 'next/head'
import request from '../utils/request'
import { useEffect, useMemo, useState } from 'react';
import * as type from '../interfaces'
import { toStringParams } from '../utils/helper'
import useDebounce from '../components/Debounce'
import Image from '../components/ImageBlock'
import SearchInput from '../components/SearchInput'
import Pagination from '../components/Pagination'
import { useRouter } from 'next/router'

const defaultPayload = {
    page: 1,
    per_page: 16
}

export default function Home() {
  const router = useRouter()

  const [pagination, setPagination] = useState<type.PaginationType>(defaultPayload)
  const [data, setData] = useState<type.DataType | undefined>(undefined)
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedPage = useDebounce(pagination.page, 800);

  useMemo(() => {
    const {page, query} = router.query
    if(page) setPagination({page: Number(page), per_page: 16})
    if(query) setSearchTerm(query as string)
  }, [router.query])


  const fetchPhoto = () => {
    if(debouncedPage && debouncedSearchTerm)
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
    if(debouncedSearchTerm || debouncedPage) {
      setIsSearching(true)
      fetchPhoto()
      if(debouncedSearchTerm)
        router.push(`?page=${pagination.page}&query=${searchTerm}`, undefined,{shallow: true})
    }
  }, [debouncedSearchTerm, debouncedPage])

  const onChangeSearch = (value: string) => {
    setSearchTerm(value)
    setPagination(defaultPayload)
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

      <main className="flex flex-col items-center w-full flex-1 lg:px-20 text-center lg:p-4">
        <h1 className="lg:text-3xl font-bold text-gray-700 text-xl">
          SWAT UNSPLASH TAKE HOME
        </h1>

        <div className='lg:w-1/2 w-full'>
          <SearchInput
            placeholder="Type something to search for image"
            onChange={onChangeSearch}
            defaultSearch={searchTerm}
          />
        </div>

        <div className='flex flex-wrap content-start w-full p-2'>
          {data && data?.results.map((item: type.PhotoType) => (
            <div key={item.id} className='lg:w-1/4 lg:p-2 md:p-1 md:w-1/2 w-full p-2'>
              <Image
                src={item.urls.regular}
                loading={isSearching}
                className='h-60'
                onClick={() => handleClickImage(item.links.html || item.urls.regular)}
                user={item.user}
                alt={item.description || ''}/>
            </div>
          ))}
        </div>

        {data && data?.results && <Pagination
          className='p-4'
          limit={16} onChangePage={handleChangePagination} page={pagination.page} total={data?.total} totalPage={data?.total_pages}/>}

      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
      </footer>
    </div>
  )
}
