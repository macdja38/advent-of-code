import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

let example = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

// data = example;

let paths = [...data.matchAll(/(\d+),(\d+) -> (?=(\d+),(\d+))/g)].map(([_, fx, fy, tx, ty]) => ({
  fx: parseInt(fx, 10),
  fy: parseInt(fy, 10),
  tx: parseInt(tx, 10),
  ty: parseInt(ty, 10),
}));

console.log(paths);

function min(paths, name) {
  return paths.reduce((acc, path) => Math.min(path[name], acc), Number.MAX_SAFE_INTEGER)
}

function max(paths, name) {
  return paths.reduce((acc, path) => Math.max(path[name], acc), 0)
}

let minX = Math.min(min(paths, "fx"), min(paths, "tx"));
let maxX = Math.max(max(paths, "fx"), max(paths, "tx"));
let minY = 0;
let maxY = Math.max(max(paths, "fy"), max(paths, "ty")) + 2;

console.log(maxY);

paths.push({ fx: 0, fy: maxY, tx: 1000, ty: maxY})

minX = Math.min(min(paths, "fx"), min(paths, "tx"));
maxX = Math.max(max(paths, "fx"), max(paths, "tx"));
minY = 0;
maxY = Math.max(max(paths, "fy"), max(paths, "ty")) + 2;

console.log(minX, maxX, minY, maxY);


const map = new Array(maxY - minY + 1).fill(0).map(colum => new Array(maxX - minX + 1).fill(0).map(_ => "."));

map[0 - minY][500 - minX] = "+"

for (let line of paths) {
  const { fx, fy, tx, ty } = line;

  if (fx === tx) {
    for (let i = Math.min(fy, ty); i <= Math.max(fy, ty); i++) {
      console.log(line, i);
      map[i - minY][tx - minX] = "#"
    }
  } else if (fy === ty) {
    for (let i = Math.min(fx, tx); i <= Math.max(fx, tx); i++) {
      map[ty - minY][i - minX] = "#"
    }
  } else {
    map[ty - minY][tx - minX] = "#"
  }
}

function drawMap() {
  console.log(map.map(line => line.join("")).join("\n"));
}

const sandSpawn = { x: 500 - minX, y: 0 - minY };

let sandPlaced = 0;

outerLoop: while(true) {
  const newSand = JSON.parse(JSON.stringify(sandSpawn));

  while(true) {
    if (newSand.y >= maxY) {
      break outerLoop;
    }
    if (map[newSand.y + 1][newSand.x] === '.') {
      newSand.y = newSand.y + 1;
    }
    if (map[newSand.y + 1][newSand.x] === '#' || map[newSand.y + 1][newSand.x] === 'o') {
      if (newSand.x - 1 < 0) {
        break outerLoop;
      }
      if (map[newSand.y + 1][newSand.x - 1] === '.') {
        newSand.y = newSand.y + 1;
        newSand.x = newSand.x - 1;
        continue;
      }
      if (newSand.x + 1 > (maxX - minX)) {
        break outerLoop;
      }
      if (map[newSand.y + 1][newSand.x + 1] === '.') {
        newSand.y = newSand.y + 1;
        newSand.x = newSand.x + 1;
        continue;
      }

      map[newSand.y][newSand.x] = "o";
      sandPlaced += 1;
      if (newSand.y === sandSpawn.y && newSand.x === sandSpawn.x) {
        break outerLoop;
      }
      break;
    }
  }
  // drawMap();
}

drawMap();
console.log(sandPlaced);
