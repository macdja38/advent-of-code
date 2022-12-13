import fs from "fs";

let rawData = fs.readFileSync("./data.txt", { encoding: "utf8" });

// rawData = "R 5\n" +
//   "U 8\n" +
//   "L 8\n" +
//   "D 3\n" +
//   "R 17\n" +
//   "D 10\n" +
//   "L 25\n" +
//   "U 20"

let data = rawData.trim().split("\n");

let count = 0;

const setOfTailVisited = new Set(["0:0"]);

let headX = 0;
let headY = 0;
let knots = (new Array(9).fill(0).map(_ => ({x: 0, y: 0})));
let tail = {};

function moveTowardsHead({x: headX, y: headY}, {x, y}) {
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
    headX += offset.x;
    headY += offset.y;

    for (let knot of knots) {
      let previousNotIndex = knots.indexOf(knot) - 1;
      let previousNot = {x: headX, y: headY};
      if (previousNotIndex >= 0) {
        previousNot = {x: knots[previousNotIndex].x, y: knots[previousNotIndex].y}
      }
      let newPosition = moveTowardsHead(previousNot, {x: knot.x, y: knot.y});
      knot.x = newPosition.x;
      knot.y = newPosition.y;
      tail = knot;
    }

    setOfTailVisited.add(`${tail.x}:${tail.y}`);
  }
}

console.log(setOfTailVisited.size);
