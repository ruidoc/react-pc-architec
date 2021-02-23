import React, { useState, useEffect } from 'react'
import { Card, Button, Input, Modal, message, Form, Space, Table, Tag, Divider, Radio } from 'antd';
import { useLocalStore, observer } from 'mobx-react';
import { UserModel, GlobalModel } from '@/models';
import { User } from '@/models/admin';
import dayjs from 'dayjs'

const Admin = observer(() => {

    const model = useLocalStore(() => UserModel);　
    const global_model = useLocalStore(() => GlobalModel);
    const [visible, setVisible] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    
    const toDelete = (item: User) => {
        if (!global_model.userInfo?.is_admin) {
            return message.error('无权限！')
        }
        if (item.is_admin && model.users.filter(user=> user.is_admin).length == 1) {
            return message.error('只剩一个管理员啦！不能删除！')
        }
        Modal.confirm({
            title: '操作提醒',
            content: `确认删除用户 ${item.username} ？`,
            onOk() {
                model.delUser(item.id, () => {
                    model.getUsers()
                })
            }
        })
    }

    const showModal = () => {
        if (!global_model.userInfo?.is_admin) {
            return message.error('无权限！')
        }
        model.setCurUser({
            email: '',
            username: '',
            password: '',
            is_admin: false,
        })
        setIsEdit(false)
        setVisible(true)
    }

    const toEdit = (item: User) => {
        if (!global_model.userInfo?.is_admin) {
            return message.error('无权限！')
        }
        model.setCurUser({
            id: item.id,
            username: item.username,
            password: '',
            is_admin: item.is_admin
        })
        // console.log(JSON.parse(JSON.stringify(model.cur_user)))
        setIsEdit(true)
        setVisible(true)
    }

    const toSubmit = (data: any) => {
        if (isEdit) {
            model.editUser(data, () => {
                setVisible(false)
                model.getUsers()
            })
        } else {
            model.addUser(data, () => {
                setVisible(false)
                model.getUsers()
            })
        }
        
    }

    useEffect(() => {
        if (!model.loaded) {
            model.getUsers()
        }
    }, [model.loaded])

    const extraContent = (
        <div className="extra-content">
            <Button type="primary" onClick={showModal}>添加</Button>
        </div>
    );

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            render: (title: React.ReactNode) => <a>{title}</a>
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            render: (title: React.ReactNode) => <p>{title}</p>
        },
        {
            title: '用户身份',
            dataIndex: 'is_admin',
            render: (bool: boolean) => <Tag color={bool ? 'green' : 'blue'}>{bool ? '管理员' : '普通用户'}</Tag>
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm')
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (t: any, record: User) => <span>
                <a onClick={() => toEdit(record)}>修改</a>
                <Divider type="vertical" />
                <a onClick={() => toDelete(record)} style={{ color: 'red' }}>删除</a>
            </span>
        },
    ];

    return ( 
        <div className="page-admin">
            <Card bordered={false}
                title="用户列表"
                bodyStyle={{ padding: '20px 20px 0 20px' }}
                extra={extraContent}
            >
                <Table
                    rowKey='id'
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={model.users}
                />
            </Card>
            <Modal title={isEdit ? '编辑用户' : '创建用户'} width={500}
                destroyOnClose visible={visible} footer={null} onCancel={()=> setVisible(false)}>
                <Form labelCol={{ span: 4 }} onFinish={toSubmit} initialValues={model.cur_user}>
                    {!isEdit && <Form.Item
                        name='email'
                        label='邮箱：'
                        rules={[{ required: true, message: '邮箱不能为空!' }]}
                    >
                        <Input placeholder='输入邮箱名称' />
                    </Form.Item>}
                    <Form.Item
                        name='username'
                        label='用户名：' 
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder='输入用户名' />
                    </Form.Item>
                    {!isEdit && <Form.Item
                        name='password'
                        label='密码：'
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password placeholder='输入密码' />
                    </Form.Item>}
                    <Form.Item
                        name='is_admin'
                        label='身份：' 
                        rules={[{ required: true, message: '请选择用户身份!' }]}
                    >
                       <Radio.Group>
                            <Radio value={false}>普通用户</Radio>
                            <Radio value={true}>管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type='primary' htmlType='submit'>提交</Button>
                            <Button onClick={()=> setVisible(false)}>关闭</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
})

export default Admin;