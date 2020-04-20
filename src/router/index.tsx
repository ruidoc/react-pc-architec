
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import Home from '@page/home';
import Login from '@page/login';

const Router = (
    <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <div id="app">
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Home} />
                </Switch>
            </div>
        </ConfigProvider>
    </BrowserRouter>
)

export default Router;