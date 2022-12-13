import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" }).split("\n").map(line => line.trim()).filter(line => line !== "");

function simpleMath(text) {
  return simpleMathInner(text.split(" ").reverse().join(" "))
}

function simpleMathInner(text) {
  const terms = text.split(" * ");

  return terms.reduce((acc, term) => {
    if (term.indexOf(" ") === -1) {
      return acc * parseInt(term);
    }

    return acc * term.split(" + ").reduce((acc, number) => {
      return acc + parseInt(number, 10);
    }, 0)
  }, 1)
}

let sum = 0;ueaoueao

for (let line of data) {
  let past = line;
  while (true) {
    let newInter = past.replace(/\(([^()]*)\)/, (m, substring) => {
      return simpleMath(substring);
    })

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

  sum += parseInt(past, 10);
}

console.log(sum);
