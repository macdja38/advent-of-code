import fs from "fs";

let rawData = fs.readFileSync("./data.txt", { encoding: "utf8" });

let example = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

// rawData = example;

let pairs = rawData.split("\n\n").map(e => e.split("\n").map(l => eval(l)));

const zip = (a, b) => Array(Math.max(b.length, a.length)).fill().map((_,i) => [a[i], b[i]]);

function isInRightOrder(leftList, rightList) {
  const both = zip(leftList, rightList)

  for (let [leftValue, rightValue] of both) {
    if (leftValue === undefined) {
      return true;
    }
    if (rightValue === undefined) {
      return false;
    }


    if (Number.isInteger(leftValue) && Number.isInteger(rightValue)) {
      if (leftValue < rightValue) {
        return true;
      }
      if (leftValue === rightValue) {
        continue;
      }
      if (leftValue > rightValue) {
        return false;
      }
    }
    if (Number.isInteger(leftValue)) {
      leftValue = [leftValue];
    }
    if (Number.isInteger(rightValue)) {
      rightValue = [rightValue];
    }

    if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
      const compareResult = isInRightOrder(leftValue, rightValue);
      if (compareResult === true || compareResult === false) {
        return compareResult;
      } else {
        continue;
      }
    }

  }
  return null;
}

let sum = 0;

for (let [indexStr, [left, right]] of Object.entries(pairs)) {
  const index = parseInt(indexStr, 10) + 1;
  console.log(index, left, right);
  if (isInRightOrder(left, right)) {
    console.log(true);
    sum += index;
  }
}

console.log(sum);

const pairsToSort = [...pairs.flat(), [[6]], [[2]]];

function sort(a, b) {
  return isInRightOrder(a, b) ? -1 : 1;
}

pairsToSort.sort(sort);

let spot2 = 0;
let spot6 = 0;

for (let [indexStr, item] of Object.entries(pairsToSort)) {
  const index = parseInt(indexStr, 10) + 1;
  console.log(index, item);
  if (JSON.stringify(item) === "[[6]]") {
    spot6 = index;
  }
  if (JSON.stringify(item) === "[[2]]") {
    spot2 = index;
  }
}

console.log(spot2 * spot6);
