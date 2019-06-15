import React, { Fragment } from 'react'
import AV from 'leancloud-storage'
import {Modal, Table, Divider, Tag, Button } from 'antd';
import ComposeStatus from './ComposeStatus';

class StatusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feats: [],
            composeStatusModalVisible: false,
            loading: false,
            currentEditingFeat: null
        }
        this.getStatusBySprint = this.getStatusBySprint.bind(this);
    }

    getStatusBySprint() {
        // Get feats
        this.setState({
            feats: []
        })
        const featQuery = new AV.Query("Feat");
        featQuery.equalTo("team", "Android");
        featQuery.equalTo("sprint", this.props.sprint);
        featQuery.find().then(res => {
            console.log("Feats", res);
            this.setState({
                feats: this.state.feats.concat(res)
            })
        }).catch(err => {
            console.error(err);
        });

    }

    componentDidMount() {
        this.getStatusBySprint();
    }

    showModal = (feat, e) => {
        console.log("Current editing feat", feat);
        this.setState({
            composeStatusModalVisible: true,
            currentEditingFeat: feat
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        this.child.handleSubmit();
        setTimeout(() => {
            this.getStatusBySprint();
            this.setState({ loading: false, composeStatusModalVisible: false });
        }, 1000);
    };

    handleCancel = () => {
        this.setState({ composeStatusModalVisible: false });
    };

    onRef = (ref) => {
        this.child = ref
    }

    render() {
        const { visible, loading } = this.state;
        const columns = [
            {
                title: 'Name',
                key: 'author',
                dataIndex: 'attributes.author',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Work Status',
                key: 'attributes.work',
                dataIndex: 'attributes.work',
                render: (work, record) => (
                    <div>
                        {work ? work.map(item => {
                            let color = 'geekblue';
                            return (
                                <div className='pt-1' >
                                    <Tag color={color} key={item.status}>
                                        {item.status}
                                    </Tag>
                                    {item.workItem} {item.abstract}
                                </div>
                            );
                        }) : <div>Nothing here</div>
                        }
                        <Button className='mt-1' size='small' type="dashed" onClick={this.showModal.bind(this, record)}>Add...</Button>
                    </div>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">Invite {record.attributes.author}</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">Delete</a>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.feats} />

                <Modal
                    title="Add Status"
                    visible={this.state.composeStatusModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <ComposeStatus onRef={this.onRef} author="Chris" currentFeat={this.state.currentEditingFeat} />
                </Modal>
            </div>
        )
    }
}

export default StatusList