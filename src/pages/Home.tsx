import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react'
import { Layout } from 'antd';
import { CusHeader } from '@/components';
import { getPreurl } from '@/utils';
import {
    BatchDetailPage, UsersPage, BatchsPage, TestPage
} from '@/router/home';
import { GlobalModel, BatchsModel } from '@/models';

const { Header } = Layout;

const Home = observer(() => {

    const model = useLocalStore(() => GlobalModel);
    const bmodel = useLocalStore(() => BatchsModel);

    let location = useLocation();
    let params = useParams();

    let startTime = 0;
    let codeString = '';
    
    const getScanInput = (e: KeyboardEvent)=> {
        if(/^Digit/.test(e.code)) {
            if(codeString.length==0) {
                startTime = +new Date();
                codeString += e.code.slice(5)
                let timer = setTimeout(() => {
                    codeString = ''
                    clearTimeout(timer)
                }, 100);
            } else {
                codeString += e.code.slice(5)
            }
        }
        if(e.code=='Enter' && codeString.length>0) {
            // alert(codeString)
            if(codeString.length==20) {
                bmodel.setScanedCode(codeString)
            }
        }
        console.log(location.pathname)
    }

    useEffect(() => {
        if (!model.userInfo) {
            if (!localStorage.token) {
                window.location.href = getPreurl('login')
            }
            if (localStorage.userInfo) {
                model.setUserInfo(JSON.parse(localStorage.userInfo))
            }
        }
        window.addEventListener('keypress', (e)=> {
            getScanInput(e)
        })
    })

    const headerStyle = { background: '#fff', padding: 0, height: '60px', lineHeight: '60px' }
    return (
        <Layout className='sided-layout'>
            <Header style={headerStyle}>
                <CusHeader></CusHeader>
            </Header>
            <Layout className='home-container'>
                {BatchsPage}
                {BatchDetailPage}
                {UsersPage}
                {TestPage}
            </Layout>
        </Layout>
    )
})

export default Home;