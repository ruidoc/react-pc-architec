
import React from 'react'
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

class Specific extends React.Component {
    render = ()=> {
        const { specific, specificopt } = this.props
        const specidom = (
            <div className="specific-item-wrap">
                {specific.map((item,ind)=> 
                    <div className="specific-item" key={ind}>
                        <div className="item-k">
                            <span>规格名：<Input style={{width:'100px'}} onChange={e=>item.key=e.target.value}/></span>
                            <a href className="close" onClick={()=>specificopt(ind,'del')}><CloseOutlined /></a>
                        </div>
                        <div className="item-v">
                            <span>规格值：</span>
                            <div className="item-vr">
                            {item.val.map((subit,sin)=> 
                                <span className="lib-v" style={{marginRight:'10px'}} key={sin}>
                                    <Input style={{width:'120px'}} onChange={e=> item.val[sin] = e.target.value}/>
                                    <a href className="close"><CloseOutlined  size="12" onClick={()=> specificopt({ind,sin},'sbdel')}/></a>
                                </span>
                            )}
                            <a href onClick={()=> specificopt(ind,'sbadd')}>添加规格值</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
        return (
            <div className="specific">
                {specidom}
                <div className="item-k" style={{
                    padding: '10px 12px'
                }}><Button onClick={()=> specificopt(null,'add')
                }>添加规格</Button>
                </div>
            </div>
        )
    }
}

export default Specific;