
import React from 'react'
import { Upload, Modal } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

class PubUpload extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };
    handleCancel = () => {
        this.setState({previewVisible: false})
    }
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };
    handleChange = ({fileList}) => {
        const { shopimgopt } = this.props
        this.setState({fileList})
        if(fileList[fileList.length-1].response) {
            shopimgopt(fileList.map(file=>file.response.url))
        }
    }
    componentWillMount() {
        const { shopimgs } = this.props
        let fileList = shopimgs.map(url=> ({
            uid: '-1', name: '', status: 'done', url
        }))
        this.setState({fileList})
    }
    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <CloudUploadOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="http://localhost:9100/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {fileList.length >= 6 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" style={{
                        width: '100%'
                    }} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default PubUpload;