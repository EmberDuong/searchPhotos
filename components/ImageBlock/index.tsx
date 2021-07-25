import classNames from 'classnames'
import { useState, Fragment } from 'react';

export interface ImageProps {
  src: string
  className?: string
  alt: string
  onClick?: () => void
  title?: string
  loading?: boolean
  user?: any
}

// user.name
// user.bio
// user.profile_image : {small, medium, large}

function trimmedString (string: string, length: number) {
  return string.length > length ?
    string.substring(0, length - 3) + "..." :
    string
}


export default function Index (props: ImageProps): JSX.Element {
  const [imageLoader, setImageLoader] = useState(true)
  const { user } = props

  const userInfo = () => {
    return <div className='absolute bottom-1.5 left-2 z-10'>
      {user &&
      <div className='flex'>
        <img className='lg:w-10 lg:h-10 w-8 h-8 rounded-full mr-4' alt={user?.name} src={user?.profile_image.small}/>
        <div className='text-left'>
          <p className='text-white text-sm font-bold'> {user?.name}</p>
          <p className='text-white text-xs '> {trimmedString(user?.bio || '', 35)}</p>
        </div>
      </div>}
    </div>
  }

  return (
    <div className={classNames(props.className, 'w-full bg-black rounded-xl relative')}>
      {(props.loading)?
          <div className='rounded-xl bg-gray-500 animate-pulse h-full w-full'/>
        :
        <Fragment >
          {userInfo()}
          <img className={`inset-0 w-full h-full object-center object-cover rounded-xl hover:opacity-100 cursor-pointer opacity-80
        ${imageLoader && 'bg-gray-500 animate-pulse'}`}
               onLoad={() => setImageLoader(false)}
               src={props.src} alt={imageLoader? '' : props.alt}
               onClick={props?.onClick}
          />
        </Fragment>


      }
    </div>
  )
}