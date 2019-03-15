import { param2Obj } from '@/utils'
import userInfo from '@/assets/data/login/userinfo.json'
const userMap = {
  roles: ['admin'],
  token: 'admin',
  introduction: '我是超级管理员',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  name: 'Super Admin'
}

export default {
  loginByToken: config => { //获取用户名
    return userMap
  },
  getUserInfo: config => { //获取用户详细信息
    return userInfo
  },
  logout: () => 'success'
}
