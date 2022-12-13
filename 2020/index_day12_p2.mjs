import fs from "fs";

const example = `
F10
N3
F7
R90
F11`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim()).filter(line => line !== "");

const DIRECTIONS = {
  "N": [0, 1],
  "E": [1, -0],
  "S": [-0, -1],
  "W": [-1, 0],
}

function parse(line) {
  return [line.slice(0, 1), parseInt(line.slice(1))];
}

function rotate(x, y, right, degrees) {
  let amount = (degrees / 90) * (right ? 1 : -1);

  if (amount < 0) {
    amount = amount + 4;
  }

  let resX = x;
  let resY = y;
  for (let i = 0; i < amount; i++) {
    [resX, resY] = [resY, -resX]
  }

  return [resX, resY]
}

let x = 0;
let y = 0;

let wpx = 10;
let wpy = 1;


for (let line of lines) {
  const [dir, number] = parse(line);

  if (DIRECTIONS.hasOwnProperty(dir)) {
    const move = DIRECTIONS[dir];

    wpx = wpx + move[0] * number
    wpy = wpy + move[1] * number
  } else if (dir === "R" || dir === "L") {
    [wpx, wpy] = rotate(wpx, wpy, dir === "R", number)
  } else if (dir === "F") {
    console.log(x, wpx, (wpx - x), )
    x = x + (wpx) * number
    y = y + (wpy) * number
  }
}

console.log(rotate(1, 2, false, 90));
console.log(Math.abs(x) + Math.abs(y));
