import React from 'react'
import { Modal, Table, Tag, Button, Icon } from 'antd';
import ComposeStatus from './ComposeStatus';
import axios from "axios";
import { config } from '../Config'
import logo from '../assets/hey.jpeg'; 
class StatusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprint: props.sprint,
            feats: [],
            composeStatusModalVisible: false,
            loading: false,
            currentEditingFeat: null,
            tableMarkdownPlainText: ''
        }
        this.getCurrentSprintStatus = this.getCurrentSprintStatus.bind(this);
        this.removeWork = this.removeWork.bind(this);
        axios.defaults.baseURL = config.BASE_URL_DB;
    }

    getMembers() {
        // Clear data before load
        this.setState({
            feats: []
        })
        axios.get('/members')
            .then(res => {
                console.log("Members", res);
                const members = res.data;
                var i;
                var feats = []
                for (i in members) {
                    var feat = {
                        authorEmail: members[i].email,
                        sprint: this.state.sprint,
                        author: members[i].name,
                        team: members[i].team
                    }
                    feats = feats.concat(feat);
                }
                // Add placeholder for showing all members
                this.setState({
                    feats
                })
                console.log('Resolve feats', feats);

                this.getCurrentSprintStatus();
            })
            .catch(error => {
                console.error(error);
            })
    }

    getCurrentSprintStatus() {
        const { feats } = this.state;

        axios.get('/feats?sprint=' + this.state.sprint)
            .then(res => {
                const featsData = res.data;
                console.log("Feats", featsData);
                var idxPlaceholder;
                for (idxPlaceholder in feats) {
                    var idxActualFeats;
                    for (idxActualFeats in featsData) {
                        if (feats[idxPlaceholder].author === featsData[idxActualFeats].author) {
                            // Replace with actual feat result.
                            feats[idxPlaceholder] = featsData[idxActualFeats];
                        }
                    }
                }
                this.setState({
                    feats
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getMembers();
    }

    showModal = (feat, e) => {
        console.log("Current editing feat", feat);
        this.setState({
            currentEditingFeat: feat,
            composeStatusModalVisible: true,
        });
    };

    handleOk = () => {
        if (this.child.handleSubmit()) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.getCurrentSprintStatus();
                this.setState({ loading: false, composeStatusModalVisible: false });
            }, 1000);
        }
    };

    handleCancel = () => {
        this.setState({ composeStatusModalVisible: false });
    };

    onRef = (ref) => {
        this.child = ref
    }

    generateMarkdownPlaintext() {
        const { feats } = this.state;
        var text = '## Sprint ' + this.props.sprint;
        text = text.concat('\n').concat('Name | Work').concat('\n-- | --');
        var idxFeats;
        for (idxFeats in feats) {
            text = text.concat('\n').concat(feats[idxFeats].author).concat(' | ');
            var idxWork;
            var work = feats[idxFeats].work;

            for (idxWork in work) {
                const status = work[idxWork].status;
                const workItem = work[idxWork].workItem;
                const abstract = work[idxWork].abstract;
                var workItemLink = workItem ? ('[' + workItem + '](https://office.visualstudio.com/Outlook%20Mobile/_workitems/edit/' + workItem + ")") : ''
                text = text.concat('<li>')
                    .concat(status ? status + ' ' : '')
                    .concat(workItemLink + ' ')
                    .concat(abstract ? abstract : '').concat('<br>');
            }
        }

        this.setState({
            tableMarkdownPlainText: text
        })

        // Copy content to clipboard
        var copyText = document.getElementById("tablePlainText");
        setTimeout(() => {
            copyText.select();
            document.execCommand("copy");
            alert("The Markdown table plaintext has copied to your clipboard");
        }, 300);
        console.log(text);
    }

    removeWork(workItem, feat) {
        // Remove work
        console.log("removeWork", workItem)
        console.log("removeWorkFeat", feat)
        const { feats } = this.state;
        var workIndex;
        for (workIndex in feat.work) {
            if (feat.work[workIndex].id === workItem.id) {
                feat.work.splice(workIndex, 1);
                break;
            }
        }

        // Local lie: Replace with processed result 
        var featIndex;
        for (featIndex in feats) {
            if (feats[featIndex].id === feat.id) {
                feats[featIndex] = feat;
                break
            }
        }

        this.setState({
            feats
        })

        axios.patch('/feats/' + feat.id, {
            work: feat.work
        })
            .then(res => {

            })
    }

    render() {
        const { loading } = this.state;
        const columns = [
            {
                title: 'Name',
                key: 'author',
                dataIndex: 'author',
                render: text => <b>{text}</b>,
            },
            {
                title: 'Work Status',
                key: 'work',
                dataIndex: 'work',
                render: (work, record) => (
                    <div>
                        {work && work.length > 0 ? work.map(item => {
                            let color = 'geekblue';
                            let workItemUrl = "https://office.visualstudio.com/Outlook%20Mobile/_workitems/edit/" + item.workItem;
                            return (
                                <div className="pt-1 d-flex align-items-center" key={item.id}>
                                    {
                                        item.status &&
                                        <Tag color={color} key={item.status}>
                                            {item.status}
                                        </Tag>
                                    }
                                    {
                                        item.workItem && <a className="mr-1" href={workItemUrl} target="_blank">{item.workItem}</a>
                                    }
                                    
                                    <b>{item.abstract}</b>
                                    {/* <ReactMardown align="center" source={item.abstract}/> */}

                                    <Icon className="ml-1" type="close-circle" theme="filled" onClick={this.removeWork.bind(this, item, record)} />
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
                render: (text, record) => {
                    const teamsChatLink = "https://teams.microsoft.com/l/chat/0/0?users="
                        + record.authorEmail + "&message=Hey, " + record.author + ", Please remember to sync your status(Sprint " + this.state.sprint + ") on the " + config.BASE_URL
                    return (
                        <span>
                            <a href={teamsChatLink} target="_blank">Remind  {record.author}</a>
                        </span>
                    )
                }
            },
        ];
        return (
            <div>
                <img alt="example" width="300" height="200" src={logo} />
                <div className='m-5 shadow p-5' align="end">
                    <Button type="primary" onClick={this.generateMarkdownPlaintext.bind(this)}>Generate Markdown Plaintext</Button>
                    <Table className='mt-3' columns={columns} dataSource={this.state.feats} />
                </div>

                <div className='mt-5'>
                    <textarea
                        id="tablePlainText"
                        hidden={this.state.tableMarkdownPlainText.length == 0}
                        value={this.state.tableMarkdownPlainText}
                        style={{ width: 1000 }} className='shadow-sm p-3 mb-5 bg-white' />
                </div>
                {
                    this.state.composeStatusModalVisible &&
                    <Modal
                        title="Add Status"
                        visible={true}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>Submit</Button>,
                        ]}
                    >
                        <ComposeStatus onRef={this.onRef} author="Chris" currentFeat={this.state.currentEditingFeat} />
                    </Modal>
                }
            </div>
        )
    }
}

export default StatusList