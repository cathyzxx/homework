// 设置cookie工具文件
import Cookies from 'js-cookie'

const TokenKey = 'user'

export function getToken() {
  console.log(Cookies.get(TokenKey));
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
