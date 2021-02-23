
import React from 'react'
import { Upload, message } from 'antd';
import baseURL from '@/utils/initEnv'

interface Props {
    name: string,
    children: React.ReactNode,
    onSuccess: ()=> void
}

const PubUpload = (props: Props) => {

    const handleChange = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功！`);
            props.onSuccess()
        } else if (info.file.status === 'error') {
            // console.log(info)
            message.error(`${info.file.response?.msg}`);
        }
    }

    return (
        <div className="clearfix">
            <Upload
                name={props.name}
                showUploadList={false} 
                action={baseURL + 'images/upload'}
                onChange={handleChange}>
                {props.children}
            </Upload>
        </div>
    );
}

export default PubUpload;