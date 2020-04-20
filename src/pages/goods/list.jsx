import React from 'react'
import { Card, Button, Divider, Modal, message, Dropdown, Menu, Table, Tag } from 'antd';
import request from '@/tools/http';
import { DownOutlined } from '@ant-design/icons';

// const { Search } = Input;
// const RadioGroup = Radio.Group;

// import { connect } from 'react-redux'

class Goods extends React.Component {
    state = {
        visible: false,
        loading: false,
        pageopt: {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        },
        list: []
    }
    load = async ()=> {
        let { data, page } = await request.get('/goods')
        let pageopt = this.state.pageopt
        pageopt.pageSize = page.limit
        pageopt.total = page.total
        this.setState({
            list: data, pageopt
        })
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
        let resdata = await request.delete('/goods/'+item._id)
        if(resdata) {
            message.success('删除成功！')
        }
        this.setState({visible:false})
        this.load()
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
        const { list } = this.state
        const { history } = this.props
        // const extraContent = (
        //     <div className="extra-content">
        //         <Button type="primary" onClick={()=> this.resetState('visible',true)}>添加</Button> &nbsp;&nbsp;
        //         <Search style={{
        //             width:'260px', marginLeft: '18px'
        //         }} placeholder="请输入" onSearch={() => ({})} />
        //     </div>
        // );
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'title',
                render: title=> <a href>{title}</a>
            },
            {
                title: '商品图片',
                dataIndex: 'shopimgs',
                render: imgs=> imgs.map((img,i)=> (
                    <img key={i} alt="" width="40" style={{marginRight:'7px'}} src={img}/>
                ))
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: pr=> <Tag color="green">{pr}</Tag>
            },
            {
                title: '规格',
                dataIndex: 'specific',
                render: spes=> spes.map((spe,i)=> 
                    <Tag key={i} color="geekblue">{spe.key}</Tag>
                )
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: col => <span>
                    <a href>查看</a>
                    <Divider type="vertical" />
                    <a href>修改</a>
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
        return (
        <div className="page-goods">
            <Card bordered={false}>
                <div className="handel">
                    <Button icon="plus" type="primary" onClick={() => history.push('/goodadd')}>新建</Button>
                    { this.state.list.length > 0 && (
                    <span>
                        <Button>批量操作</Button>
                        <Dropdown overlay={
                            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                                <Menu.Item key="remove">删除</Menu.Item>
                                <Menu.Item key="approval">批量审批</Menu.Item>
                            </Menu>
                        }>
                            <Button>更多操作 <DownOutlined /></Button>
                        </Dropdown>
                    </span> )}
                </div>
                <Table
                    rowKey="_id" 
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={list}
                />
            </Card>
        </div>)
    }
}

export default Goods;