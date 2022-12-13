import fs from "fs";

let rawData = fs.readFileSync("./data.txt", { encoding: "utf8" });

// rawData = "R 4\n" +
//   "U 4\n" +
//   "L 3\n" +
//   "D 1\n" +
//   "R 4\n" +
//   "D 1\n" +
//   "L 5\n" +
//   "R 2"

let data = rawData.trim().split("\n");


let count = 0;

const setOfTailVisited = new Set(["0:0"]);

let headX = 0;
let headY = 0;
let knots = [];
let tailX = 0;
let tailY = 0;

function moveTowardsHead({x, y}) {
  if (Math.abs(headX - x) > 1 || Math.abs(headY - y) > 1) {
    if (headX > x) {
      x += 1;
    }
    if (headX < x) {
      x -= 1;
    }
    if (headY < y) {
      y -= 1;
    }
    if (headY > y) {
      y += 1;
    }
  }
  return {x, y};
}

const dirMap = {
  "U": { x: 0, y: 1},
  "D": { x: 0, y: -1},
  "R": { x: 1, y: 0},
  "L": { x: -1, y: 0},
}

for (let line of data) {
  const [direction, rawMagnitude] = line.split(" ");
  const magnitude = parseInt(rawMagnitude, 10);
  const offset = dirMap[direction];

  for (let i = 0; i < magnitude; i++) {
    console.log(direction, rawMagnitude, offset);
    headX += offset.x;
    headY += offset.y;

    moveTowardsHead();

    setOfTailVisited.add(`${tailX}:${tailY}`);
    console.log(headX, headY, tailX, tailY);
  }
}

console.log(setOfTailVisited.size);
