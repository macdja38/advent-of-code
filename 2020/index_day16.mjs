import fs from "fs";

const example = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })

const [rules, yourTicket, tickets] = data.split("\n\n");

console.log(rules);

const ruleMap = rules.split("\n").map(r => r.split(": ")).reduce((acc, [name, rule]) => {
  acc[name] = rule.split(" or ").map(r => r.split("-").map(v => parseInt(v, 10)));
  return acc;
}, {});

console.log(ruleMap);

const nearbyTickets = tickets.trim().split("\n").slice(1);

const errors = [];

for (let ticket of nearbyTickets) {
  // console.log(ticket.split(",").map(v => parseInt(v, 10)));
  let fields = ticket.split(",").map(v => parseInt(v, 10));

  flabel: for (let field of fields) {

    for (let rule of Object.values(ruleMap)) {

      for (let iRule of rule) {
        if ((iRule[0] <= field && field <= iRule[1])) {
          continue flabel;
        }
      }

    }

    errors.push(field);
  }
}

// console.log(errors);

// console.log(errors.reduce((acc, n) => acc + n, 0));

// p2

const validTickets = [];

for (let ticket of nearbyTickets) {
  let fields = ticket.split(",").map(v => parseInt(v, 10));


  let match = 0;
  label: for (let field of fields) {

    for (let rule of Object.values(ruleMap)) {

      for (let iRule of rule) {
        if ((iRule[0] <= field && field <= iRule[1])) {
          match += 1;
          continue label;
        }
      }

    }
  }

  if (match === fields.length) {
    validTickets.push(ticket);
  }
}

console.log(validTickets.length, nearbyTickets.length);


let ruleFieldMap = {}

const parsedYourTicket = yourTicket.split("\n")[1];

console.log(parsedYourTicket)


const ruleMatches = Object.keys(ruleMap).reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {})

for (let [ruleName, ruleRanges] of Object.entries(ruleMap)) {


  v: for (let fieldIndex = 0; fieldIndex < parsedYourTicket.split(",").length; fieldIndex++) {

    for (let ticket of validTickets) {
      let field = ticket.split(",").map(v => parseInt(v, 10))[fieldIndex];
      // console.log(field);


        if (!(ruleRanges[0][0] <= field && field <= ruleRanges[0][1])) {
          if (!(ruleRanges[1][0] <= field && field <= ruleRanges[1][1])) {
            continue v;
          }
        }


    }

    // this rule matches the field.
    ruleMatches[ruleName].push(fieldIndex);
  }
}



console.log(ruleMatches);

const removed = new Set();

whil: while(true) {
  let least = Number.MAX_SAFE_INTEGER;
  let most = 0;
  let name = "";

  for (let [n, indexes] of Object.entries(ruleMatches)) {
    if (indexes.length < least && !removed.has(n)) {
      least = indexes.length;
      name = n;
    }
    if (indexes.length > most) {
      most = indexes.length;
    }
  }

  if (least > 1) {
    break;
  }

  removed.add(name);

  const indexToDrop = ruleMatches[name][0];

  console.log(least, indexToDrop);

  for (let [n, indexes] of Object.entries(ruleMatches)) {
    if (n !== name) {
      const i = indexes.indexOf(indexToDrop);
      console.log(i);
      if (i > -1) {
        indexes.splice(i, 1);
      }
    }
  }
}

const t = (parsedYourTicket.split(",").map(v => parseInt(v, 10)));


let end = 1;

for (let [n, indexes] of Object.entries(ruleMatches)) {
  if (n.startsWith("departure")) {
    end = end * t[indexes[0]]
  }

}



console.log(ruleMatches);
console.log(end);

// let lines = data.map(line => line.trim()).filter(line => line !== "");
