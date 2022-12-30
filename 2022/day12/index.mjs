import jsnx from "jsnetworkx";
import fs from "fs";

let file = fs.readFileSync("./data.txt", {encoding: "utf8"});

let example = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi;`

// file = example;


function cellLetterToHeight(letter) {
    if (letter === "S") {
        return 0;
    }
    if (letter === "E") {
        return 26;
    }
    return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}

let rawGrid = file.split("\n").map(r => r.split(""));

const G = new jsnx.DiGraph();

let start = '';
let end = '';

rawGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        if (cell === "S") {
            start = `${rowIndex}:${colIndex}`;
        }
        if (cell === "E") {
            end = `${rowIndex}:${colIndex}`;
        }
    });
});

rawGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        G.addNode(`${rowIndex}:${colIndex}`);
    });
});

rawGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ];
        const cellNumber = cellLetterToHeight(cell);
        for (let direction of directions) {
            let probeRow = rowIndex - direction[0];
            let probeCol = colIndex - direction[1];
            try {
                const probeCell = rawGrid[probeRow][probeCol];
                const probeCellNumber = cellLetterToHeight(probeCell);

                if (probeCellNumber - cellNumber <= 1) {
                    G.addEdge(`${rowIndex}:${colIndex}`, `${probeRow}:${probeCol}`);
                }
            } catch (error) {
            }
        }

    });
});

// console.log(G);

console.log(jsnx.bidirectionalShortestPath(G, start, end));
console.log(jsnx.bidirectionalShortestPath(G, start, end).length - 1);

let shortest = Number.MAX_SAFE_INTEGER;
console.log(shortest);

rawGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        if (cell === 'a') {
            try {
                const length = jsnx.bidirectionalShortestPath(G, `${rowIndex}:${colIndex}`, end).length - 1;
                console.log(length);
                if (length < shortest) {
                    shortest = length;
                }
            } catch (error) {
            }
        }
    });
});

console.log(shortest);