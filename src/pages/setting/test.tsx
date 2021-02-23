import React from 'react'

const TestPage = () => {
    const testFun = ()=> {
        console.log('函数执行')
    }
    const getName = ()=> {
        console.log('div')
        return '我是一个div'
    }
    return (
        <div onClick={testFun}>{getName()}</div>
    )
}

export default TestPage;