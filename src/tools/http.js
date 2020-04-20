
import axios from 'axios'
import { message } from 'antd'

const instanct = axios.create({
    baseURL: 'http://localhost:9100/',
    timeout: 10000,
    isRetryRequest: false,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer '
    }
})

instanct.interceptors.request.use((request)=>{
    request.headers.Authorization = 'Bearer '+(localStorage.admtoken || '')
    return request
})

instanct.interceptors.response.use((response)=> {
    return response.data
}, (error)=> {
    if(error.response.status===401) {
        message.error('登录已过期，请重新登录')
        localStorage.clear()
        setTimeout(()=> {
            // window.location.href = '/login'
        },1000)
    }
    return Promise.reject(error)
})

export default instanct