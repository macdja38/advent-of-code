import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim()).filter(line => line !== "");
let grid = lines.map(line => line.split(""));

const SEATS = {
  "EMPTY": "L",
  "FULL": "#",
  "FLOOR": ".",
}

function countSeatsAround(grid, x, y) {
  let occupied = 0;

  for (let i = -1; i <= 1; i++) {
    const row = grid[x + i];
    if (row) {
      for (let j = -1; j <= 1; j++) {
        // console.log(i, j);
        // console.log(grid[x][y], row[y + j], x + i, y + j)
        if (i === 0 && j === 0) {
          continue;
        }
        if (row[y + j] === SEATS.FULL) {
          occupied += 1
        }
      }
    }
  }

  return occupied;
}

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],   [1, 0], [1, 1],
]

function countSeatsVisible(grid, x, y) {
  let occupied = 0;

  for (let direction of directions) {
    let lx = x;
    let ly = y;

    while(true) {
      lx = direction[0] + lx;
      ly = direction[1] + ly;

      if (grid[lx]) {
        const seat = grid[lx][ly];
        if (seat === SEATS.FLOOR) {
          continue;
        }
        if (seat === SEATS.FULL) {
          occupied += 1;
        }
      }
      break;
    }
  }

  return occupied;
}

function clone(grid) {
  return JSON.parse(JSON.stringify(grid));
}

const height = grid.length
const width = grid[0].length

function countAllSeats(grid) {
  let count = 0;

  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      let seat = grid[x][y];

      if (seat === SEATS.FULL) {
        count += 1
      }
    }
  }

  return count;
}

function part1(countingFunction, seatThreshold) {
  let pastGrid = grid;

  while (true) {
    const iteration = clone(pastGrid);

    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        let seat = iteration[x][y];

        if (seat !== SEATS.FLOOR) {
          const count = countingFunction(pastGrid, x, y);

          if (seat === SEATS.EMPTY && count === 0) {
            seat = SEATS.FULL;
          } else if (seat === SEATS.FULL && count >= seatThreshold) {
            seat = SEATS.EMPTY;
          }
        }

        iteration[x][y] = seat;
      }
    }

    // console.log(iteration.map(line => line.join("") + "               "));

    if (JSON.stringify(iteration) === JSON.stringify(pastGrid)) {
      return countAllSeats(iteration);
    }

    pastGrid = iteration;
  }
}

console.log(part1(countSeatsAround, 4))
console.log(part1(countSeatsVisible, 5));
