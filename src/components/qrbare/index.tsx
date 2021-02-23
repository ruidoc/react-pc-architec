import React, { Component } from 'react';
import Barcode from 'jsbarcode';

import './index.less'

/**
 * 简单生成条形码
 * {
 * width: 2,//较细处条形码的宽度
 * height: 100, //条形码的宽度，无高度直接设置项，由位数决定，可以通过CSS去调整，见下
 * quite: 10,
 * format: "CODE128",
 * displayValue: false,//是否在条形码下方显示文字
 * font:"monospace",
 * textAlign:"center",
 * fontSize: 12,
 * backgroundColor:"",
 * lineColor:"#000"//条形码颜色
 * }
 */

interface Props {
    label: string, 
    width?: number,
    height?: number,
    fontSize?: number
}

class SimpleBarcode extends Component {

    constructor(props: Props) {
        super(props)
        this.props = props
    }

    _barcode: SVGSVGElement | null = null

    props: Props

    componentDidMount() {
        this.createBarcode();
    }

    componentDidUpdate() {
        // if (this.props !== nextProps) {
        this.createBarcode();
        // }
    }

    createBarcode = () => {
        if (!this._barcode) return;
        let { label, width, height, fontSize } = this.props
        if (!label) {
            return;
        }
        width = width ? width : 1
        height = height ? height : 40
        fontSize = fontSize ? fontSize : 13
        Barcode(this._barcode, label, {
            // displayValue: false,  //  不显示原始值
            background: 'transparent',  //  背景色
            // lineColor: 'rgba(255,255,255,0.5)', // 线条颜色
            width,  // 线条宽度
            height,
            fontSize,
        });
    };

    render() {
        // const { label } = this.props;
        return (
            <div className='qrbare-wrap'>
                <svg
                    ref={(ref) => {
                        this._barcode = ref;
                    }}
                />
                {/* <p className='qrbare-label'>{label}</p> */}
            </div>
        );
    }
}

export default SimpleBarcode;
