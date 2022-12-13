import fs from "fs";

const example = `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim()).filter(line => line !== "");

const TYPE = {
  MASK: 0,
  SET: 1,
}

const instructions = [];

for (let line of lines) {
  if (line.startsWith("mask")) {
    instructions.push({type: TYPE.MASK, value: line.split("=")[1].slice(1) })
  }
  if (line.startsWith("mem")) {
    const [a, b] = line.split("=");
    const address = parseInt(a.slice(4).split("]")[0], 10);
    const v = parseInt(b.slice(1), 10).toString(2);
    instructions.push({type: TYPE.SET, address, value: v });
  }
}

const memory = [];

function applyMask(mask, value) {
  let v = value.padStart(mask.length, "0").split("");

  for (let i = 0; i < mask.length; i++) {
    switch(mask[i]) {
      case "0":
        v[i] = "0"
        break;
      case "1":
        v[i] = "1"
        break;
      case "X":
    }
  }

  console.log(mask, value, v.join(""));

  return v.join("")
}

console.log(instructions)

let mask = "";

for (let instruction of instructions) {

  switch (instruction.type) {
    case TYPE.MASK:
      mask = instruction.value;
      break;
    case TYPE.SET:
      const newVal = applyMask(mask, instruction.value);

      memory[instruction.address] = newVal
  }
}

let acc = 0;
for (let v of Object.values(memory)) {
  console.log(v);
  console.log(parseInt(v, 2));
  acc += parseInt(v, 2);
}

console.log(memory);
console.log(acc);
