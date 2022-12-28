import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" }).trim();

let shapesRaw = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##
`

// bottom left of a shape is 0, 0

const shapes = [
  [`####`],
   [`.#.`,
    `###`,
    `.#.`],
   [`###`,
    `..#`,
    `..#`],
   [`#`,
    `#`,
    `#`,
    `#`],
   [`##`,
    `##`],
]

let example = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"

console.log(example.length);
console.log(data.length);

// data = example;

// 0,0 is bottom left
// row,col
// first index is row
let tower = new Array(10000).fill(0).map(_ => new Array(7).fill("."));

function canPlaceRock(rock, baseRow, baseCol) {
  const rockHeight = rock.length;
  const rockWidth = rock[0].length;
  if (baseRow < 0 || baseCol < 0) {
    return false;
  }
  for (let row = 0; row < rockHeight; row += 1) {
    for (let col = 0; col < rockWidth; col += 1) {
      // console.log(baseRow, row, baseCol, col);
      if (baseCol + col > 6) {
        return false;
      }
      if (rock[row][col] === "#" && tower[baseRow + row][baseCol + col] !== ".") {
        return false;
      }
    }
  }
  return true;
}

function placeRock(rock, baseRow, baseCol) {
  const rockHeight = rock.length;
  const rockWidth = rock[0].length;
  for (let row = 0; row < rockHeight; row += 1) {
    for (let col = 0; col < rockWidth; col += 1) {
      if (rock[row][col] === "#") {
        tower[baseRow + row][baseCol + col] = "#"
      }
    }
  }

}

let directionIndex = 0;
let directionLength = data.length;

let shapeIndex = 0;
let shapeLength = shapes.length;

let height = 0;
let heightOffset = 0;

function printTower(tower) {
  const towerTopFirst = tower.slice(0, height).reverse();
  console.log(towerTopFirst.map(row => row.join("")).join("\n"))
}

let seen = new Map();

const frequencies = [];

let mostCommonShapeZeroDirectionIndex = 0;

let targetRockNumber = 1000000000000;

for (let rockNumber = 0; rockNumber < targetRockNumber; rockNumber++) {

  if (rockNumber < 10000000) {
    if (rockNumber % 1000000 === 0) {
      console.log(rockNumber);
      console.log(Object.values(frequencies).join(" "));
    }
    if (!Number.isInteger(frequencies[directionIndex])) {
      frequencies[directionIndex] = 0;
    }
    frequencies[directionIndex] = frequencies[directionIndex] + 1;
  }

  if (rockNumber === 10000000) {
    console.log("Calculating Best Frequency")
    const result = frequencies.reduce((acc, frequency, index) => {
      if (frequency > acc.best) {
        return { best: frequency, bestIndex: index }
      }
      return acc;
    }, { best: 0, bestIndex: 0 })
    mostCommonShapeZeroDirectionIndex = result.bestIndex;
    console.log(result);
    console.log("\n\n\n");
    console.log(frequencies.join(" "))
  }

  let row = height + 3 - heightOffset;

  if (rockNumber > 10000000 && rockNumber < 10000000000) {
    if (shapeIndex === 0 && directionIndex === mostCommonShapeZeroDirectionIndex) {
      console.log("They are repeating");
      console.log(rockNumber, shapeIndex, directionIndex, );
      const towerTopFirst = tower.slice(row - 15, row + 15).reverse();
      let slice = towerTopFirst.map(row => row.join("")).join("\n");
      if (seen.has(slice)) {
        const { rockNumber: lastTimeSeen, height: lastHeightSeen } = seen.get(slice);
        let repeatInterval = rockNumber - lastTimeSeen;
        let repeatHeight = height - lastHeightSeen;
        console.log("Repeated At Interval", repeatInterval);

        const skipChunksLeft = Math.floor((targetRockNumber - rockNumber) / (repeatInterval)) - 100;

        let heightToBoostBy = skipChunksLeft * repeatHeight;
        let rocksToBoostBy = skipChunksLeft * repeatInterval;
        rockNumber += rocksToBoostBy;
        heightOffset += heightToBoostBy;
        height += heightToBoostBy
      }
      seen.set(slice, { rockNumber, height });


      //  console.log(rockNumber)

      // console.log("---------------------------------")

    }
  }

  let shape = shapes[shapeIndex];

  row = height + 3 - heightOffset;

  if (row > 1100) {
    heightOffset += 1000;
    tower = [...tower.slice(1000), ...new Array(1000).fill(0).map(v => new Array(7).fill("."))];
    row = height + 3 - heightOffset;
  }

  let col = 2;

  while(true) {
    let direction = data[directionIndex];
    // console.log(directionIndex, direction);
    directionIndex = (directionIndex + 1) % directionLength;

    const newCol = direction === '>' ? col + 1 : col - 1
    if (canPlaceRock(shape, row, newCol)) {
      col = newCol;
    }
    const newRow = row - 1;
    if (canPlaceRock(shape, newRow, col)) {
      row = newRow;
      continue;
    }
    placeRock(shape, row, col);
    if ((heightOffset + row + shape.length) > height) {
      height = heightOffset + row + shape.length;
    }
    break;
  }

  // console.log("FINAL")
  // printTower(tower);
  // console.log(`-------`);
  // console.log("\n\n\n")
  shapeIndex = (shapeIndex + 1) % shapeLength;

}

console.log(height);

// 3173
