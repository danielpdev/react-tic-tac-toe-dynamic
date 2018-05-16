import React, { Component } from "react";
import Square from "./../square/Square";
import calculateWinner from "./../utils/calculateWinner";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: null,
      size: null,
      isXNext: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedSquare) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares, this.state.size) || squares[clickedSquare]) {
      return;
    }
    squares[clickedSquare] = this.state.isXNext ? "X" : "O";
    this.setState({ squares: squares, isXNext: !this.state.isXNext });
  }

  componentWillReceiveProps(nextProps) {
    const size = parseInt(nextProps.size);
    if (!size) return;
    this.setState({
      squares: Array(Math.pow(size, 2)).fill(null),
      size: parseInt(size)
    });
  }
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner =
      this.state.size > -1
        ? calculateWinner(this.state.squares, this.state.size)
        : false;
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.isXNext ? "X" : "O");
    }
    const rows = [];
    const size = this.state.size;

    for (
      let columnIndex = 0;
      columnIndex < Math.pow(size, 2);
      columnIndex += size
    ) {
      const squares = [];
      for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        squares.push(this.renderSquare(columnIndex + rowIndex));
      }
      rows.push(
        <div key={columnIndex} className="board-row">
          {squares}
        </div>
      );
    }

    return (
      <div>
        <div className="status">{status}</div>
        {rows}
      </div>
    );
  }
}
