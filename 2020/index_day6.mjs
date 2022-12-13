import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n\n").map(line => line.trim()).filter(line => line !== "");

let total = 0;

for (let group of lines) {
  const clean = group.split("\n").map(v => v.trim())
  console.log("====\n", clean);

  const unique = {};
  let count = 0;
  for (let line of clean) {
    const set = new Set(line.split(""));
    count += 1;

    for (let l of Array.from(set)) {

      if (!unique[l]) {
        unique[l] = 0;
      }

      unique[l] = unique[l] + 1;
    }
  }

  console.log(unique);
  const r = Object.entries(unique).filter(([l, v]) => v === count);
  console.log(r.length);

  // console.log(group, r);

  total = total + r.length;
}

console.log(total);
