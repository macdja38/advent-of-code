import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

// data = "    [D]    \n" +
//   "[N] [C]    \n" +
//   "[Z] [M] [P]\n" +
//   " 1   2   3 \n" +
//   "\n" +
//   "move 1 from 2 to 1\n" +
//   "move 3 from 1 to 3\n" +
//   "move 2 from 2 to 1\n" +
//   "move 1 from 1 to 2"

let [startingCrates, steps] = data.split("\n\n");
startingCrates = startingCrates.split("\n");

const cargo = [];
const indexes = startingCrates[startingCrates.length - 1];

let outputColumn = 0;
for (let i = 0; i < indexes.length; i++) {
  if (indexes[i] !== " ") {
    for (let row = startingCrates.length - 2; row >= 0; row--) {
      console.log(i, row);
      if (!Array.isArray(cargo[outputColumn])) {
        cargo[outputColumn] = [];
      }
      let possibleItem = startingCrates[row][i]
      if (possibleItem !== " ") {
        cargo[outputColumn].push(possibleItem)
      } else {
        break;
      }
    }
    outputColumn += 1;
  }
}

const cargoClone = JSON.parse(JSON.stringify(cargo));

steps = steps.trim().split("\n");

for (let step of steps) {
  const [_, quantity, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(step).map(i => parseInt(i, 10));

  for (let i = 0; i < quantity; i++) {
    const crate = cargoClone[from - 1].pop();
    cargoClone[to - 1].push(crate);
  }
}


const solution1 = cargoClone.map(column => column[column.length - 1]).join("")

console.log(solution1);

const cargoClone2 = JSON.parse(JSON.stringify(cargo));

for (let step of steps) {
  const [_, quantity, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(step).map(i => parseInt(i, 10));

  const fromCol = cargoClone2[from - 1];
  const crates = fromCol.splice(fromCol.length - quantity);
  cargoClone2[to - 1].push(...crates);
}


const solution2 = cargoClone2.map(column => column[column.length - 1]).join("")

console.log(solution2);
