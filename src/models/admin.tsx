import { observable, action } from 'mobx';
import http from '@/request'
import { message } from 'antd';

export interface User {
    id: number,
    email: string,
    is_admin: boolean,
    username: string,
    created_at: string,
    user_task_image_count: number,
    user_task_image_remain_count: number,
}

export interface CurUser {
    id?: number,
    email?: string,
    username: string,
    password: string,
    is_admin: boolean,
}

class UsersModel {

    // 用户信息
    @observable users: User[] = []

    @observable cur_user: CurUser = {
        email: '',
        username: '',
        password: '',
        is_admin: false,
    }

    @observable loaded: boolean = false

    // 获取用户列表
    @action getUsers = async () => {
        let res = await http.get('/users');
        if (res) {
            let data: any = res;
            this.users = data.users
        }
    }

    // 添加用户
    @action addUser = async (data: CurUser, fn: ()=> void) => {
        let res = await http.post('/users', data);
        if (res) {
            let data: any = res;
            if (data && data.code == 0) {
                message.success('创建用户成功！')
                fn();
            }
        }
    }

    // 修改用户
    @action editUser = async (data: CurUser, fn: () => void) => {
        let id = this.cur_user.id
        let res = await http.put('/users/'+id, data);
        if (res) {
            let data: any = res;
            if (data && data.code == 0) {
                message.success('修改用户成功！')
                fn();
            }
        }
    }

    // 删除用户
    @action delUser = async (id: number, fn: ()=> void) => {
        let res = await http.delete('/users/' + id);
        if (res) {
            let data: any = res;
            if (data && data.code == 0) {
                message.success('删除用户成功！')
                fn();
            }
        }
    }

    @action setCurUser = (data: CurUser) => {
        this.cur_user = data;
    }

}

const store = new UsersModel();

export default store;