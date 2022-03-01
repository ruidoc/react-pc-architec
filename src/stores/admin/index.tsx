import { makeAutoObservable } from 'mobx'
import http from '@/request'
import { message } from 'antd'
import { CurUser, User } from './type'

class UsersModel {
  constructor() {
    makeAutoObservable(this)
  }
  // 用户信息
  users: User[] = []

  cur_user: CurUser = {
    email: '',
    username: '',
    password: '',
    is_admin: false,
  }

  loaded: boolean = false

  // 获取用户列表
  getUsers = async () => {
    let res = await http.get('/users')
    if (res) {
      let data: any = res
      this.users = data.users
    }
  }

  // 添加用户
  addUser = async (data: CurUser, fn: () => void) => {
    let res = await http.post('/users', data)
    if (res) {
      let data: any = res
      if (data && data.code == 0) {
        message.success('创建用户成功！')
        fn()
      }
    }
  }

  // 修改用户
  editUser = async (data: CurUser, fn: () => void) => {
    let id = this.cur_user.id
    let res = await http.put('/users/' + id, data)
    if (res) {
      let data: any = res
      if (data && data.code == 0) {
        message.success('修改用户成功！')
        fn()
      }
    }
  }

  // 删除用户
  delUser = async (id: number, fn: () => void) => {
    let res = await http.delete('/users/' + id)
    if (res) {
      let data: any = res
      if (data && data.code == 0) {
        message.success('删除用户成功！')
        fn()
      }
    }
  }

  setCurUser = (data: CurUser) => {
    this.cur_user = data
  }
}

const store = new UsersModel()

export default store
