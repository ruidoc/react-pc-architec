
import React from 'react';
import {
    BrowserRouter, HashRouter, Switch
} from 'react-router-dom';
import { LoginPage, HomePage, otherPage } from './root';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

const Router = () => {
    return (
        <HashRouter>
            <ConfigProvider locale={zhCN}>
                <div id="app">
                    <Switch>
                        {LoginPage}
                        {otherPage}
                        {HomePage}
                    </Switch>
                </div>
            </ConfigProvider>
        </HashRouter>
    )
}

export default Router;