import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" }).split("\n").map(line => line.trim()).filter(line => line !== "");
// data = ["5 + (8 * 3 + 9 + 3 * 4 * 3)"]


console.log(data);

function simpleMath(text) {
  return simpleMathInner(text.split(" ").reverse().join(" "))
}

function simpleMathInner(text) {
  const terms = text.split(" ");

  if (terms.length < 2) {
    return parseInt(terms[0], 10);
  }
  const op = terms[1];
  const num1 = parseInt(terms[0], 10);
  const rest = terms.slice(2).join(" ");

  if (op === "*") {
    return num1 * simpleMathInner(rest);
  } else {
    return num1 + simpleMathInner(rest);
  }
}

console.log(simpleMath("3 + 4"))

let sum = 0;

for (let line of data) {
  let past = line;
  while (true) {
    let newInter = past.replace(/\(([^()]*)\)/, (m, substring) => {
      return simpleMath(substring);
    })

    console.log(newInter, past);
    if (newInter.indexOf("(") === -1) {
      past = simpleMath(newInter);
      break;
    }

    if (newInter === past) {
      past = newInter;
      break;
    }
    past = newInter;
  }

  console.log(line, past);
  sum += parseInt(past, 10);
}

console.log(sum);
