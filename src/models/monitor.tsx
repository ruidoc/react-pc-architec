import { observable, action } from 'mobx';
import http from '@/request'

export interface Crawler {
    pid: string,
    crawl_count: number,
    crawler_type: 1 | 2,
    has_direction: boolean,
    data_source: string,
    log: string,
    health: 'running' | 'died',
    direction: string,
}

export interface Statistic {
    date: string,
    count: string,
    vendor_source: string,
}

class MonitorModel {

    // 爬虫列表
    @observable crawlers: Crawler[] = []

    // 统计列表
    @observable statistics: Statistic[] = []

    @observable loaded: boolean = false

    @observable logstr: string = ''

    // 获取日志
    @action getCrawlog = async (source: string, fn: () => void) => {
        let res = await http.get(`/crawler/${source}/log`);
        let data: any = res;
        this.logstr = data
        fn()
    }

    // 获取统计
    @action getHistory = async (source: string, fn: () => void) => {
        let res = await http.get(`/crawler/get_daily_statistics?vendor_source=${source}`);
        if (res) {
            let data: any = res;
            this.statistics = data.result
            console.log(data)
            fn()
        }
    }

    // 获取任务列表
    @action getStatistics = async () => {
        this.loaded = false
        let res = await http.get('/warehouse_api/shippment_warehouses.json');
        this.loaded = true
        if (res) {
            let data: any = res;
            this.crawlers = data
        }
    }

    // 重启
    @action reboot = async (data: Crawler, fn: () => void) => {
        let res = await http.post('/crawler/restart_crawler', {
            vendor_source: data.data_source,
            direction: data.direction,
        });
        if (res) {
            let data: any = res;
            fn()
        }
    }

}

const store = new MonitorModel();

export default store;