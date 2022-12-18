import fs from "fs";

let data = fs.readFileSync("./data2.txt", { encoding: "utf8" }).trim();

let example = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

// data = example;

let cords = data.split("\n").map(line => line.split(",").map(v => parseInt(v, 10)));

let lineSet = new Set(data.split("\n"));

let outsideSet = new Set();

let count = 0;

for (let j = 0; j <= 5; j++) {
  for (let cord of cords) {
    const dirs = [
      [0, 0, 1],
      [0, 0, -1],
      [0, 1, 0],
      [0, -1, 0],
      [1, 0, 0],
      [-1, 0, 0],
    ]

    for (let dir of dirs) {
      let x = cord[0] + dir[0];
      let y = cord[1] + dir[1];
      let z = cord[2] + dir[2];

      let testPointFirst = `${x},${y},${z}`;

      if (lineSet.has(testPointFirst)) {
        continue;
      }

      dirLoop: for (let dir2 of dirs) {
        let cordsChecked = [];
        for (let i = 1; i < 100; i++) {
          let x = cord[0] + dir[0] + dir2[0] * i;
          let y = cord[1] + dir[1] + dir2[1] * i;
          let z = cord[2] + dir[2] + dir2[2] * i;

          let testPoint = `${x},${y},${z}`;

          if (outsideSet.has(testPoint)) {
            outsideSet.add(testPointFirst);
            cordsChecked.forEach(c => outsideSet.add(c));
            if (j === 5) {
              count = count + 1;
            }
            break dirLoop;
          }

          if (lineSet.has(testPoint)) {
            continue dirLoop;
          }
          cordsChecked.push(testPoint);
        }
        outsideSet.add(testPointFirst);
        cordsChecked.forEach(c => outsideSet.add(c));
        if (j === 5) {
          count = count + 1;
        }
        break dirLoop;
      }
    }
  }
}

console.log(count);

// 2072
// 2515
// 2538
