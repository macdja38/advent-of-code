import fs from "fs";

const example = `0,3,6`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split(",").map(line => line.trim()).filter(line => line !== "");

const spokenNumbers = lines.map(l => parseInt(l, 10));

console.log(spokenNumbers)

for (let i = spokenNumbers.length; i < 2020; i++) {
  const lastNumber = spokenNumbers[i - 1];

  const spokenWithoutLast = spokenNumbers; // spokenNumbers.slice(0, spokenNumbers.length - 1)

  const indexLast = spokenWithoutLast.lastIndexOf(lastNumber);

  const indexSecondLast = spokenWithoutLast.slice(0, indexLast).lastIndexOf(lastNumber);

  if (indexSecondLast === -1) {
    spokenNumbers.push(0);
  } else {

    const newNum = indexLast - indexSecondLast;

    spokenNumbers.push(newNum);
  }
}

let numberIndexes = new Map();

const preDefined = lines.map(l => parseInt(l, 10));

let lastNumberSpoken = 0;

function addNum(num, index) {
  let n = numberIndexes.get(num);

  if (n !== undefined) {
    if (n.length >= 2) {
      n[0] = n[1]
      n[1] = index;
    } else {
      n.push(index);
    }
  } else {
    numberIndexes.set(num, [index])
  }
}

const start = Date.now();

for (let i = 0; i < 30000000; i++) {
  let newNum = 0;

  if (i < preDefined.length) {
    newNum = preDefined[i];
  } else {
    const indexes = numberIndexes.get(lastNumberSpoken)

    if (indexes.length < 2) {
      newNum = 0
    } else {
      newNum = indexes[1] - indexes[0]
    }
  }

  addNum(newNum, i);
  lastNumberSpoken = newNum;
}

console.log(Date.now() - start);
console.log(lastNumberSpoken);
