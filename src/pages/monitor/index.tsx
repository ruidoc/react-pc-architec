import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Spin } from 'antd';
// import { useHistory } from 'react-router-dom';
import { CusBarcode } from '@/components';
import { MonitorModel } from '@/models';

import './index.less'

const TrainPage = observer(() => {

    // let history = useHistory();

    const model = useLocalStore(() => MonitorModel);

    useEffect(() => {
        model.getStatistics()
    }, [])

    if (!model.loaded) {
        return (
            <div className='empty-box'>
                <Spin />
            </div>
        )
    }

    return (
        <div className='page-tasks'>
            <table cellSpacing="0" cellPadding="0">
                <tr>
                    <td align="center" className="biaoti" height="60">受理员业务统计表</td>
                </tr>
                <tr>
                    <td align="right" height="25">2017-01-02---2017-05-02</td>
                </tr>
            </table>
            <table cellSpacing="1" cellPadding="4" className="tabtop13">
                <tr>
                    <td colSpan={2} className="btbg font-center titfont" rowSpan={2}>受理员</td>
                    <td width="10%" className="btbg font-center titfont" rowSpan={2}>受理数</td>
                    <td width="10%" className="btbg font-center titfont" rowSpan={2}>自办数</td>
                    <td width="10%" className="btbg font-center titfont" rowSpan={2}>直接解答</td>
                    <td colSpan={2} className="btbg font-center titfont">拟办意见</td>
                    <td colSpan={2} className="btbg font-center titfont">返回修改</td>
                    <td colSpan={3} className="btbg font-center titfont">工单类型</td>
                </tr>
                <tr>
                    <td width="8%" className="btbg font-center">同意</td>
                    <td width="8%" className="btbg font-center">比例</td>
                    <td width="8%" className="btbg font-center">数量</td>
                    <td width="8%" className="btbg font-center">比例</td>
                    <td width="8%" className="btbg font-center">建议件</td>
                    <td width="8%" className="btbg font-center">诉求件</td>
                    <td width="8%" className="btbg font-center">咨询件</td>
                </tr>
                <tr>
                    <td width="7%" rowSpan={8} className="btbg1 font-center">受理处</td>
                    <td width="7%" className="btbg2">王艳</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2 font-center">总计</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                </tr>
                <tr>
                    <td width="7%" rowSpan={8} className="btbg1 font-center">话务组</td>
                    <td width="7%" className="btbg2">王艳</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">王艳</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">王艳</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">王艳</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="btbg2 font-center">总计</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                    <td className="btbg2 font-center">20</td>
                </tr>
            </table>
            {/* <CusBarcode label='65372364564350456'></CusBarcode> */}
        </div>
    );
});

export default TrainPage;