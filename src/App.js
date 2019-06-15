import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import ComposeStatus from './component/ComposeStatus';
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
      currentSprint: weekOfYear + 191
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
    };

    return (
      <div className="App">
        <div style={listStyle}>
          <h1 className="center">Sprint {this.state.currentSprint}</h1>
          <StatusList sprint={this.state.currentSprint} />
        </div>
      </div>
    )
  }
}


export default App;

