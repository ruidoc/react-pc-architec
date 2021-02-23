
import React, { useEffect, useState } from 'react'
import request from '@/request'
import { observer, useLocalStore } from 'mobx-react';
import { GlobalModel } from '@/models';

import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getPreurl } from '@/utils';

const Login = observer(() => {

    // const history = useHistory();
    const [loading, setLoading] = useState(false);
    const model = useLocalStore(() => GlobalModel);

    const toLogin = async (formdata: any) => {
        setLoading(true)
        let res = await request.post('/sessions.json', {
            partner_session: formdata
        }).catch(err=> {});
        setLoading(false)
        if (!res) {
            return false
        }
        let rsdata: any = res;
        if (rsdata.session) {
            localStorage.setItem('userInfo', JSON.stringify(rsdata.user))
            localStorage.setItem('token', rsdata.session.token)
            model.setUserInfo(rsdata.user)
            message.success('登录成功！')
            window.location.href = getPreurl()
        } else {
            return message.error('登录失败！')
        }
    }

    useEffect(() => {
        if (localStorage.token) {
            window.location.href = getPreurl()
        }
    }, [])

    return <section id="login">
        <div className='login-trunk'>
            <Form onFinish={toLogin}>
                <Form.Item>
                    <h1 className='title'>2ccm warehouse</h1>
                    <p className='sub-title'>2ccm平台跨境转运仓</p>
                </Form.Item>
                <Form.Item
                    name='email'
                    rules={[{ required: true, message: '请输入邮箱!' }]}
                >
                    <Input
                        prefix={<UserOutlined color='rgba(0,0,0,.25)' />}
                        size="large" allowClear 
                        placeholder="邮箱"
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password
                        prefix={<ClockCircleOutlined color='rgba(0,0,0,.25)' />}
                        size="large"
                        placeholder="密码"
                    />
                </Form.Item>
                {/* <Form.Item
                    // name='remember'
                    valuePropName='checked'
                >
                    <Checkbox>记住密码</Checkbox>
                    <a style={{ float: 'right' }}>
                        忘记密码
                    </a>
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={
                        { width: '100%' }
                    } loading={loading} size="large">
                        登录
                    </Button>
                </Form.Item>
                {/* <Form.Item>
                    <a>注册新账号</a>
                </Form.Item> */}
            </Form>
        </div>
        <p style={{
            width: '100%',
            textAlign: 'center',
            position: 'fixed',
            color: '#bbb',
            bottom: 20
        }}>develop by 2ccm team</p>
    </section>
})

export default Login;