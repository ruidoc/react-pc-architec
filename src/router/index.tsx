import React from 'react'
import { BrowserRouter, HashRouter, Switch } from 'react-router-dom'
import { LoginPage, HomePage } from './root'
import { ConfigProvider } from 'antd'

import zhCN from 'antd/es/locale/zh_CN'

const Router = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <div id="app">
          <Switch>
            {LoginPage}
            {HomePage}
          </Switch>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default Router
