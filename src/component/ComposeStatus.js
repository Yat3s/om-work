import React from "react"
import { Input, Select, Divider } from 'antd';
import axios from "axios";
import { config } from '../Config'
const { Option } = Select;

class ComposeStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentFeat: this.props.currentFeat,

            work: [],
            inputStatus: 'Optional',
            inputAbstract: '',
            inputWorkItem: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        axios.defaults.baseURL = config.BASE_URL_DB;
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleSubmit() {
        const { currentFeat } = this.state;
        if (!this.state.inputAbstract) {
            alert("Invalid content: the abstract is required")
            return false
        }
        // TODO Check input
        var inputWork = {
            status: this.state.inputStatus === 'Optional' ? '' : this.state.inputStatus,
            abstract: this.state.inputAbstract,
            workItem: this.state.inputWorkItem,
            id: new Date().getTime()
        }
        if (currentFeat.id) {
            var work = [...currentFeat.work, inputWork]
            axios.patch('/feats/' + currentFeat.id, {
                work: work
            }).then(res => {

            })
        } else {
            var work = [inputWork]
            axios.post('/feats', {
                author: currentFeat.author,
                team: currentFeat.team,
                sprint: currentFeat.sprint,
                authorEmail: currentFeat.authorEmail,
                work: work,
            }).then(res => {

            })
        }
        return true
    }

    handleStatusChange(status) {
        this.setState({
            inputStatus: status
        });
    }

    handleWorkItemChange(event) {
        this.setState({
            inputWorkItem: event.target.value
        });
    }

    handAbstractChange(event) {
        this.setState({
            inputAbstract: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Divider>{this.state.currentFeat.author} · Sprint {this.state.currentFeat.sprint}</Divider>

                <div className="mt-1"><b>Status (Optional)</b></div>
                <Select className="mt-1" style={{ width: '30%' }} defaultValue="Optional" onChange={this.handleStatusChange.bind(this)} value={this.state.inputStatus}>
                    <Option value="Optional">Optional</Option>
                    <Option value="Fixed">Fixed</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="WIP with">WIP with</Option>
                    <Option value="Closed">Closed</Option>
                    <Option value="Investigating">Investigating</Option>
                    <Option value="Resolved">Resolved</Option>
                </Select>

                <div className="mt-3 mb-2">
                    <b> Work Item Number (Optional)</b></div>
                <Input
                    style={{ width: '30%' }}
                    placeholder="Work item number"
                    value={this.state.inputWorkItem}
                    onChange={this.handleWorkItemChange.bind(this)}
                />

                <div className="mt-3 mb-2"><b>Abstract (Required)</b></div>
                <Input
                    placeholder="Simplify and clearly abstract is more friendly"
                    value={this.state.inputAbstract}
                    onChange={this.handAbstractChange.bind(this)}
                />
            </form>
        )
    }
}

export default ComposeStatus