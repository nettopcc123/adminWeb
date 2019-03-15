import request from '@/utils/request'

export function loginByToken(username, password) {
  const data = {
    userName: username,
    passWord: password,
    passcode: '',
    loginToken: ''
  }
  return request({
    url: '/login/login',
    method: 'post',
    headers: {
      'channel': 0,
    },
    params: data
  }
  )
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    baseURL: '/', // 请求自己配的json
    url: '/static/data.json',
    url: '/user/info',
    method: 'get',
    headers: {
      'Authorization': token,
    },
    params: {}
  })
}

export function getFallRoute(token) {
  return request({
    baseURL: '/', // 请求自己配的json
    url: '//static/fulldata.json',
    method: 'get',
    params: { token }
  })
}