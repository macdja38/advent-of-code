import fs from "fs";

const example = `
939
7,13,x,x,59,x,31,19`

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let [nowLine, bussesLine] = data.split("\n").map(line => line.trim()).filter(line => line !== "");

let now = parseInt(nowLine, null);
let busses = bussesLine.split(",").filter(bus => bus !== "x").map(bus => parseInt(bus, 10));

let offsets = {}

for (let bus of busses) {
  let time = 0;

  while (true) {
    if (time > now) {
      offsets[bus] = time - now;
      break;
    }
    time += bus;
  }
}

let fastest = [0, Number.MAX_SAFE_INTEGER]

for (let line of Object.entries(offsets)) {
  if (line[1] < fastest[1]) {
    fastest = line;
  }
}


let bussesWithX = bussesLine.split(",");

let bussesLength = BigInt(bussesWithX.length);

let bussesProcessed = [];

for (let i = 0; i < bussesWithX.length; i++) {
  if (bussesWithX[i] !== "x") {
    bussesProcessed.push([bussesWithX.length - i - 1, parseInt(bussesWithX[i], 10)])
  }
}

let sortedProcessedBusses = bussesProcessed.sort((a, b) => b[1] - a[1])

function gcd_rec(a, b) {
  if (b) {
    return gcd_rec(b, a % b);
  } else {
    return Math.abs(a);
  }
}

function mul_inv(a, b){

  var b0 = b;
  var x0 = 0;
  var x1 = 1;
  var q, tmp;
  if( b== 1){
    return 1;
  }
  while(a>1){
    q = parseInt(a/b);
    tmp = a;
    a = b;
    b = tmp%b;
    tmp = x0;
    x0 = x1 - (q * x0);
    x1 = tmp;
  }
  if(x1 <0){
    x1 = x1+b0;
  }
  return x1;
}

function chineseRemainder(a, n){
  var i = 1;
  var prod = 1;
  var p = i = prod = 1;
  var sm = 0;
  for(i=0; i< n.length; i++){
    prod = prod * n[i];
  }
  for(i=0; i< n.length; i++){
    p = prod / n[i];
    sm = sm + ( a[i] * mul_inv(p, n[i]) * p);
  }
  return sm % prod;
}


let GCD = gcd_rec(sortedProcessedBusses[0][1], sortedProcessedBusses[1][1])

console.log(GCD);

console.log(sortedProcessedBusses);

const a = sortedProcessedBusses.map(b => b[0]);
const n = sortedProcessedBusses.map(b => b[1])


console.log(chineseRemainder(a, n) - Math.max(...a));


function tryIt() {
  for (let i = 1n;; i++) {
    const start = BigInt(bussesWithX[0]) * i;

    for (let j = 1n; j < bussesLength; j++) {
      if (bussesWithX[j] !== "x") {
        let test = BigInt(bussesWithX[j]) * i;

        if (i === 1068788n) {
          console.log(true);
        }

        if (start !== test + j) {
          break;
        }
        if (j === (bussesLength - 1n)) {
          return i;
        }
      }
    }
  }
}

console.log(tryIt())
