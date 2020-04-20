
import React from 'react'
import { Card, Button, Input, message, Form,  Steps, Select, InputNumber } from 'antd';
import ReactQuill from 'react-quill'; 
import Upload from '@component/Public/Upload'
import Specific from '@component/Public/Specific'
import request from '@/tools/http';

import 'react-quill/dist/quill.snow.css';

const Step = Steps.Step;
const Option = Select.Option;

class Goodadd extends React.Component {
    state = {
        actn: 0,
        addInfo: {
            title: '',
            price: '',
            shopimgs: [],
            specific: [],
            describe: '',
            group: ''
        },
        groups: []
    }
    componentWillMount() {
        this.loadgroup()
        // console.log('props',this.props)
    }
    loadgroup = async ()=> {
        let data = await request.get('/goods/groups')
        this.resetState('groups',data)
        // console.log(this.state.groups)
    }
    resetState = (key,val)=> {
        this.setState({
            [key]: val
        })
    }
    upaddInfo = (data)=> {
        this.resetState('addInfo',data)
    }
    checksubmit = values => {
        let { addInfo, actn } = this.state
        console.log('Success:', values);
        if(actn===0) {
            let assy = Object.assign({},addInfo,values)
            this.upaddInfo(assy)
            this.resetState('actn',actn+1)
        } else if(actn===1) {
            if(!addInfo.specific.length || !addInfo.shopimgs.length) {
                message.error('规格和商品图不能为空！')
                return false
            }
            this.resetState('actn',actn+1)
        } else {
            if(!addInfo.describe) {
                message.error('商品描述不能为空！')
                return false
            }
            this.created()
        }
    }
    created = async ()=> {
        let resdata = await request.post('/goods',this.state.addInfo)
        if(resdata) {
            message.success('商品添加成功！')
            this.props.history.push('/goods')
        }
    }
    specificopt = (par,opt)=> {
        let data = this.state.addInfo
        let arr = data.specific
        if(opt==='del') {
            delete arr[par]
        }
        if(opt==='add') {
            arr.push({ key: '', val: [''] })
        }
        if(opt==='sbdel') {
            console.log(arr,par)
            arr[par.ind].val.splice(par.sin,1)
        }
        if(opt==='sbadd') {
            arr[par].val.push('')
        }
        data.specific = arr
        this.upaddInfo(data)
    }
    shopimgopt = shopimgs=> {
        let addInfo = this.state.addInfo
        addInfo.shopimgs = shopimgs
        this.upaddInfo(addInfo)
    }
    render = ()=> {
        const { addInfo, actn, groups } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 20 },
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 7,
                },
            },
        };
        const formtemp = (
            <Form {...formItemLayout} onFinish={this.checksubmit}>
                <div style={{display:actn===0?'block':'none'}}>
                    <Form.Item label="商品标题" name="title" rules={[
                        { required: true, message: '商品标题不能为空!'}
                    ]}>
                       <Input style={{ width: 500 }}/>
                    </Form.Item>
                    <Form.Item label="商品分组" name="group" rules={[
                        { required: true, message: '请选择商品分组!'}
                    ]}>
                        <Select style={{ width: 250 }}>
                            {groups.map(group => (
                                <Option key={group._id} value={group._id}>{group.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="商品价格" name="price" rules={[
                        { required: true, message: '请设置商品价格!'}
                    ]}>
                        <InputNumber style={{ width: 250 }} min={0.01} max={100000} step={0.01}/>
                    </Form.Item>
                    <Form.Item label="库存" name="repert" rules={[
                        { required: true, message: '请设置库存！'}
                    ]}>
                        <InputNumber style={{ width: 250 }} min={1} max={100000} step={1}/>
                    </Form.Item>
                    <Form.Item label="统一运费" name="freight" rules={[
                        { required: true, message: '请设置统一运费!'}
                    ]}>
                        <InputNumber style={{ width: 250 }} min={0} max={10000} step={0.01}/>
                    </Form.Item>
                </div>
                <div style={{display:actn===1?'block':'none'}}>
                    <Form.Item label="商品规格">
                        <Specific specific={addInfo.specific} specificopt={this.specificopt}></Specific>
                    </Form.Item>
                    <Form.Item label="商品图片">
                        <Upload shopimgs={addInfo.shopimgs} shopimgopt={this.shopimgopt}></Upload>
                    </Form.Item>
                </div>
                <div style={{display:actn===2?'block':'none',margin: '0 25px 15px 25px'}}>
                    <ReactQuill value={addInfo.describe} placeholder="在此录入商品图文详情..."
                    onChange={val=> {
                        addInfo.describe = val
                        this.upaddInfo(addInfo)
                    }} />
                </div>
                <Form.Item  {...tailFormItemLayout}>
                    {actn > 0 &&
                        <Button onClick={() => this.resetState('actn', actn - 1)}>上一步</Button>
                    } &nbsp;
                    {actn < 2 &&
                        <Button type="primary" htmlType="submit">下一步</Button>
                    }
                    {actn === 2 &&
                        <Button type="primary" htmlType="submit">完成</Button>
                    }
                </Form.Item>
            </Form>
        )
        return ( 
            <div className="page-goodadd">
                <Card bordered={false}>
                    <div className="add-step">
                    <Steps current={this.state.actn}>
                        <Step title="基本信息"/>
                        <Step title="图片规格"/>
                        <Step title="商品详情"/>
                    </Steps>
                    </div>
                    <div className="add-form">
                        {formtemp}
                    </div>
                </Card>
            </div>
        )
    }
}

export default Goodadd;