import fs from "fs";

const example = `
F10
N3
F7
R90
F11`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = example.split("\n").map(line => line.trim()).filter(line => line !== "");

const DIRECTIONS = {
  "N": [0, 1],
  "E": [1, 0],
  "S": [0, -1],
  "W": [-1, 0],
}

function parse(line) {
  return [line.slice(0, 1), parseInt(line.slice(1))];
}

function rotate(direction, right, degrees) {
  const arr = Object.values(DIRECTIONS);

  const current = arr.indexOf(direction);

  let amount = (degrees / 90) * (right ? 1 : -1);

  if (amount < 0) {
    amount = amount + 4;
  }

  return arr[(current + amount) % 4];
}

let x = 0;
let y = 0;

let currentDirection = DIRECTIONS.E;

for (let line of lines) {
  const [dir, number] = parse(line);

  if (DIRECTIONS.hasOwnProperty(dir)) {
    const move = DIRECTIONS[dir];

    x = x + move[0] * number
    y = y + move[1] * number
  } else if (dir === "R" || dir === "L") {
    currentDirection = rotate(currentDirection, dir === "R", number)
  } else if (dir === "F") {
    const move = currentDirection;

    x = x + move[0] * number
    y = y + move[1] * number
  }
}

console.log(currentDirection);
console.log(rotate(currentDirection, false, 90));
console.log(Math.abs(x) + Math.abs(y));
