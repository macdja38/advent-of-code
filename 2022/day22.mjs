import fs from "fs";

let data = fs.readFileSync("./data.txt", {encoding: "utf8"});

let example =
    `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

// data = example;

let [rawMap, rawPath] = data.split("\n\n");

console.log(rawMap, rawPath);

let tilesP1 = {}

let width = 0;
let height = 0;

let startingTile = {};
let startingTileCol = Number.MAX_SAFE_INTEGER;

rawMap.split("\n").map((row, rowIndex) => row.split("").forEach((tile, colIndex) => {
    if (tile !== " ") {
        if ((colIndex + 1) > width) {
            width = colIndex + 1;
        }
        if ((rowIndex + 1) > height) {
            height = rowIndex + 1;
        }
        let tileData = {
            row: rowIndex,
            col: colIndex,
            tile,
            directions: {}
        };
        tilesP1[`${rowIndex}:${colIndex}`] = tileData;
        if (rowIndex === 0 && colIndex < startingTileCol) {
            startingTileCol = colIndex;
            startingTile = tileData;
        }
    }
}));

console.log(tilesP1)

const tilesP2 = JSON.parse(JSON.stringify(tilesP1));

let directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1],
    [-1, 0]
]

for (let tile of Object.values(tilesP1)) {
    for (let [directionIndex, direction] of Object.entries(directions)) {
        let tileRow = tile.row;
        let tileCol = tile.col;
        while (true) {
            tileRow = (tileRow + direction[0] + height) % height;
            tileCol = (tileCol + direction[1] + width) % width;
            let tileAtSpot = tilesP1[`${tileRow}:${tileCol}`];
            if (tileAtSpot) {
                tile.directions[directionIndex] = tileAtSpot;
                break;
            }
        }
    }
}


let steps = [...rawPath.matchAll(/(R|L|\d+)/g)].map(([_, m]) => m);


let direction = 0;
let tile = startingTile;

let lastFacingOnTile = {};

function key(row, col) {
    return `${row}:${col}`;
}

for (let step of steps) {
    console.log(step);
    if (step === "R") {
        direction = (direction + 1) % 4;
    } else if (step === "L") {
        direction = (direction - 1 + 4) % 4;
    } else {
        let stepCount = parseInt(step, 10);

        for (let i = 0; i < stepCount; i++) {
            lastFacingOnTile[key(tile.row, tile.col)] = direction;
            let potentialNextTile = tile.directions[direction];
            if (potentialNextTile.tile === "#") {
                break;
            }
            tile = potentialNextTile;
        }
    }
    lastFacingOnTile[key(tile.row, tile.col)] = direction;

    // console.log(direction, tile);
}

console.log(tile.row, tile.col, direction);

console.log((tile.row + 1) * 1000 + (tile.col + 1) * 4 + direction);
// 137 73 2
// incorrect 114138298
// 128294
// 138298

function facingToSymbol(f) {
    switch (f) {
        case 0:
            return ">"
        case 1:
            return "v";
        case 2:
            return "<";
        case 3:
            return "^"
    }
}

function drawMap() {
    const map = new Array(height).fill(0).map(_ => new Array(width).fill(" "));
    Object.values(tilesP1).forEach(tile => {
        map[tile.row][tile.col] = tile.tile;
        if (lastFacingOnTile.hasOwnProperty(key(tile.row, tile.col))) {
            map[tile.row][tile.col] = facingToSymbol(lastFacingOnTile[key(tile.row, tile.col)]);
        }
    })

    console.log(map.map(line => line.join("")).join("\n"))
}

drawMap();


// part 2


// let directions = [
//     [0, 1], // right
//     [1, 0], // down
//     [0, -1],
//     [-1, 0]
// ]

for (let tile of Object.values(tilesP2)) {
    for (let [directionIndex, direction] of Object.entries(directions)) {
        let tileRow = tile.row;
        let tileCol = tile.col;
        while (true) {
            tileRow = tileRow + direction[0];
            tileCol = tileCol + direction[1];
            let rotateBy = 0;
            if (tileRow === -1) {
                if (tileCol <= 99) {
                    tileRow = tileCol + 100;
                    tileCol = 0;
                    rotateBy = 1;
                } else {
                    tileCol = tileCol - 100
                    tileRow = 199
                    rotateBy = 0;
                }
            } else if (tileCol === 150) {
                tileRow = 149 - tileRow;
                tileCol = 99;
                rotateBy = rotateBy = 2;
            } else if (tileCol > 99 && tileRow === 50 && directionIndex === '1') {
                tileRow = tileCol - 50;
                tileCol = 99;
                rotateBy = 1;
            } else if (tileCol === 100 && tileRow > 49 && tileRow < 100 && directionIndex === `0`) {
                tileCol = tileRow + 50
                tileRow = 49;
                rotateBy = 3;
            } else if (tileCol === 100 && tileRow > 99 && tileRow < 150) {
                tileRow = 149 - tileRow
                tileCol = 149;
                rotateBy = 2;
            } else if (tileRow === 150 && tileCol > 49 && directionIndex === '1') {
                tileRow = 100 + tileCol;
                tileCol = 49;
                rotateBy = 1;
            } else if (tileCol === 50 && tileRow > 149 && directionIndex === '0') {
                tileCol = tileRow - 100;
                tileRow = 149;
                rotateBy = 3;
            } else if (tileRow > 199) {
                tileCol = tileCol + 100;
                tileRow = 0;
                rotateBy = 0;
            } else if (tileCol === -1 && tileRow > 149) {
                tileCol = tileRow - 100
                tileRow = 0;
                rotateBy = 3;
            } else if (tileCol === -1 && tileRow > 99) {
                tileRow = 149 - tileRow
                tileCol = 50;
                rotateBy = 2
            } else if (tileRow === 99 && tileCol < 50 && directionIndex === '3') {
                tileRow = tileCol + 50;
                tileCol = 50;
                rotateBy = 1
            } else if (tileCol === 49 && tileRow > 49 && tileRow < 100 && directionIndex === '2') {
                tileCol = tileRow - 50;
                tileRow = 100;
                rotateBy = 3
            } else if (tileCol === 49 && tileRow < 50) {
                tileRow = 149 - tileRow;
                tileCol = 0;
                rotateBy = 2;
            }
            let tileAtSpot = tilesP2[`${tileRow}:${tileCol}`];
            if (tileAtSpot) {
                tile.directions[directionIndex] = {tileAtSpot, rotateBy};
                break;
            } else {
                throw new Error();
            }
        }
    }
}

// verify everything is reversable
for (let tile of Object.values(tilesP2)) {
    for (let [directionIndex] of Object.entries(directions)) {
        const to = tile.directions[directionIndex];
        const directionIndexNum = parseInt(directionIndex, 10);
        const reverseDirection = (directionIndexNum + to.rotateBy + 2) % 4;
        const from = to.tileAtSpot.directions[reverseDirection].tileAtSpot;
        if (from !== tile) {
            console.log(tile, directionIndex, to, from);
        }
    }
}

direction = 0;
tile = tilesP2[key(startingTile.row, startingTile.col)];

lastFacingOnTile = {};

for (let step of steps) {
    console.log(step);
    if (step === "R") {
        direction = (direction + 1) % 4;
    } else if (step === "L") {
        direction = (direction - 1 + 4) % 4;
    } else {
        let stepCount = parseInt(step, 10);

        for (let i = 0; i < stepCount; i++) {
            lastFacingOnTile[key(tile.row, tile.col)] = direction;
            let {tileAtSpot: potentialNextTile, rotateBy} = tile.directions[direction];
            if (potentialNextTile.tile === "#") {
                break;
            }
            tile = potentialNextTile;
            direction = (direction + rotateBy) % 4;
        }
    }
    lastFacingOnTile[key(tile.row, tile.col)] = direction;

    // console.log(direction, tile);
}


console.log(tile.row, tile.col, direction);

console.log((tile.row + 1) * 1000 + (tile.col + 1) * 4 + direction);
