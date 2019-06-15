import React from 'react'
import AV from 'leancloud-storage'

class StatusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feats: [],
        }
        this.getStatusBySprint = this.getStatusBySprint.bind(this);
    }

    getStatusBySprint(sprint) {
        // Get feats
        const featQuery = new AV.Query("Feat");
        featQuery.equalTo("team", "Android");
        featQuery.equalTo("sprint", sprint);
        featQuery.addAscending('name');
        featQuery.find().then(res => {
            console.log(res);
            this.setState({
                feats: this.state.feats.concat(res)
            })
            console.log("Feats", this.state.feats[1]);
        }).catch(err => {
            console.error(err);
        });

    }

    componentDidMount() {
        this.getStatusBySprint(this.props.sprint);
    }

    render() {
        const { feats } = this.state;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr className="row mx-1">
                        <th className="col-2">Name</th>
                        <th className="col-10">Work Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        feats.map((feat, index) =>
                            <tr className="row mx-1">
                                <th className="col-2">{feat.attributes.name}</th>
                                <td className="col-10"> 
                                {
                                    feat.attributes.work.map((workItem, workIndex) => 
                                        <li>hey{workItem.abstract}</li>
                                    )
                                }

                                <button>Add</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
}

export default StatusList