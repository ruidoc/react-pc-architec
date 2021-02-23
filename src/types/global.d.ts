
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

declare var Ruims: (selector: string) => any;