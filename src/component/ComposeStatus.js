import React from "react"
import AV from 'leancloud-storage';

class ComposeStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            team: props.team,
            work: [],

            inputStatus: 'Fixed',
            inputAbstract: 'Some thing',
            inputWorkItem: '12345',

            sprint: props.sprint,
            author: props.author
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        // TODO Check input
        var inputWork = {
            status: this.state.inputStatus,
            abstract: this.state.inputAbstract,
            workItem: this.state.workItem
        }

        var work = [...this.state.work, inputWork]
        var feat = new AV.Object('Feat');
        feat.id = this.props.id;
        feat.set('name', this.state.author);
        feat.set('team', this.state.team);
        feat.set('sprint', this.state.sprint);
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
            <form className="p-5" onSubmit={this.handleSubmit}>
                <div>Name: {this.state.author}</div>
                <div>Sprint: {this.state.sprint}</div>

                <div className="form-group margin">
                    <label htmlFor="status">Status</label>
                    <div id="status" className="form-inline">
                        <input type="text" className="form-control" placeholder="Status"
                            value={this.state.inputStatus} onChange={this.handleStatusChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="workItem">Work Item</label>
                    <div id="workItem" className="form-inline">
                        <input type="text" className="form-control" placeholder="WorkItem"
                            value={this.state.inputWorkItem} onChange={this.handleWorkItemChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="abstract">Abstract</label>
                    <div id="abstract" className="form-inline">
                        <input type="text" className="form-control" placeholder="Abstract"
                            value={this.state.inputAbstract} onChange={this.handAbstractChange.bind(this)} />
                    </div>
                </div>

                <button className="ml-2 btn btn-primary" type="submit">Submit</button>
            </form>
        )
    }
}

export default ComposeStatus