import React, { useEffect, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Divider, Button, Spin, Space, Modal } from 'antd';
import BatchsModel, { shippMents } from '@/models/batchs/index';
import { useParams } from 'react-router-dom';
import { CusBarcode } from '@/components';
import fileSave from '@/utils/expofile';
import dayjs from 'dayjs'
import './index.less'

const TrainPage = observer(() => {

    let { code } = useParams<{code: string}>();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [curProduct, setCurProduct] = useState<shippMents>();
    const model = useLocalStore(() => BatchsModel);
 
    const allTopdf = ()=> {
        let detail = model.batch_detail
        if(detail && detail.shippments) {
            let batch_name = 'BATCH-'+detail.batch_no;
            let item_names =  detail.shippments.map(ship=> ship.partner_order_item.code)
            Promise.all(
                detail.shippments.map(list=> getPdfBlob(list.file_url))
            ).then(res=> {
                res = res.map((item, ind)=> ({  filename: item_names[ind], data: item }))
                // debugger
                fileSave.getMultiZip(batch_name, res);
            }).catch(err=> {
                console.log(err)
            })
        }
    }

    const toDownloadWaybill = (url: string, code: string)=> {
        getPdfBlob(url).then((blob)=> {
            fileSave.downLoadPdf('ITEMCODE-'+code, blob);
        })
    }

    const getPdfBlob = (url: string) => {
        return new Promise((resolve, reject)=> {
            let xhr = new XMLHttpRequest()
            xhr.open('get', url+'?t='+Math.random(), true);
            xhr.setRequestHeader('Content-Type', `application/pdf`);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                if (this.status == 200) {
                    //接受二进制文件流
                    var blob = this.response;
                    resolve(blob);
                }
            }
            xhr.send();
        })
    }

    const diliverGoods = (bool = false) => {
        let prodId;
        if(bool==false) {
            prodId = curProduct?.partner_order_item.code
        }
        model.diliverProduct(prodId, ()=> {
            setVisible(false);
            model.getBatchDetail(code);
        })
    }

    const toSetCurProduct = (good: shippMents) => {
        setCurProduct(good);
        setVisible(true)
    }

    useEffect(() => {
        model.getBatchDetail(code)
    }, [])

    if (!model.batch_detail) {
        return (
            <div className='empty-box'>
                <Spin />
            </div>
        )
    }

    const detail = model.batch_detail

    const getCompany = ()=> {
        if(detail.shippments) {
            return detail.shippments[0].ship_type_cn
        } else {
            return ''
        }
    }
    // debugger

    return (
        <div className='page-batch-detail'>
            <div className="handle-box">
                <h3>货品明细单</h3>
                <div>
                    <Space>
                    <Button onClick={()=> window.print()}>打印</Button>
                    <Button onClick={()=> allTopdf()}>下载全部运单</Button>
                    <Button type='primary'>确认发货</Button>
                    </Space>
                </div>
            </div>
            <section className='table-moni'>
                <div className='thead'>
                    <div className='th-row title'>货品明细单</div>
                    <div className='th-row'>
                        <div className='throw-ti'>批次号</div>
                        <div className='throw-va flex-between'>
                            <span>{detail.batch_no}</span>
                            <CusBarcode label={detail.batch_no}></CusBarcode>
                        </div>
                    </div>
                    <div className='th-row-wrap'>
                        <div className='th-row mr'>
                            <div className='throw-ti'>物流公司</div>
                            <div className='throw-va'>{getCompany()}</div>
                        </div>
                        <div className='th-row'>
                            <div className='throw-ti'>商品数量</div>
                            <div className='throw-va'>{detail.shippment_count}</div>
                        </div>
                    </div>
                    <div className='th-row-wrap'>
                        <div className='th-row mr'>
                            <div className='throw-ti'>运单号</div>
                            <div className='throw-va'>{detail.number}</div>
                        </div>
                        <div className='th-row'>
                            <div className='throw-ti'>创建时间</div>
                            <div className='throw-va'>{dayjs(detail.created_at).format('YYYY-MM-DD HH:mm')}</div>
                        </div>
                    </div>
                </div>
                <div className='tbody'>
                    <div className='good-row tl'>
                        <div className='ima-wrap'>商品图片</div>
                        <div className='ptit'>标题</div>
                        <div className='pcor'>颜色</div>
                        <div className='pcor'>尺码</div>
                        <div className='itemrow'>ITEM CODE</div>
                    </div>
                    {detail.shippments && detail.shippments.map((good, ind) =>
                        <div className='good-row' key={good.id}>
                            <div className='ima-wrap'>
                                <img src={good.partner_order_item.product_cover_image} width='80' />
                            </div>
                            <div className='ptit'>
                                <p>{good.partner_order_item.product_brand}</p>
                                <p>{good.partner_order_item.product_name}</p>
                            </div>
                            <div className='pcor'>{good.partner_order_item.product_color}</div>
                            <div className='pcor'>{good.partner_order_item.size_info.value}</div>
                            <div className='barcode'>
                                <CusBarcode height={28} width={0.9} fontSize={12} label={good.partner_order_item.code}></CusBarcode>
                            </div>
                            <div className='handel-td'>
                                {good.status == 'wait_ship' && <a onClick={()=> toSetCurProduct(good)}>确认发货</a>}
                                {good.status == 'wait_ship' && <p onClick={()=> toDownloadWaybill(good.file_url, good.partner_order_item.code)}>下载运单</p>}
                                {good.status != 'wait_ship' && <span>{model.getShippStatusLabel(good.status)}</span>}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {/* <CusBarcode label='65372364564350456'></CusBarcode> */}
            <Modal
                title='操作提醒'
                visible={visible}
                onOk={()=> diliverGoods(false)}
                confirmLoading={confirmLoading}
                onCancel={()=> setVisible(false)}
                // cancelText='下载运单'
            >
                <p>是否确认商品发货？</p>
            </Modal>
        </div>
    );
});

export default TrainPage;