import FileSaver from 'file-saver';
import JSZip from 'jszip'

class fileSave {
    /**
     * 导出Excel文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getExcel(res: any, name: string) {
        let blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        FileSaver.saveAs(blob, name + ".xlsx");
    }
 
    /**
     * 导出CSV文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getCsv(res: any, name: string) {
        let blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        FileSaver.saveAs(blob, name + ".csv");
    }
 
    /**
     * 导出图片1
     * @param {*} url 图片地址
     * @param {*} name  文件名
     */
    static getImgURLs(url: string, name: string) {
        let last = url.substring(url.lastIndexOf('.'), url.length);
        FileSaver.saveAs(url, `${name}${last}`);
    }
     /**
     * 导出图片2
     * @param {*} res 文件流
     * @param {*} name  文件名
     */
    static downLoadImg(res: any, filename: string) {
        let blob = new Blob([res], {
            type: "image/jpeg"
        });
        FileSaver.saveAs(blob, `${filename}.jpg`);
    }

    static downLoadPdf(filename: string, data: any) {
        FileSaver.saveAs(data, filename+'.pdf');
    }

    static getOneZip(filename: string, data: any) {
        var zip = new JSZip();
        zip.file(filename+'.pdf', data, { binary:true });
        zip.generateAsync({type:'blob'}).then(function(content) {
            FileSaver.saveAs(content, filename+'.zip');
        });
    }

    static getMultiZip(filename: string, lists: any[]) {
        var zip = new JSZip();
        lists.forEach(list=> {
            zip.file(list.filename+'.pdf', list.data, { binary:true });
        })
        zip.generateAsync({type:'blob'}).then(function(content) {
            FileSaver.saveAs(content, filename+'.zip');
        });
    }

}

export default fileSave;