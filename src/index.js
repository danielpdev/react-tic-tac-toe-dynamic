import React, { Component } from "react";
import { render } from "react-dom";
import Square from "./square/Square";
import Board from "./board/Board";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null
    };
    this.changeSize = this.changeSize.bind(this);
  }

  changeSize(event) {
    this.setState({
      size: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="square-size">Square size</label>
          <input type="text" name="suqre-size" onChange={this.changeSize} />
        </div>
        <div className="game">
          <div className="game-board">
            <Board size={this.state.size} />
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
