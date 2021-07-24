import classNames from 'classnames'
import { useState } from 'react';

export interface ImageProps {
  src: string
  className?: string
  alt: string
  onClick?: () => void
  title?: string
  loading?: boolean
}

export default function Index (props: ImageProps): JSX.Element {
  const [imageLoader, setImageLoader] = useState(true)

  return (
    <div className={classNames(props.className, 'w-full')}>
      {(props.loading)?
          <div className='rounded-xl bg-gray-500 animate-pulse h-full w-full'/>
        : <img className={`inset-0 w-full h-full object-center object-cover rounded-xl hover:scale-105 cursor-pointer
        ${imageLoader && 'bg-gray-500 animate-pulse'}`}
               onLoad={() => setImageLoader(false)}
            src={props.src} alt={props.alt}
               onClick={props?.onClick}
      />}
    </div>
  )
}