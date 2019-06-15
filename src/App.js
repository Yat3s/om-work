import React from 'react';
import './App.css';
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

        <div className="card p-5 shadow-sm mx-auto mt-5 mb-5" style={listStyle}>
          <h1 className="center">Sprint {this.state.currentSprint}</h1>
          <StatusList sprint={this.state.currentSprint} />
        </div>

        <div className="card shadow mx-auto mt-5 mb-5" style={postStyle}>
          <ComposeStatus author="Chris" id='5d04c1b587ab4e000b84f607' team="Android" sprint={this.state.currentSprint} />
        </div>
      </div>
    )
  }
}


export default App;

