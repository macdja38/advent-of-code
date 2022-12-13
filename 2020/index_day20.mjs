import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" });

const example = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`

let tiles = data.split("\n\n").map(line => line.trim()).filter(line => line !== "").map(section => {
  const [name, data] = section.split(":\n")

  return {
    name: name.split(" ")[1]
    , data: data.split("\n").map(v => v.split("")),
  }
});

console.log(tiles)

console.log()

const dimension = Math.sqrt(tiles.length);

const solution = new Array(dimension).fill(0).map(v => new Array(dimension));

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

console.log(solution);

for (let x = 0; x < dimension; x++) {
  for (let y = 0; y < dimension; y++) {

  }
}

/**
 * compare right side of tile1 to left side of tile2
 * @param tile1
 * @param tile2
 */
function compare(tile1, tile2) {
  for (let x = 0; x < 10; x++) {
    if (tile1[x][9] !== tile2[x][0]) {
      return false;
    }
  }
  return true;
}

function rotate(tile1) {
  const x_max = tile1.length;
  const y_max = tile1[0].length

  const newData = new Array(y_max).fill(0).map(v => new Array(x_max));

  for (let x = 0; x < x_max; x++) {
    for (let y = 0; y < y_max; y++) {
      const newX = y;
      const newY = -x + (y_max - 1);
      newData[newX][newY] = tile1[x][y]
    }
  }

  return newData;
}

console.log(tiles[0].data.map(l => l.join("") + "                         "))
console.log(rotate(tiles[0].data).map(l => l.join("") + "                      "));


function flipTopDown(tile1) {
  const x_max = tile1.length;
  const y_max = tile1[0].length

  const newData = new Array(x_max).fill(0).map(v => new Array(y_max));

  for (let x = 0; x < x_max; x++) {
    for (let y = 0; y < y_max; y++) {
      const newX = -x + (x_max - 1);
      const newY = y;
      newData[newX][newY] = tile1[x][y]
    }
  }

  return newData;
}

function flipLeftRight(tile1) {
  const x_max = tile1.length;
  const y_max = tile1[0].length

  const newData = new Array(x_max).fill(0).map(v => new Array(y_max));

  for (let x = 0; x < x_max; x++) {
    for (let y = 0; y < y_max; y++) {
      const newX = x;
      const newY = -y + (y_max - 1);
      newData[newX][newY] = tile1[x][y]
    }
  }

  return newData;
}

function flipBoth(tile1) {
  const newData = new Array(10).fill(0).map(v => new Array(10));

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const newX = -x + 9;
      const newY = -y + 9;
      newData[newX][newY] = tile1[x][y]
    }
  }

  return newData;
}

const flips = [(data) => data, flipLeftRight, flipTopDown /* flipBoth */]

console.log("==== FLIP LEFT RIGHT ====")
console.log(tiles[0].data.map(l => l.join("")).join("\n"))
console.log("\n")
console.log(flipLeftRight(tiles[0].data).map(l => l.join("")).join("\n"));

console.log("==== FLIP TOP BOTTOM ====")
console.log(tiles[0].data.map(l => l.join("")).join("\n"))
console.log("\n")
console.log(flipTopDown(tiles[0].data).map(l => l.join("")).join("\n"));

const locations = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0]]

function printTileData(tile) {
  return tile.map(l => l.join("")).join("\n")
}

function print(solution) {
  console.log(solution.map(line => line.map(e => e ? e.name : "    ").join(" ")).join("\n"))
}

function printLarge(solution) {
  for (let x = 0; x < dimension * 10; x++) {
    let x_inner = x % 10;
    let x_outer = Math.floor(x / 10);

    if (x_inner === 0) {
      console.log("\n");
    }

    const line = [];
    for (let y = 0; y < dimension * 10; y++) {
      let y_inner = y % 10;
      let y_outer = Math.floor(y / 10);

      if (y_inner === 0) {
        line.push(" ")
      }

      if (solution[x_outer][y_outer]) {
        line.push(solution[x_outer][y_outer].data[x_inner][y_inner])
      }
    }

    console.log(line.join(""));
  }
}

function placeATile(solution, unused) {
  if (unused.length === 0) {
    return solution;
  }

  let test = new Set(unused);

  if (test.size !== unused.length) {
    throw new Error("wwwwww")
  }

  const index = tiles.length - unused.length;

  let newX;
  let newY;

  if (false) {
    if (index < locations.length) {
      newX = locations[index][0]
      newY = locations[index][1];
    } else {
      newX = Math.floor((index - locations.length) / dimension) + 1;
      newY = ((index - locations.length) % dimension) + 1;
    }
  } else {
    newX = Math.floor(index / dimension);
    newY = index % dimension;
  }

  for (let tile of unused) {
    const tested = new Set();

    for (let flip of flips) {
      let tileData = flip(tile.data);

      for (let i = 0; i < 4; i++) {
        if (tested.has(printTileData(tileData))) {
          continue;
        }
        tested.add(printTileData(tileData));
        let a = true;
        if (newY > 0) {
          a = compare(solution[newX][newY - 1].data, tileData)
        }
        let b = true;
        if (newX > 0) {
          b = compare(rotate(rotate(rotate(solution[newX - 1][newY].data))), rotate(rotate(rotate(tileData))));
        }
        // console.log(a, b);
        if (a && b) {
          const trialSolution = clone(solution);
          trialSolution[newX][newY] = { name: tile.name, data: tileData }
          const removeIndex = unused.indexOf(tile);
          const nowUnused = clone(unused);
          nowUnused.splice(removeIndex, 1)
          const result = placeATile(trialSolution, nowUnused);
          if (result) {
            return result;
          }
        }
        tileData = rotate(tileData);
      }
    }
  }

}

const answer = placeATile(solution, tiles);

const corners = [answer[0][0], answer[0][dimension - 1], answer[dimension - 1][0], answer[dimension - 1][dimension - 1]]

console.log(corners);

console.log(corners.reduce((acc, corner) => parseInt(corner.name, 10) * acc, 1));

let horseSampleData = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `

