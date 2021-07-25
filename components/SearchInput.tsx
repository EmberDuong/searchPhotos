export interface SearchProps {
  placeholder?: string
  onChange: (search: string) => void
  defaultSearch?: string
  loading?: boolean
}

export default function InputSearch (props: SearchProps): JSX.Element {
  return (
    <div className="lg:p-4 w-full p-2">
      <div className="bg-white flex items-center rounded-full shadow relative">
        <div className="p-4">
          <svg className="h-6 w-6 text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </div>
        <input
          className="rounded-l-full lg:w-4/5 w-3/5 p-4 text-gray-700 leading-tight focus:outline-none text-lg"
          id="search"
          type="text"
          placeholder={props.placeholder || 'Search'}
          onChange={e => props.onChange(e.target.value)}
          defaultValue={props.defaultSearch || ''}
        />
        {props.loading && <span className='animate-ping absolute inline-flex h-4 w-4 rounded-full bg-purple-400 opacity-75 shadow-xl right-4' />}
      </div>
    </div>
  )
}