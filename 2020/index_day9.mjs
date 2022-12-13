import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let numbers = data.split("\n").map(line => line.trim()).filter(line => line !== "").map(line => parseInt(line, 10));

let number = 0;

for (let i = 25; i < numbers.length; i++) {
  let found = false;

  for (let x = 1; x < 26; x++) {
    for (let y = 1; y < 26; y++) {
      if (numbers[i] === (numbers[i - x] + numbers[i - y])) {
        found = true;
      }

    }
  }

  if (!found) {
    number = numbers[i];
    break;
  }
}


for (let i = 0; i < numbers.length; i++) {
  for (let j = i; j < numbers.length; j++) {
    let slice = numbers.slice(i, j);

    let sum = slice.reduce((acc, n) => acc + n, 0);

    if (sum > number) {
      break;
    }
    if (sum === number) {
      console.log(slice);

      const min = Math.min(...slice);
      const max = Math.max(...slice);
      console.log(min, max);
      console.log(min + max)
    }
  }
}
