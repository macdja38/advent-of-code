import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
console.log(data.split("\n"));
const lines = data.split("\n").map(line => line);

const elfIndex = ["A", "B", "C"];
const playerIndex = ["X", "Y", "Z"];
// lose // tie, // win
const points = [1, 2, 3]
const outcome = [0, 3, 6]

function calculateScore(elf, response) {
  const elfA = elfIndex.indexOf(elf);
  const shouldWin = playerIndex.indexOf(response);

  const rotateBy = shouldWin - 1
  let responseA = elfA + rotateBy
  if (responseA > 2) {
    responseA -= 3;
  }
  if (responseA < 0) {
    responseA += 3;
  }

  let winPoints = 0;
  if (responseA === elfA) {
    winPoints = 3;
  }
  else if (responseA === 2 && elfA === 1) {
    winPoints = 6;
  }
  else if (responseA === 1 && elfA === 0) {
    winPoints = 6;
  }
  else if (responseA === 0 && elfA === 2) {
    winPoints = 6;
  }
  else {
    winPoints = 0
  }

  let choicePoints = responseA + 1;

  return winPoints + choicePoints;
}

// scissors, scissors

console.log(calculateScore("C", "Z"))

let score = 0;
for (let line of lines) {
  const [elf, player] = line.split(" ")
  if (player === undefined) {
    continue;
  }
  score += calculateScore(elf, player)
}
console.log(score);
