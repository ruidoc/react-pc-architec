import React from 'react'
import { Route } from 'react-router-dom';

import Menus from '@component/Layout/Menu';
import MyHeader from '@component/Layout/Header';
// import User from '@page/user';
// import Admin from '@page/admin';
import Goods from '@page/goods/list';
import Goodadd from '@page/goods/add';
import Goodgroup from '@page/goods/group';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class Home extends React.Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    componentWillMount() {
        if(!localStorage.admtoken) {
            this.props.history.push('/login')
        }
        if(localStorage.adminInfo) {
            this.props.dispatch({
                type: 'SetUserInfo',
                data: JSON.parse(localStorage.adminInfo)
            })
        }
        console.log('home',this.props)
    }
    render() { return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="256" style={{
                boxShadow : '2px 0 6px rgba(0, 21, 41, 0.35)'
            }}>
                <Menus {...this.props}></Menus>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <MyHeader collapsed={this.state.collapsed} toggle={this.toggle} {...this.props}></MyHeader>
                </Header>
                <Content>
                    {/* <Route path='/user' component={User}></Route> */}
                    {/* <Route path='/admin' component={Admin}></Route> */}
                    <Route path='/goods' component={Goods}></Route>
                    <Route path='/goodadd' render={props=> <Goodadd {...this.props}></Goodadd>}></Route>
                    <Route path='/goodgroup' component={Goodgroup}></Route>
                </Content>
                <Footer>
                    <div className="lay-footer">
                        <p>技术支持：ruidocgo@gamil.com</p>
                        <p>Copyright © 2019 杨成功</p>
                    </div>
                </Footer>
            </Layout>
        </Layout>
    )}
}

export default Home;