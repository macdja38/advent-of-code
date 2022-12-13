const start = Date.now();

import fs from "fs";

const example = [5764801, 17807724]

const data = [5099500, 7648211];

function transformOnce(subject, val) {
  val = val * subject;
  val = val % 20201227;
  return val;
}

function transformN(count, subject) {
  let val = 1;

  for (let i = 0; i < count; i++) {
    val = transformOnce(subject, val);
  }

  return val;
}

function breakKey(encrypted) {
  let val = 1;

  for (let i = 1; true; i++) {
    val = transformOnce(7, val);

    if (val === encrypted) {
      return i;
    }
  }
}

const data1Loopsize = breakKey(data[0])
const data2Loopsize = breakKey(data[1])

console.log(data1Loopsize, data2Loopsize);

const key1 = transformN(data1Loopsize, data[1])
const key2 = transformN(data2Loopsize, data[0])
console.log(key1, key2);
