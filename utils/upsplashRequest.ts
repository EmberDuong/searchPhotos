import axios from 'axios'
const token = process.env.REACT_APP_UNSPLASH_KEY
const request = axios.create({
  baseURL: process.env.REACT_APP_API_UNSPLASH || '/api',
})

request.interceptors.request.use(
  function (config) {
    config.headers.authorization = `Client-ID ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    return response?.data
  },
  function (error) {
    console.error(error.response)
    throw Error(error)
  }
)

export default request
