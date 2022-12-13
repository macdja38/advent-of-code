import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim()).filter(line => line !== "");

// const parts = lines.map(line => line.match(/(?<min>\d+)-(?<max>\d+)\s(?<letter>\w): (?<password>\w+)/).groups);

const map = lines.map(line => line.split(""));

const treeWrapper = [];
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
for (let slope of slopes) {
  let x = 0;
  let y = 0;
  let trees = 0;
  let width = map[0].length
  while (true) {
    x += slope[0];
    y += slope[1];
    if (y > (map.length - 1)) {
      break;
    }
    console.log(y);
    const val = map[y][x % width];
    if (val === "#") {
      trees += 1;
    }
  }
  treeWrapper.push(trees);
}
console.log(treeWrapper.reduce((acc, x) => acc * x, 1));

// parts.map(({min, max, letter, password}) => {
//
// })


