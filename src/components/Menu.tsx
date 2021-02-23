
import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons'

interface Props {
    menus: {
        path: string;
        label: string;
        children?: {
            path: string;
            label: string;
        }[];
    }[],
    multiple?: boolean,
    onChange: () => void
}

const CusMenu = (props: Props) => {

    // const history = useHistory();

    const [collapsed, setcollapsed] = useState(false);

    const toggle = () => {
        setcollapsed(!collapsed);
    };
    
    const menuclick = (par: any) => {
        console.log(par);
    }

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed} width="256" className="lay-menu">
            <div style={{ height: '10px' }}></div>
            <Menu
                mode="inline"
                multiple={props.multiple} 
                onSelect={menuclick} 
                onDeselect={menuclick}>
                {props.menus.map(menudate => {
                    if (menudate.children) {
                        return <Menu.SubMenu key={menudate.path}
                            title={<span> <PlusOutlined /><span>{menudate.label}</span> </span>}>
                            {menudate.children.map(itemdata => <Menu.Item key={itemdata.path}>{itemdata.label}</Menu.Item>)}
                        </Menu.SubMenu>
                    } else {
                        return <Menu.Item key={menudate.path}>
                            <MinusOutlined />
                            <span>{menudate.label}</span>
                        </Menu.Item>
                    }
                })}
            </Menu>
            <div className='trigger-wrap'>
                <span className="trigger" onClick={toggle}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
            </div>
        </Layout.Sider>
    );
}

export default CusMenu;