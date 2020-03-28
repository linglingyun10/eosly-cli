import axios from 'axios'
import qs from 'qs'
const errorHandle = (status, other) => {
  switch (status) {
    // 未登录
    case 401:
      break
    // 登陆过期
    case 403:
      break
    // 请求不存在
    case 404:
      console.log('请求不存在')
      break
    default:
      console.log(other)
  }
}

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 3
axios.defaults.retryDelay = 2000
var instance = axios.create({
  baseURL: 'http://120.31.70.243:8888',
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }]
})

instance.defaults.withCredentials = true // 跨域携带cookie
// eslint-disable-next-line
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)
instance.interceptors.response.use(
  res => {
    console.log('=====resolve===', res)
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
  },
  error => {
    console.log('====error===', error)
    const { response } = error

    if (response) {
      console.log('====error=response==', response)
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      if (!window.navigator.onLine) {
        // 没连上网的处理
        console.log('===error11111===', error)
        var config = error.config
        config.retryCount = config.retryCount || 0
        if (config.retryCount >= axios.defaults.retry) {
          // 提示网络异常
          // Todo
          return Promise.reject(error)
        }
        // app.$loading.open()
        config.retryCount += 1
        var backoff = new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, axios.defaults.retryDelay)
        })
        return backoff.then(() => {
          config.data = qs.parse(config.data)
          return instance(config)
        })
      } else {
        // app.$loading.close()
        return Promise.reject(error)
      }
    }
  }
)
export default instance
