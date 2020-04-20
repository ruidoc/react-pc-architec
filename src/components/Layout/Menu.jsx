
import React, { Component } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UsergroupAddOutlined, AppleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Menucop extends Component {
    menuclick = par=> {
        this.props.history.push(par.key)
    }
    render = ()=> {
        return (
            <section className="lay-menu">
                <div className="logo">
                    <h1>RUI</h1>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark" onClick={this.menuclick}>
                    <Menu.Item key="/">
                        <HomeOutlined />
                        <span>首页</span>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <UserOutlined />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="admin">
                        <UsergroupAddOutlined />
                        <span>管理员管理</span>
                    </Menu.Item>
                    <SubMenu key="goods"
                        title={<span>
                            <AppleOutlined />
                            <span>商品管理</span>
                        </span>}>
                        <Menu.Item key="goodadd">添加商品</Menu.Item>
                        <Menu.Item key="goods">商品列表</Menu.Item>
                        <Menu.Item key="goodgroup">商品分类</Menu.Item>
                    </SubMenu>
                </Menu>
            </section>
        );
    }
}

export default Menucop;