let horseSampleLines = horseSampleData.split("\n").map(line => line.split(""))

function removeSeaHorses(solution) {
  let lines = [];

  for (let x = 0; x < dimension * 8; x++) {
    let x_inner = x % 8 + 1;
    let x_outer = Math.floor(x / 8);

    const line = [];
    for (let y = 0; y < dimension * 8; y++) {
      let y_inner = y % 8 + 1;
      let y_outer = Math.floor(y / 8);

      if (solution[x_outer][y_outer]) {
        line.push(solution[x_outer][y_outer].data[x_inner][y_inner])
      }
    }

    lines.push(line);
  }

  let seaHorseSet = new Set();
  let horsesToTest = [];

  for (let flip of flips) {
    let tileData = flip(horseSampleLines);

    for (let i = 0; i < 4; i++) {
      if (!seaHorseSet.has(tileData.map(l => l.join("")).join("\n"))) {
        horsesToTest.push(tileData);
        seaHorseSet.add(tileData.map(l => l.join("")).join("\n"));
      }
      tileData = rotate(tileData);
    }
  }

  console.log("BEFORE");
  console.log(lines.map(line => line.join("")).join("\n"))

  const imageDimension = lines.length;

  for (let horse of horsesToTest) {
    for (let x = 0; x < imageDimension; x++) {
      for (let y = 0; y < imageDimension; y++) {
        let match = true;

        hl: for (let hx = 0; hx < horse.length; hx++) {
          for (let hy = 0; hy < horse[hx].length; hy++) {
            if (horse[hx][hy] === "#") {

              if (lines[x + hx] && lines[x + hx][y + hy]) {
                // let spot = lines[x + hx]?.[y + hy];
                let spot = lines[x + hx][y + hy];

                if (spot !== "#" && spot !== "O") {
                  match = false;
                  break hl;
                }
              } else {
                match = false;
                break hl;
              }
            }
          }
        }

        if (match === true) {
          for (let hx = 0; hx < horse.length; hx++) {
            for (let hy = 0; hy < horse[hx].length; hy++) {
              if (horse[hx][hy] === "#") {
                if (lines[x + hx] && lines[x + hx][y + hy]) {
                  lines[x + hx][y + hy] = "O"
                }
              }
            }
          }
        }
      }
    }
  }

  console.log("AFTER")
  console.log(lines.map(line => line.join("")).join("\n"))

  return lines;
}

const lines = removeSeaHorses(answer);

console.log(lines.reduce((acc, line) => acc + line.reduce((acc, s) => acc + (s === "#" ? 1 : 0), 0), 0))
