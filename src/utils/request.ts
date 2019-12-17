import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'

const noErrorMsgList = ['/', '/deliver', '/deliver-info']

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const status = response.status
    const res = response.data
    if (status === 200 || status === 201 || status === 202 || status === 204) {
      if (status === 204) {
        return null
      }
      return response.data
    } else {
      if (!AppModule.isDeliver) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (status === 401 || status === 403) {
        MessageBox.confirm(
          'You have been logged out, try to login again.',
          'Log out',
          {
            confirmButtonText: 'Relogin',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.errorMessage || 'Error'))
    }
  },
  (error) => {
    const msg = error.response.data.errorMessage;
    if (!AppModule.isDeliver) {
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(msg)
  }
)

export default service
