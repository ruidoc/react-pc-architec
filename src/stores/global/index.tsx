import { makeAutoObservable } from 'mobx'
import { UserInfo } from './type'

class Global {
  constructor() {
    makeAutoObservable(this)
  }
  // 用户信息
  userInfo: UserInfo | null = null

  // 设置用户信息
  setUserInfo = (data: any) => {
    data.username = data.first_name
    this.userInfo = data
  }
}

const store = new Global()

export default store
