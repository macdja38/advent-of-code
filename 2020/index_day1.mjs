import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
const lines = data.split("\n").map(line => parseInt(line, 10));

big: for (let line of lines) {
  for (let line2 of lines) {
    for (let line3 of lines) {
      if (line + line2 + line3 === 2020) {
        console.log(line, line2);
        console.log(line * line2 * line3);
        break big;
      }
    }
  }
}
