function Board({x, y}) {
  let board = Array(x).fill(null).map(() => Array(y).fill(""));
  let mineCount = Math.max(x, y);

  while (mineCount > 0) {
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        let val = Math.floor(Math.random() * ((x*y) * (x*y) * 10));
        if (val === 42 && board[i][j] !== "M") {
          board[i][j] = "M";
          mineCount--;
        }
        if (mineCount === 0) break;
      }
      if (mineCount === 0) break;
    }
  }

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (board[i][j] !== "M") {
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (i + dx >= 0 && i + dx < x && j + dy >= 0 && j + dy < y && board[i + dx][j + dy] === "M") {
              count++;
            }
          }
        }
        if (count != 0) {
          board[i][j] = count;
        }
      }
    }
  }
  return board;
}

export default Board;
