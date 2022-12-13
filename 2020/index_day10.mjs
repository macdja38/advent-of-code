import fs from "fs";

const example =`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let numbers = data.split("\n").map(line => line.trim()).filter(line => line !== "").map(line => parseInt(line, 10)).sort((a, b) => a - b);

numbers.unshift(0);

let max = Math.max(...numbers) + 3;

numbers.push(max);

console.log(numbers);


const res = numbers.reduce((acc, value, index, array) => {
  let difference = value - (array[index - 1] || 0);
  acc[difference] = (acc[difference] || 0) + 1;
  return acc;
}, {})

console.log(res);

function isValid(numbers) {
  return numbers.reduce((valid, value, index, array) => {
    if (!valid) {
      return false;
    }
    if (index === 0) return true;
    let difference = value - array[index - 1];
    console.log(value, array[index - 1], difference, difference > 3);
    if (difference > 3) {
      return false;
    }
    return valid;
  }, true)
}

const segments = [];

let segmentStart = 0;

for (let i = 0; i < numbers.length; i++) {
  const current = numbers[i];
  const next = numbers[i + 1];

  if (next - current === 3) {
    segments.push(numbers.slice(segmentStart + 1,  i + 1))
    segmentStart = i;
  }
}

segments[0].unshift(0);

var combinations = function(set) {
  return (function acc(xs, set) {
    var x = xs[0];
    if(typeof x === "undefined")
      return set;
    for(var i = 0, l = set.length; i < l; ++i)
      set.push(set[i].concat(x));
    return acc(xs.slice(1), set);
  })(set, [[]]).slice(1);
};

let combinations1 = 1;

console.log(segments);

for (let segment of segments) {
  let segmentCombos = 0;

  const shorter = segment.slice(1, segment.length - 1);

  console.log("============");
  console.log(segment);
  console.log(shorter);
  console.log("-----")

  const combos = combinations(shorter);

  combos.push([]);

  for (let combination of combos) {
    const addedBack = [segment[0], ...combination, segment[segment.length - 1]];

    console.log(addedBack);

    if (isValid(addedBack)) {
      segmentCombos += 1;
    }
  }

  if (segment.length < 3) {
    segmentCombos = 1;
  }

  console.log(segmentCombos);

  combinations1 = combinations1 * segmentCombos;
}

console.log(res['1'] * res['3'])

console.log("ddddd", combinations1);
