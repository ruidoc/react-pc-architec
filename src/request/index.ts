
import axios from 'axios'
import { message } from 'antd'
import { getPreurl } from '@/utils'
import baseURL from '@/utils/initEnv'

const instanct = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// 请求拦截器
instanct.interceptors.request.use((request)=>{
    request.headers.Authorization = 'Token token=' + (localStorage.token || '')
    return request
})

// 响应拦截器，全局错误处理
instanct.interceptors.response.use((response)=> {
    return response.data
}, (error) => {
    if (error.response) {
        let response = error.response
        if(response.status==401) {
            if(response.data.error_code=='MF0001') {
                message.error('登录已过期，请重新登录')
                localStorage.removeItem('token')
                setTimeout(()=> {
                    window.location.href = getPreurl('login')
                },1000)
            } else {
                message.error(response.data.error_message)
            }
        } else {
            message.error(response.data.error_message)
        }
    } else {
        message.error(error.message)
    }
    return Promise.reject(error)
})

export default instanct