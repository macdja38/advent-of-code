import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

// data = "2-4,6-8\n" +
//   "2-3,4-5\n" +
//   "5-7,7-9\n" +
//   "2-8,3-7\n" +
//   "6-6,4-6\n" +
//   "2-6,4-8"

const overlaps = data.trim().split("\n").filter(ep => {
  const [elf1, elf2] = ep.split(",");
  const [elf11, elf12] = elf1.split("-").map(n => parseInt(n, 10));
  const [elf21, elf22] = elf2.split("-").map(n => parseInt(n, 10));

  if (elf11 <= elf21 && elf12 >= elf22) {
    return true;
  }
  if (elf21 <= elf11 && elf22 >= elf12) {
    return true
  }
  return false;
})

console.log(overlaps);

console.log(overlaps.length);

// 596 is too high.

const overlapsAtAll = data.trim().split("\n").filter(ep => {
  const [elf1, elf2] = ep.split(",");
  const [elf11, elf12] = elf1.split("-").map(n => parseInt(n, 10));
  const [elf21, elf22] = elf2.split("-").map(n => parseInt(n, 10));

  if (elf11 >= elf21 && elf11 <= elf22) {
    return true;
  }
  if (elf12 >= elf21 && elf12 <= elf22) {
    return true
  }
  if (elf21 >= elf11 && elf21 <= elf12) {
    return true;
  }
  if (elf22 >= elf11 && elf22 <= elf12) {
    return true;
  }
  // if (elf21 <= elf11 || elf22 >= elf12) {
  //   return true
  // }
  return false;
})

console.log(overlapsAtAll);
console.log(overlapsAtAll.length);
