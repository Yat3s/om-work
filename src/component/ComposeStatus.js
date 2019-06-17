import React from "react"
import { Input, Select, InputNumber } from 'antd';
import AV from 'leancloud-storage';

const InputGroup = Input.Group;
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
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    handleSubmit() {
        const { currentFeat } = this.state;
        // TODO Check input
        var inputWork = {
            status: this.state.inputStatus === 'Optional' ? '' : this.state.inputStatus,
            abstract: this.state.inputAbstract,
            workItem: this.state.inputWorkItem
        }

        var work = [...this.state.work, inputWork]
        var feat = new AV.Object('Feat');
        feat.id = currentFeat.id;
        feat.set('name', currentFeat.author);
        feat.set('team', currentFeat.team);
        feat.set('sprint', currentFeat.sprint);
        feat.addUnique('work', work);
        feat.save().then(res => {
            console.log('feat objectId is ' + res.id);
        }).catch(err => {
            console.error(err);
        });
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
                <div>Name: {this.state.currentFeat.author}</div>
                <div className="mt-1">Sprint: {this.state.currentFeat.sprint}</div>

                <div className="mt-1">Status</div>
                <Select className="mt-1" style={{ width: '40%' }} defaultValue="Optional" onChange={this.handleStatusChange.bind(this)} value={this.state.inputStatus}>
                        <Option value="Optional">Optional</Option>
                        <Option value="Fixed">Fixed</Option>
                        <Option value="Completed">Completed</Option>
                        <Option value="WIP with">WIP with</Option>
                        <Option value="Closed">Closed</Option>
                        <Option value="Investigating">Investigating</Option>
                        <Option value="Resolved">Resolved</Option>
                </Select>

                <div className="mt-1 form-group">
                    <label htmlFor="workItem">Work Item</label>
                    <div id="workItem" className="form-inline">
                        <Input type="text" className="form-control" placeholder="Optional"
                            value={this.state.inputWorkItem} onChange={this.handleWorkItemChange.bind(this)} />
                    </div>
                </div>

                <div className="mt-1 form-group">
                    <label htmlFor="abstract">Abstract</label>
                    <div id="abstract" className="form-inline">
                        <Input type="text" style={{ width: '100%' }} className="form-control" placeholder="Required"
                            value={this.state.inputAbstract} onChange={this.handAbstractChange.bind(this)} />
                    </div>
                </div>
            </form>
        )
    }
}

export default ComposeStatus