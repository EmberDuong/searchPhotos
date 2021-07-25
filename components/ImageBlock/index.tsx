import classNames from 'classnames'
import { useState, Fragment } from 'react';
import Style from './image.module.css'
import GlobalStyle from '../../styles/home.module.css'

export interface ImageProps {
  src: string
  className?: string
  alt: string
  onClick?: () => void
  title?: string
  loading?: boolean
  user?: any
}

function trimmedString (string: string, length: number) {
  return string.length > length ?
    string.substring(0, length - 3) + "..." :
    string
}

export default function Index (props: ImageProps): JSX.Element {
  const [imageLoader, setImageLoader] = useState(true)
  const { user } = props

  const userInfo = () => {
    return <div className={Style.userGrid}>
      {user &&
      <div className='flex'>
        <img
          className={classNames(Style.userImage, imageLoader && 'bg-gray-500 animate-pulse')}
          alt={imageLoader ? '' : user?.name} src={user?.profile_image.small}/>
        <div className='text-left'>
          <p className='text-white text-sm font-bold'> {user?.name}</p>
          <p className='text-white text-xs '> {trimmedString(user?.bio || '', 35)}</p>
        </div>
      </div>}
    </div>
  }

  return (
    <div className={classNames(props.className, Style.imageBlock)}>
      {(props.loading)?
          <div className={GlobalStyle.loadingProcess}/>
        :
        <Fragment>
          {userInfo()}
          <img className={ classNames(Style.image, imageLoader && 'bg-gray-500 animate-pulse')}
               onLoad={() => setImageLoader(false)}
               src={props.src} alt={imageLoader? '' : props.alt}
               onClick={props?.onClick}
          />
        </Fragment>
      }
    </div>
  )
}