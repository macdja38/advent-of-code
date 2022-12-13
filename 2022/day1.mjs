import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
console.log(data.split("\n"));
const lines = data.split("\n").map(line => parseInt(line, 10));

let elf = 0;
let elfs = []

for (let line of lines) {
  if (isNaN(line)) {
    elfs.push(elf);
    elf = 0;
  } else {
    elf += line;
  }

}

elfs.sort((a, b) => b - a);

// part 1
console.log(elfs[0]);

// part 2
console.log(elfs[0] + elfs[1] + elfs[2])


