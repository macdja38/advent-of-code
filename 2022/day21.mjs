import fs from "fs";
import Equation from "equations";

let data = fs.readFileSync("./data.txt", {encoding: "utf8"}).trim();

let example = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

// data = example;

let monkeys = [...data.matchAll(/(\w+): (?:(?:(\d+))|(?:(\w+) ([+-\/*]) (\w+)))/g)].reduce((acc, [_, monkey, number, dep1, operation, dep2]) => {
    let monkeyObject = {
        name: monkey,
    }

    if (operation) {
        monkeyObject.dependencyStrings = [dep1, dep2];
        monkeyObject.operation = operation;
    } else {
        monkeyObject.value = parseInt(number, 10);
    }

    acc[monkey] = monkeyObject

    return acc
}, {})

for (let monkey of Object.values(monkeys)) {
    if (monkey.hasOwnProperty("dependencyStrings")) {
        monkey.dependencies = monkey.dependencyStrings.map(name => monkeys[name]);
    }
}

function sumMonkey(monkey) {
    if (monkey.hasOwnProperty("value")) {
        return monkey.value;
    }
    return fastMath(monkey.operation, sumMonkey(monkey.dependencies[0]), sumMonkey(monkey.dependencies[1]));
}

console.log(sumMonkey(monkeys["root"]))

function fastMath(operation, v1, v2) {
    switch (operation) {
        case "*":
            return v1 * v2;
        case "+":
            return v1 + v2;
        case "-":
            return v1 - v2;
        case "/":
            return v1 / v2;
    }
}

const cache = new Map();

function makeOperation(operation, s1, s2) {
    return {
        side1: s1,
        operation,
        side2: s2,
    }
}

const humnOperation = { name: "humn" };

function sumMonkeyP2(monkey, humnValue) {
    if (monkey.name === "humn" && humnValue) {
        return {value: humnValue, taint: true, str: "humn", operation: humnOperation};
    }
    const cacheMonkey = cache.get(monkey);
    if (cacheMonkey !== undefined) {
        return {value: cacheMonkey, taint: false, str: cacheMonkey, operation: {value: cacheMonkey}};
    }
    if (monkey.value !== undefined) {
        cache.set(monkey, monkey.value);
        return {value: monkey.value, taint: false, str: monkey.value, operation: {value: monkey.value}};
    }
    let monkey1 = cache.get(monkey.dependencies[0]);
    let taint1 = false;
    let str1 = monkey1;
    let o1 = {value: monkey1};
    if (monkey1 === undefined) {
        ({value: monkey1, taint: taint1, str: str1, operation: o1} = sumMonkeyP2(monkey.dependencies[0], humnValue));
    }
    let monkey2 = cache.get(monkey.dependencies[1]);
    let taint2 = false;
    let str2 = monkey2
    let o2 = {value: monkey2};
    if (monkey2 === undefined) {
        ({value: monkey2, taint: taint2, str: str2, operation: o2} = sumMonkeyP2(monkey.dependencies[1], humnValue));
    }

    let result = fastMath(monkey.operation, monkey1, monkey2);
    let taint = taint1 || taint2;
    if (!taint) {
        cache.set(monkey, result);
        return {value: result, taint: false, str: result, operation: {value: result}}
    }
    return {
        value: result,
        taint,
        str: `(${str1} ${monkey.operation} ${str2})`,
        operation: makeOperation(monkey.operation, o1, o2)
    };
}


function part2Root() {
    let root = monkeys["root"]
    const m1 = sumMonkeyP2(root.dependencies[0], 1);
    const m2 = sumMonkeyP2(root.dependencies[1], 1);
    const equation = `${m1.str} = ${m2.str}`;
    console.log(equation);
    let operationalSide = m1.operation;
    let other = m2.operation.value;


    while (true) {
        if (operationalSide === humnOperation) {
            break;
        }
        if (operationalSide.side1.value) {
            // a constant is in the first spot, the rest is on the other
            switch (operationalSide.operation) {
                case "*":
                    other = other / operationalSide.side1.value;
                    operationalSide = operationalSide.side2;
                    break;
                case "/":
                    other = operationalSide.side1.value / other;
                    operationalSide = operationalSide.side2;
                    break;
                case "+":
                    other = other - operationalSide.side1.value;
                    operationalSide = operationalSide.side2;
                    break;
                case "-":
                    other = (other - operationalSide.side1.value) * -1
                    operationalSide = operationalSide.side2;
                    break;
            }
        } else if (operationalSide.side2.value) {
            // a constant is in the first spot, the rest is on the other
            switch (operationalSide.operation) {
                case "*":
                    other = other / operationalSide.side2.value;
                    operationalSide = operationalSide.side1;
                    break;
                case "/":
                    other = other * operationalSide.side2.value;
                    operationalSide = operationalSide.side1;
                    break;
                case "+":
                    other = other - operationalSide.side2.value;
                    operationalSide = operationalSide.side1;
                    break;
                case "-":
                    other = other + operationalSide.side2.value;
                    operationalSide = operationalSide.side1;
                    break;
            }
        }
    }
    console.log(`${operationalSide.name} = ${other}`);
    return other;
}

console.log(part2Root());
