export interface SearchProps {
  placeholder?: string
  onChange: (search: string) => void
  defaultSearch?: string
}

export default function InputSearch (props: SearchProps): JSX.Element {
  return (
    <div className="p-4 w-full">
      <div className="bg-white flex items-center rounded-full shadow-lg">
        <div className="p-4">
          <svg className="h-6 w-6 text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </div>
        <input
          className="rounded-l-full w-auto p-4 text-gray-700 leading-tight focus:outline-none text-lg"
          id="search"
          type="text"
          placeholder={props.placeholder || 'Search'}
          onChange={e => props.onChange(e.target.value)}
          defaultValue={props.defaultSearch || ''}
        />

      </div>
    </div>
  )
}