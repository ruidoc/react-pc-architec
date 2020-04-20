
import React from 'react'
import { Dropdown, Menu, Avatar } from 'antd';
import { ToolOutlined, UserOutlined, PoweroffOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

class Header extends React.Component {
    logout = ()=> {
        localStorage.removeItem('admtoken')
        window.location.href = '/login'
    }
    componentWillMount() {
        console.log('header',this.props)
    }
    render() {
        const { collapsed, toggle, userInfo } = this.props
        const Menudom = (
            <Menu style={{width:'130px'}}>
                <Menu.Item key="0">
                    <UserOutlined />个人中心
                </Menu.Item>
                <Menu.Item key="1">
                    <ToolOutlined />个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={this.logout}>
                    <PoweroffOutlined />退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="lay-header">
                <div className="header-title">
                    <span className="trigger" onClick={toggle}>
                        {collapsed && <MenuFoldOutlined />}
                        {!collapsed && <MenuUnfoldOutlined />}
                    </span>
                </div>
                <div className="rightdv">
                    <Dropdown overlay={Menudom}>
                        <span className="userwrap">
                            <Avatar>A</Avatar>
                            &nbsp; {userInfo?userInfo.username:'管理员'}
                        </span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default Header