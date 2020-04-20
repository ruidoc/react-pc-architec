import React from 'react'
import { Card, Button, Divider, Input, Modal, message, Table } from 'antd';
import request from '@/tools/http';

// const { Search } = Input;
// const RadioGroup = Radio.Group;

// import { connect } from 'react-redux'

class Goods extends React.Component {
    state = {
        visible: false,
        actdata: null,
        list: [],
        title: ''
    }
    load = async ()=> {
        let data = await request.get('/goods/groups')
        this.setState({
            list: data
        })
    }
    create = async ()=> {
        let title = this.state.title
        let resutl = await request.post('/goods/groups',{title})
        if(resutl) {
            message.success('分组添加成功！')
            this.load()
            this.resetState('visible',false)
        }
    }
    update = async ()=> {
        let { title, actdata } = this.state
        let resutl = await request.put('/goods/groups/'+actdata._id, { title })
        if(resutl) {
            message.success('分组修改成功！')
            this.load()
            this.resetState('visible',false)
        }
    }
    beforeDelete(item) {
        let self = this
        Modal.confirm({
            title: '操作提醒',
            content: '确认删除数据？',
            onOk() {
                self.delete(item)
            }
        })
    }
    delete = async item=> {
        let resdata = await request.delete('/goods/groups/'+item._id)
        if(resdata) {
            message.success('删除成功！')
        }
        this.setState({visible:false})
        this.load()
    }
    option = ()=> {
        if(this.state.actdata) {
            this.update()
        } else {
            this.create()
        }
    }
    componentWillMount() {
        this.load()
    }
    resetState(key,val) {
        this.setState({
            [key]: val
        })
    }
    time = (time = +new Date())=> {
        let data = time.substr(0, 19).replace('T', ' ').replace(/-/g, '.')
        let tm2 = Number(data.substr(11,2))+8
        return data.substr(0,11)+tm2+data.substr(13)
    }
    render() {
        const { visible, list, title } = this.state
        // const { history } = this.props
        const columns = [
            {
                title: '分组名称',
                dataIndex: 'title'
            },
            {
                title: '操作',
                render: col => <span>
                    <a href onClick={()=> this.setState({
                        visible: true,
                        actdata: col, title: col.title
                    })
                    }>修改</a>
                    <Divider type="vertical" />
                    <a href onClick={()=> this.beforeDelete(col)} style={{color:'red'}}>删除</a>
                </span>
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
        };
        const optModel = (
            <Modal title="分组" width={550}
            destroyOnClose visible={visible} onOk={this.option} onCancel={()=> this.resetState('visible',false)}>
                <Input size="large" value={title} onChange={e=> {
                    this.resetState('title',e.target.value)
                }} placeholder="分组名称"/> 
            </Modal>
        )
        return (
        <div className="page-goods">
            <Card bordered={false}>
                <div className="handel">
                    <Button icon="plus" type="primary" onClick={() => {
                        this.setState({
                            visible: true,
                            actdata: null
                        })
                    }}>新建</Button>
                </div>
                <Table
                    rowKey="_id" 
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={list}
                />
            </Card>
            {optModel}
        </div>)
    }
}

export default Goods;