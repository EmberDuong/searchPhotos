import Head from 'next/head'
import request from '../utils/request'
import { useEffect, useState } from 'react'
import * as type from '../interfaces'
import { toStringParams } from '../utils/helper'
import useDebounce from '../components/Debounce'
import Image from '../components/ImageBlock'
import SearchInput from '../components/SearchInput';
const defaultPayload = {
    page: 0,
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

  useEffect(() => {
    if(debouncedSearchTerm) {
      setIsSearching(true)
      searchPhoto()
    }
  }, [debouncedSearchTerm])

  const onChangeSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Searching image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to image searching!
        </h1>
      <div className='w-1/2'>
        <SearchInput
          placeholder="Search Image"
          onChange={onChangeSearch}
        />
      </div>

        {isSearching && <div>Searching ...</div>}
        <div className='flex flex-wrap content-start w-full p-2'>
          {data && data?.results.map((item: type.PhotoType) => (
            <div key={item.id} className='w-1/4 p-2'>
              <Image
                src={item.urls.regular}
                className='h-60'
                alt={item.description || ''}/>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
      </footer>
    </div>
  )
}
