
import React, { useEffect, useState } from 'react'
import { Dropdown, Menu, Avatar, Modal } from 'antd';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react'
import { GlobalModel } from '@/models'
import { getPreurl } from '@/utils';
import { SettingOutlined, LogoutOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import BatchsModel, { filterType } from '@/models/batch';

import './index.less'

const CusHeader = observer(() => {
    
    const location = useLocation();
    const history = useHistory();
    // const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const model = useLocalStore(() => GlobalModel)
    const batchModel = useLocalStore(() => BatchsModel)

    const isBatchList = location.pathname=='/batchs'

    const logout = ()=> {
        localStorage.removeItem('token')
        window.location.href = getPreurl('login')
    }

    const Menudom = (
        <Menu style={{width:'130px'}}>
            <Menu.Item key="0">
                <UserOutlined />个人中心
            </Menu.Item>
            {/* <Menu.Item className='cus-key-item' key="1" onClick={toKeSet}>
                <SettingOutlined />快捷键设置
            </Menu.Item> */}
            <Menu.Divider className='cus-key-item' />
            <Menu.Item key="3" onClick={logout}>
                <LogoutOutlined />退出登录
            </Menu.Item>
        </Menu>
    );

    // const getActiveClass = (path: string) => {
    //     let bool = location.pathname.indexOf(path) > -1
    //     return bool ? 'header-tab active' : 'header-tab'
    // }

    const getActiveClass = (path: filterType) => {
        let bool = batchModel.type == path
        return bool ? 'header-tab active' : 'header-tab'
    }

    const onChangeType = (path: filterType)=> {
        batchModel.setType(path)
    }

    useEffect(() => {
        console.log('location：',location)
        console.log('history',history)
    })

    return (
        <div className="lay-header">
            <div className="header-left">
                <div className="logo">
                    <h1>warehouse</h1>
                </div>
                <div className="header-tabs">
                    {/* <Link to='/monitor' className={getActiveClass('/monitor')}>
                        明细单
                    </Link> */}
                    {/* <Link to='/users' className={getActiveClass('/users')}>
                        用户管理
                    </Link> */}
                    {isBatchList && <div onClick={()=>onChangeType('unfinished')} className={getActiveClass('unfinished')}>待处理订单</div>}
                    {isBatchList && <div onClick={()=>onChangeType('finished')} className={getActiveClass('finished')}>已处理订单</div>}
                    {!isBatchList && <Link to='/batchs' className='header-tab'>
                        回到列表
                    </Link>}
                </div>
            </div>
            <div className="header-right">
                <Dropdown overlay={Menudom} trigger={['click']}>
                    <span className="userwrap">
                        <Avatar>D</Avatar>
                        &nbsp; {model.userInfo?.username||'管理员'}
                    </span>
                </Dropdown>
            </div>
            <Modal title='预标记' width={500}
                destroyOnClose visible={visible} footer={null} onCancel={()=> setVisible(false)}>
            </Modal>
        </div>
    )
})

export default CusHeader