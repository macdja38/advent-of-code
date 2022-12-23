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

data = example;

let [rawMap, rawPath] = data.split("\n\n");

let tilesP1 = {}

let width = 0;
let height = 0;

let startingTile = {};
let startingTileCol = Number.MAX_SAFE_INTEGER;

let surfaceArea = 0;

rawMap.split("\n").map((row, rowIndex) => row.split("").forEach((tile, colIndex) => {
    if (tile !== " ") {
        surfaceArea += 1;
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

let sideLength = Math.sqrt(surfaceArea / 6);

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

console.log("Part 1")
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

// part 2


// let directions = [
//     [0, 1], // right
//     [1, 0], // down
//     [0, -1],
//     [-1, 0]
// ]

function rotateRight(currentDirectionIndex=0, rotateBy=0) {
    return (currentDirectionIndex + rotateBy + 4) % 4
}

// normal stitching for tiles that are directly against each other without folding
for (let tile of Object.values(tilesP2)) {
    for (let [directionIndex, direction] of Object.entries(directions)) {
        let rotateBy = 0;

        let tileRow = tile.row + direction[0];
        let tileCol = tile.col + direction[1];

        let tileAtSpot = tilesP2[key(tileRow, tileCol)];
        if (tileAtSpot) {
            tile.directions[directionIndex] = {tileAtSpot, rotateBy};
        }
    }
}

// Given that a cube only has 12 edges we shouldn't need more than 12 iterations of trying to fold
// lets do 16 to be safe
for (let i = 0; i < 16; i++) {
    for (let tile of Object.values(tilesP2)) {
        for (let [directionIndex] of Object.entries(directions)) {
            // search for this shape
            // ..
            // .
            // in any orientation. If we find it we can fold those two sides together.

            let directionIndexNum = parseInt(directionIndex, 10);
            let directionIndexNumRotatedRight = rotateRight(directionIndexNum, 1);

            let tile1 = tile.directions[directionIndexNum]
            let tile2 = tile.directions[directionIndexNumRotatedRight];

            if (!tile1 || !tile2) {
                // this certainly isn't a corner, we can't start folding from here.
                continue;
            }

            let tile1dirAfterTransition = rotateRight(directionIndexNum, tile1.rotateBy);
            let tile2dirAfterTransition = rotateRight(directionIndexNumRotatedRight, tile2.rotateBy);

            let tile1ToEmptySpace = rotateRight(tile1dirAfterTransition, 1);
            let tile2ToEmptySpace = rotateRight(tile2dirAfterTransition, 3);

            // now that we've verified the three cube tiles we need to verify the empty space.

            const empty1 = tile1.tileAtSpot.directions[tile1ToEmptySpace];
            const empty2 = tile2.tileAtSpot.directions[tile2ToEmptySpace];

            if (empty1 !== undefined || empty2 !== undefined) {
                // no empty space means this isn't a corner
                continue;
            }

            console.log("Stitching from ", tile, directionIndex);
            // we've located a corner. The first edge is in directionIndexNum, the second is in directionIndexNumRotatedRight.

            let dir1Tile = tile1.tileAtSpot;
            let dir2Tile = tile2.tileAtSpot;

            // when moving over an edge we need to change our rotation direction so that we're heading away from the edge
            // this essentially calculates the way back, then rotates 180 degrees.
            // +4 is added so that we'll always have a positive number.
            let rotateBy1 = (tile2ToEmptySpace - tile1ToEmptySpace - 2 + 4) % 4;
            let rotateBy2 = (tile1ToEmptySpace - tile2ToEmptySpace - 2 + 4) % 4;

            // iterate down the edges, linking them to each other
            for (let i = 0; i < sideLength; i++) {
                if (i !== 0) {
                    dir1Tile = dir1Tile.directions[tile1dirAfterTransition].tileAtSpot;
                    dir2Tile = dir2Tile.directions[tile2dirAfterTransition].tileAtSpot
                }


                dir1Tile.directions[tile1ToEmptySpace] = {tileAtSpot: dir2Tile, rotateBy: rotateBy1 };
                dir2Tile.directions[tile2ToEmptySpace] = {tileAtSpot: dir1Tile, rotateBy: rotateBy2 };
            }
        }
    }
}

// each pair of tiles can be traversed in both directions .
for (let tile of Object.values(tilesP2)) {
    for (let [directionIndex] of Object.entries(directions)) {
        const to = tile.directions[directionIndex];
        const directionIndexNum = parseInt(directionIndex, 10);
        const reverseDirection = (directionIndexNum + to.rotateBy + 2) % 4;
        const from = to.tileAtSpot.directions[reverseDirection].tileAtSpot;
        if (from !== tile) {
            console.error("ERROR ==== ERROR ==== ERROR");
            console.error(tile, directionIndex, to, from);
        }
    }
}

direction = 0;
tile = tilesP2[key(startingTile.row, startingTile.col)];

lastFacingOnTile = {};

for (let step of steps) {
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
}

console.log("Part 2");
console.log(tile.row, tile.col, direction);
console.log((tile.row + 1) * 1000 + (tile.col + 1) * 4 + direction);
