import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { observer, useLocalStore } from 'mobx-react'
import { Layout } from 'antd'
import { CusHeader } from '@/components'
import { getPreurl } from '@/utils'
import { UsersPage, TestPage } from '@/router/home'
import { GlobalModel } from '@/stores'

const { Header } = Layout

const Home = observer(() => {
  const model = useLocalStore(() => GlobalModel)

  let location = useLocation()
  let params = useParams()

  const headerStyle = {
    background: '#fff',
    padding: 0,
    height: '60px',
    lineHeight: '60px',
  }
  return (
    <Layout className="sided-layout">
      <Header style={headerStyle}>
        <CusHeader></CusHeader>
      </Header>
      <Layout className="home-container">
        {UsersPage}
        {TestPage}
      </Layout>
    </Layout>
  )
})

export default Home
