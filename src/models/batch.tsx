import { observable, action, computed } from 'mobx';
import http from '@/request'

export type batchType = 'pending'|'part'|'finished'

export type filterType = 'unfinished'|'finished'

export type shippStatus = 'init'|'registering'|'wait_ship'|'shipped'|'signed'

export interface BatchItem {
    id: number,
    shippment_count: number,
    status: batchType,
    batch_no: string,
    number: string,
    created_at: string,
    shippments?: shippMents[]
}

export interface shippMents {
    status: shippStatus,
    created_at: string,
    file_url: string,
    ship_type_cn: string,
    partner_order_item: orderItem
}

export interface orderItem {
    id: number,
    code: string,
    product_color: string,
    product_cover_image: string,
    product_name: string,
    product_sku: string,
    product_brand: string,
    size_info: orderItemSize
}

export interface orderItemSize {
    category: string
    gender: string
    id: string
    matrics: string
    value: string
}

class BatchsModel {

    // 批次类型
    @observable type: filterType = 'unfinished'

    // 批次列表
    @observable batchs: BatchItem[] = []

    @observable scaned_code: string = ''

    // 批次详情
    @observable batch_detail: BatchItem | null = null

    @observable loaded: boolean = false

    @computed get batchStatus() {
        if(!this.batch_detail) {
            return '未知'
        }
        let status = this.batch_detail.status
        switch(status) {
            case 'pending': return '待处理'
            case 'part': return '部分处理'
            case 'finished': return '全部处理'
        }
    }

    @action getShippStatusLabel = (status: shippStatus)=> {
        switch(status) {
            case 'init': return '初始化中'
            case 'registering': return '注册中'
            case 'wait_ship': return '等待发货'
            case 'shipped': return '已发货'
            case 'signed': return '已签收'
        }
    }

    // 设置批次类型
    @action setType = (type: filterType) => {
        if(this.type != type) {
            this.type = type
            this.getBatchs()
        }
    }

    // 获取批次列表
    @action getBatchs = async () => {
        let status = this.type == 'finished' ? 'finished' : 'pending,part'
        this.loaded = false
        let res = await http.get('/warehouse_api/shippment_warehouses.json', {
            params: { status }
        });
        this.loaded = true
        if (res) {
            let data: any = res;
            // debugger
            this.batchs = data.shippments_warehouses
        }
    }

    // 获取批次详情
    @action getBatchDetail = async (id: string) => {
        this.batch_detail = null
        let res = await http.get(`/warehouse_api/shippment_warehouses/${id}.json`);
        if (res) {
            let data: any = res;
            // data = this.testPrintPage(data)
            this.batch_detail = data
        }
    }

    testPrintPage = (data: any) => {
        data.shippments.push(...[...data.shippments, ...data.shippments, ...data.shippments])
        return data
    }

    @action setScanedCode = (code: string) => {
        this.scaned_code = code
    }
    
    // 获取批次详情
    @action diliverProduct = async (code?: string, fn?: ()=> void) => {
        let postData: any = {
            batch_no: this.batch_detail?.batch_no,
            partner_order_item_codes: [],
        }
        if(code) {
            postData.partner_order_item_codes.push(code)
        } else {
            let codes = this.batch_detail?.shippments?.map(ship=> ship.partner_order_item.code)
            if(codes) {
                postData.partner_order_item_codes = [...codes]
            }
        }
        let res = await http.post(`/warehouse_api/shippment_warehouses/batch_ship.json`, postData);
        if (res && fn) {
            fn()
        }
    }
}

const store = new BatchsModel();

export default store;