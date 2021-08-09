import request from '@/utils/request'
import qs from 'qs'

export function login(username, password) {
  const data = qs.stringify({
    username,
    password
  })
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function register(form) {
  const data = qs.stringify(form)
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}
