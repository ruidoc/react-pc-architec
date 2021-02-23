import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Card, Spin, Table, Tag, Divider } from 'antd';
import BatchsModel, { BatchItem, batchType } from '@/models/batch';
import dayjs from 'dayjs'
// import { useHistory } from 'react-router-dom';

import './index.less'
import { Link } from 'react-router-dom';

const TrainPage = observer(() => {

    // let history = useHistory();

    const model = useLocalStore(() => BatchsModel);

    const downLoad = (item: BatchItem) => {

    }

    const toDeliver = (item: BatchItem) => {

    }

    const convertStatus = (status: batchType)=> {
        switch(status) {
            case 'pending':
                return {
                    color: '#f5222d',
                    label: '待处理'
                }
            case 'part':
                return {
                    color: '#fa8c16',
                    label: '部分处理'
                }
            case 'finished':
                return {
                    color: '#52c41a',
                    label: '已完成'
                }
            default: 
                return {
                    color: '#666',
                    label: '未知'
                }
        }
    }

    useEffect(() => {
        model.getBatchs()
    }, [])

    if (!model.loaded) {
        return (
            <div className='empty-box'>
                <Spin />
            </div>
        )
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id: number) => <b>{id}</b>
        },
        {
            title: '批次号',
            dataIndex: 'batch_no',
            render: (batch_no: string) => <a>{batch_no}</a>
        },
        {
            title: '进仓单号',
            dataIndex: 'number',
            render: (number: string) => <p>{number}</p>
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (status: batchType) => <Tag color={convertStatus(status).color}>{convertStatus(status).label}</Tag>
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm')
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (_: any, record: BatchItem) => <span>
                <Link to={'batchs/'+record.batch_no}>查看详细</Link>
                {/* <a onClick={() => downLoad(record)}>下载</a>
                <Divider type="vertical" />
                <a onClick={() => toDeliver(record)} style={{ color: '#52c41a' }}>确认发货</a> */}
            </span>
        },
    ];

    console.log(JSON.parse(JSON.stringify(model.batchs)))
    // debugger

    return (
        <div className='page-batchs'>
            <Card bordered={false}
                title="批次列表"
                bodyStyle={{ padding: '20px 20px 0 20px' }}
            >
                <Table
                    rowKey='id'
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={model.batchs}
                />
            </Card>
        </div>
    );
});

export default TrainPage;