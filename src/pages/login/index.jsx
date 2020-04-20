
import React, { Component } from 'react'
import request from '@/tools/http'

import { Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, WomanOutlined } from '@ant-design/icons';

import './index.less'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    login = async (formdata) => {
        let resdt = await request.post('/admin/login', {
            username: formdata.username,
            password: formdata.password
        })
        if (resdt.code === 201) {
            return message.error(resdt.message)
        }
        localStorage.setItem('adminInfo', JSON.stringify(resdt.data))
        this.props.dispatch({
            type: 'SetUserInfo',
            data: resdt.data
        })
        let resdt2 = await request.post('/token', {
            user_id: resdt.data._id
        })
        localStorage.setItem('admtoken', resdt2.token)
        message.success('登录成功！')
        window.location.href = '/'
        // setTimeout(()=> {
        //     this.props.history.push('/')
        // },1000)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values)
            }
        });
    }
    componentWillMount = () => {
        if (localStorage.admtoken) {
            this.props.history.push('/')
        }
    }
    render() {
        return <section id="login">
            <div className='form-wrap'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <h1 className='h1'>Rui Admin</h1>
                        <p className='desc'>简洁，轻量，通用的 react 后台管理系统</p>
                    </Form.Item>
                    <Form.Item name="username" rules={[
                        { required: true, message: '请输入用户名!' }
                    ]}>
                        <Input prefix={
                            <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>
                        } size="large"
                            placeholder="用户名"
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[
                        { required: true, message: '请输入密码!' }
                    ]}>
                        <Input
                            prefix={<WomanOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" size="large" 
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" initialValue="true">
                        <Checkbox>记住密码</Checkbox>
                        <a style={{float:'right'}} href>
                            忘记密码
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={
                            { width: '100%' }
                        } size="large">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href>注册新账号</a>
                    </Form.Item>
                </Form>
            </div>
            <p className='footer-copyright'>Copyright © 2019 杨成功</p>
        </section>
    }
}

export default Login;