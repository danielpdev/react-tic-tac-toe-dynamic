import _ from "lodash";

function generateMatrix(size, formatter) {
  let tempMatrix = [];
  for (let row = 0; row < Math.pow(size, 2); row += size) {
    let line = [];
    for (let col = row; col < row + size; col++) {
      line.push(col);
    }
    tempMatrix.push(line);
  }
  if (formatter) {
    const matrix = formatter.reduce((initialMatrix, cur) => {
      const formattedValues = cur(initialMatrix, size);

      if (formattedValues.length > 1)
        formattedValues.forEach(el => {
          initialMatrix.push(el);
        });
      else initialMatrix.push(formattedValues[0]);
      return initialMatrix;
    }, tempMatrix);
  }
  return tempMatrix;
}

function formatColumn(matrix, size) {
  let tempMatrix = [];
  for (let row = 0; row < matrix.length; row++) {
    let line = [];
    for (let col = 0; col < size; col++) {
      line.push(matrix[col][row]);
    }
    tempMatrix.push(line);
  }

  return tempMatrix;
}

function formatFirstDiagonal(matrix, size) {
  let tempMatrix = [];
  let line = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < size; col++) {
      if (col === row) line.push(matrix[row][col]);
    }
  }
  tempMatrix.push(line);

  return tempMatrix;
}

function formatSecondDiagonal(matrix, size) {
  let tempMatrix = [];
  let line = [];

  for (let row = size - 1; row > -1; row--) {
    for (let col = size - 1; col > -1; col--) {
      if (col === row) line.push(matrix[row][col]);
    }
  }
  tempMatrix.push(line);

  return tempMatrix;
}

export default function calculateWinner(squares, size) {
  let matrix = generateMatrix(size, [
    formatColumn,
    formatFirstDiagonal,
    formatSecondDiagonal
  ]);
  let foundWinner = false;

  for (let i = 0; matrix[i] && i < matrix.length; i++) {
    const line = (() => {
      const line = [];
      for (let j = 0; j < size; j++) {
        line.push(matrix[i][j]);
      }
      return line;
    })();

    if (!squares[line[0]]) return false;

    foundWinner = line.reduce((arr, cur, prev) => {
      arr.push(squares[line[0]] === squares[cur]);
      return arr;
    }, []);

    if (foundWinner.indexOf(false) === -1) {
      return squares[line[0]];
    }
  }

  return null;
}
