import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" }).trim();

let example = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

let example2 = `.....
..##.
..#..
.....
..##.
.....`

// data = example;

let tiles = data.split("\n").map(line => line.split(""));
let elves = tiles.map((row, rowIndex) => row.map((tile, colIndex) =>
    tile === "#" ? {row: rowIndex, col: colIndex} : false
)).flat().filter(v => v != false);

console.log(elves);

function keyElf(elf) {
    return `${elf.row}:${elf.col}`;
}

function keyCord([row, col]) {
    return `${row}:${col}`;
}

let map = {};

elves.forEach(elf => map[keyElf(elf)] = elf)

// console.log(map);

function add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}

const N = [-1, 0];
const E = [0, 1];
const S = [1, 0];
const W = [0, -1];

const NE = add(N, E);
const SE = add(S, E);
const SW = add(S, W);
const NW = add(N, W);

const allDirections = [N, E, S, W, NE, SE, SW, NW];

const directions = new Map();
directions.set(N, [NE, N, NW]);
directions.set(S, [SE, S, SW]);
directions.set(W, [SW, W, NW]);
directions.set(E, [SE, E, NE]);

let directionsOrdering = [N, S, W, E];

// console.log(directions);

printMap(map);
for (let i = 0; i < 100000000000000000; i++) {
    let moves = [];

    let tileMoveCounts = {};
    
    // plan moves
    elfLoop: for (let elf of Object.values(map)) {
        // We only move if there's at least one elf next to us.
        let atLeastOneElf = false;
        for (let direction of allDirections) {
            if (map.hasOwnProperty(keyCord(add([elf.row, elf.col], direction)))) {
                atLeastOneElf = true;
                break;
            }
        }
        if (!atLeastOneElf) {
            continue;
        }


        for (let direction of directionsOrdering) {
            let toCheck = directions.get(direction);
            let hasElf = false;
            for (let check of toCheck) {
                if (map.hasOwnProperty(keyCord(add([elf.row, elf.col], check)))) {
                    hasElf = true;
                }
            }
            if (!hasElf) {
                const newLocation = add([elf.row, elf.col], direction);
                moves.push({ elf, newLocation, oldLocation: [elf.row, elf.col] })
                tileMoveCounts[keyCord(newLocation)] = tileMoveCounts[keyCord(newLocation)] ? tileMoveCounts[keyCord(newLocation)] + 1 : 1
                break;
            }
        }
    }

    // console.log(`Pre trim: ${i}`, moves);
    // console.log(tileMoveCounts);

    // cancel moves
    for (let [newLocationStringToCancel, count] of Object.entries(tileMoveCounts).filter(([_, count]) => count > 1)) {
        moves = moves.filter(({ elf, newLocation }) => newLocationStringToCancel !== keyCord(newLocation));
        
    }

    // console.log(`Post Trim: ${i}`, moves)
    // console.log(map);

    // make moves
    for (let { elf, newLocation, oldLocation } of moves) {
        delete map[keyCord(oldLocation)]
        elf.row = newLocation[0];
        elf.col = newLocation[1];
        map[keyCord(newLocation)] = elf;
    }
    // console.log(map);

    console.log(`Round: ${i + 1}`);
    if (moves.length === 0) {
        break;
    }
    // printMap(map);

    directionsOrdering.push(directionsOrdering.shift());
    // console.log(directionsOrdering);
}

function sizeMap(map) {
    let minRow = Number.POSITIVE_INFINITY;
    let maxRow = Number.NEGATIVE_INFINITY;
    let minCol = Number.POSITIVE_INFINITY;
    let maxCol = Number.NEGATIVE_INFINITY;

    for (let elf of Object.values(map)) {
        // console.log(elf)
        if (elf.row < minRow) {
            minRow = elf.row;
        }
        if (elf.row > maxRow) {
            maxRow = elf.row;
        }
        if (elf.col < minCol) {
            minCol = elf.col;
        }
        if (elf.col > maxCol) {
            maxCol = elf.col;
        }
    }

    const rowCount = maxRow - minRow + 1;
    const colCount = maxCol - minCol + 1;

    return { minRow, maxRow, minCol, maxCol, rowCount, colCount };
}

const { minRow, maxRow, minCol, maxCol, rowCount, colCount } = sizeMap(map);

console.log(minRow, maxRow);
console.log(minCol, maxCol);

const area = rowCount * colCount;

function printMap(map) {
    const { minRow, maxRow, minCol, maxCol, rowCount, colCount } = sizeMap(map);

    const drawnMap = new Array(rowCount).fill(0).map(r => new Array(colCount).fill("."));

    Object.values(map).forEach(elf => {
        drawnMap[elf.row - minRow][elf.col - minCol] = "#";
    });

    console.log(drawnMap.map(r => r.join("")).join("\n"));
}

console.log(area);

const elfCount = Object.keys(map).length;

console.log(area - elfCount);
// printMap(map);

