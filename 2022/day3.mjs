import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" })

// data = "vJrwpWtwJgWrhcsFMMfFFhFp\n" +
//   "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n" +
//   "PmmdzqPrVvPwwTWBwg\n" +
//   "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n" +
//   "ttgJtRGJQctTZtZT\n" +
//   "CrZsJsPPZsGzwwsLwLmpwMDw"

console.log(data.split("\n"));
const lines = data.trim().split("\n").map(line => line);

let totalScore = 0

function dupeToScore(item) {
  if (item.toLowerCase() === item) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

for (let line of lines) {
  const firstHalf = line.slice(0, line.length / 2);
  const secondHalf = line.slice(line.length / 2);

  console.log(firstHalf + "   " + secondHalf);

  const firstSet = new Set(firstHalf.split(""));

  const duplicates = secondHalf.split("").filter(l => firstHalf.includes(l))

  totalScore += dupeToScore(duplicates[0])
}

console.log(totalScore);

let total2 = 0;

for (let i = 0; i < lines.length; i += 3) {
  const set1 = new Set(lines[i].split(""));
  const set2 = new Set(lines[i+1].split(""));
  const set3 = new Set(lines[i+2].split(""));

  let intersect = new Set([...set1].filter(i => set2.has(i)).filter(i => set3.has(i)));
  intersect.forEach(a => {
    total2 += dupeToScore(a);
  });
}

console.log(total2);
