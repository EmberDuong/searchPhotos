import axios from 'axios'

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
})

request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
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
