import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import StatusList from './component/StatusList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSprint: 1
    }
    this.getCurrentSprint = this.getCurrentSprint.bind(this);
  }

  getCurrentSprint() {
    var d = new Date();
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var weekOfYear = Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    this.setState({
      currentSprint: weekOfYear + 190
    })
  };

  componentWillMount() {
    this.getCurrentSprint();
  }

  render() {
    var postStyle = {
      width: '40rem',
    };

    var listStyle = {
      width: '80rem',
      align: 'center'
    };

    return (
      <div className="App p-5">
        <div align="center" className="center">
          <h1 className="center mt-5">Sprint {this.state.currentSprint}</h1>
          <StatusList className="center"  style={listStyle} sprint={this.state.currentSprint} />
        </div>
      </div>
    )
  }
}


export default App;

