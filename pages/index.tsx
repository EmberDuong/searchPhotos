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
import Style from '../styles/home.module.css'

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
  const debouncedPage = useDebounce(pagination.page, 1000);

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
      }).catch(e => {console.log(e)})
    } else {
      setData({ results: [], total: 0, total_pages: 0 })
      setIsSearching(false)
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

  const noDataRender = () => {
    if(!isSearching)
      return (
        <div className='w-full justify-center items-center h-60'>
          <h1 className='lg:text-3xl font-bold text-gray-700 text-xl text-gray-500'>
            {debouncedSearchTerm? `No photos found for "${debouncedSearchTerm}"` : 'Type something to search for image'}
          </h1>
        </div>
      )
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Find the perfect photo of yourself</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main className={Style.home}>
        <h1 className={Style.title}>
          SWAT UNSPLASH TAKE HOME
        </h1>

        <div className='lg:w-1/2 w-full'>
          <SearchInput
            placeholder="Type something to search for image"
            onChange={onChangeSearch}
            defaultSearch={searchTerm}
            loading={isSearching}
          />
        </div>

        <div className={Style.block}>
          {(data && data?.results.length>0)?
            data?.results.map((item: type.PhotoType) => (
            <div key={item.id} className='lg:w-1/4 lg:p-2 md:p-1 md:w-1/2 w-full p-2'>
              <Image
                src={item.urls.regular}
                loading={isSearching}
                className='h-60'
                onClick={() => handleClickImage(item.links.html || item.urls.regular)}
                user={item.user}
                alt={item.description || ''}/>
            </div>
          ))
          : noDataRender()
          }

          {}
        </div>

        {data && data?.results.length > 0 && <Pagination
          className='p-4'
          limit={16} onChangePage={handleChangePagination} page={pagination.page} total={data?.total} totalPage={data?.total_pages}/>}

      </main>
      <footer className={Style.footer}>
        <div className="mt-2">© Copyright 2021 / Son Duong</div>
      </footer>
    </div>
  )
}
