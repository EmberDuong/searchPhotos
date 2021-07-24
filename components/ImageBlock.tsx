import classNames from 'classnames'

export interface ImageProps {
  src: string
  className?: string
  alt: string
  onClick?: () => void
  title?: string
}

export default function ImageBlock (props: ImageProps): JSX.Element {
  return (
    <div className={classNames(props.className, 'w-full')}>
      <img className='inset-0 w-full h-full object-center object-cover'
        src={props.src} alt={props.alt}
      />
    </div>
  )
}