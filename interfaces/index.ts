export type PaginationType = {
  page : number
  per_page : number
}

export type UrlType = {
  large: string
  regular: string
  raw: string
  small: string
}

export type LinkType = {
  self: string
  html: string
  download: string
  downloadLocation: string
}

export type PhotoType = {
  id: number
  width: number
  height: number
  urls: UrlType
  links: LinkType
  color: string | null
  description?: string
  like?: number
};

export type DataType = {
  results: any[]
  total: number
  total_pages: number
}

export type PayloadType = {
  pagination: PaginationType,
  query: string
}