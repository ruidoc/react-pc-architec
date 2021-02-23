import { observable, action } from "mobx";

export interface UserInfo {
    id: number,
    email: string,
    is_admin: boolean,
    username: string,
}

export interface ShortKe {
    name: string,
    key: string,
    label: string,
}

class Global {

    // 用户信息
    @observable userInfo: UserInfo | null = null

    // 设置用户信息
    @action setUserInfo = (data: any) => {
        data.username = data.first_name
        this.userInfo = data
    }

}

const store = new Global();

export default store;