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
            inputStatus: 'Fixed',
            inputAbstract: 'Some thing',
            inputWorkItem: '12345',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        const { currentFeat } = this.state;
        // TODO Check input
        var inputWork = {
            status: this.state.inputStatus,
            abstract: this.state.inputAbstract,
            workItem: this.state.inputWorkItem
        }

        var work = [...this.state.work, inputWork]
        var feat = new AV.Object('Feat');
        feat.id = currentFeat.id;
        feat.set('name', currentFeat.attributes.author);
        feat.set('team', currentFeat.attributes.team);
        feat.set('sprint', currentFeat.attributes.sprint);
        feat.addUnique('work', work);
        feat.save().then(res => {
            console.log('feat objectId is ' + res.id);
        }).catch(err => {
            console.error(err);
        });
        event.preventDefault();
    }

    handleStatusChange(event) {
        this.setState({
            inputStatus: event.target.value
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
                <div>Name: {this.state.currentFeat.attributes.author}</div>
                <div>Sprint: {this.state.currentFeat.attributes.sprint}</div>

                <InputGroup compact>
                    <Select defaultValue="Option1">
                        <Option value="Option1">Option1</Option>
                        <Option value="Option2">Option2</Option>
                    </Select>

                    <Input style={{ width: '20%' }} defaultValue="input content" />
                    <Input style={{ width: '50%' }} defaultValue="input content" />
                </InputGroup>

                <div className="form-group margin">
                    <label htmlFor="status">Status</label>
                    <div id="status" className="form-inline">
                        <Input type="text" className="form-control" placeholder="Status"
                            value={this.state.inputStatus} onChange={this.handleStatusChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="workItem">Work Item</label>
                    <div id="workItem" className="form-inline">
                        <Input type="text" className="form-control" placeholder="WorkItem"
                            value={this.state.inputWorkItem} onChange={this.handleWorkItemChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="abstract">Abstract</label>
                    <div id="abstract" className="form-inline">
                        <Input type="text" className="form-control" placeholder="Abstract"
                            value={this.state.inputAbstract} onChange={this.handAbstractChange.bind(this)} />
                    </div>
                </div>

                <button className="ml-2 btn btn-primary" type="submit">Submit</button>
            </form>
        )
    }
}

export default ComposeStatus