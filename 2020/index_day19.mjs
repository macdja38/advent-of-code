import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let [ruleString, dataString] = data.split("\n\n").map(line => line.trim()).filter(line => line !== "");

let rawRules = ruleString.split("\n");

const ruleMap = {};

const RULE_TYPES = {
  OR: 0,
  FOLLOW: 1,
  BASE: 2,
}

/*
 * Turn all the rules into a map of rule# -> { type: keyof RULE_TYPES, v: "a" | string[] }
 */

for (let rule of rawRules) {
  const [key, ruleBody] = rule.split(": ");

  if (rule.indexOf("|") > -1) {
    const halves = ruleBody.split(" | ").map(l => l.split(" "));
    ruleMap[key] = { type: RULE_TYPES.OR, v: halves };
  } else if (rule.indexOf("\"") > - 1) {
    ruleMap[key] = { type: RULE_TYPES.BASE, v: ruleBody.slice(1, ruleBody.length - 1) };
  } else {
    ruleMap[key] = { type: RULE_TYPES.FOLLOW, v: ruleBody.split(" ") };
  }
}

/**
 * Create a regex from a starting key
 * @param {string} key the key to start with, in advent of code that's zero
 * @returns {RegExp}
 */
function createRegex(key) {
  return new RegExp(`^${createRegexInner(key)}$`);
}

function createRegexInner(key, elevenDepth = 0, eightDepth = 0) {
  let rule = ruleMap[key];

  if (key === "11") {
    elevenDepth = elevenDepth + 1;

    if (elevenDepth > 10) {
      rule = { type: RULE_TYPES.FOLLOW, v: [ "42", "31" ] } // only the non self containing side
    }
  }

  if (key === "8") {
    eightDepth = eightDepth + 1;

    if (eightDepth > 10) {
      rule = { type: RULE_TYPES.FOLLOW, v: [ "42" ] } // only the non self containing side
    }
  }

  if (rule.type === RULE_TYPES.BASE) {
    return rule.v;
  }
  if (rule.type === RULE_TYPES.FOLLOW) {
    const m = rule.v.map(k => createRegexInner(k, elevenDepth, eightDepth)).join("")
    return `${m}`
  }
  if (rule.type === RULE_TYPES.OR) {
    const left = rule.v[0].map(k => createRegexInner(k, elevenDepth, eightDepth)).join("");
    const right = rule.v[1].map(k => createRegexInner(k, elevenDepth, eightDepth)).join("");

    return `(?:${left}|${right})`;
  }
}

// create our regex
const reg = createRegex("0");

// write it to a file to laugh at later
fs.writeFileSync("./testRegex.txt", reg.toString())

// turn our input into lines
const dataLines = dataString.split("\n").map(v => v.trim());

// filter the lines
const valid = dataLines.filter(line => reg.test(line));

// output
console.log(dataLines.length);
console.log(valid.length);
