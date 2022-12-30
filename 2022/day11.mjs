import fs from "fs";

let file = fs.readFileSync("./2022/data.txt", { encoding: "utf8" });

let example = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

// file = example;


function cloneMonkeys(monkeys) {
    return monkeys.map(monkey => ({...monkey}))
}

const BigInt = (n) => n;


let data = file.split("\n\n").map(m => {
    try {
        let [_, monkeyIndex, rawItems, operation, testDivisibleBy, trueDestination, falseDestination] = /Monkey (\d+):\n\s*Starting items: ([,\s\d]+)\n\s*Operation: new = (.+)\n\s*Test: divisible by (\d+)\n\s*If true: throw to monkey (\d)\n\s*If false: throw to monkey (\d)/.exec(m)
        return {
            monkeyIndex: parseInt(monkeyIndex, 10),
            items: rawItems.split(", ").map(n => BigInt(parseInt(n, 10))),
            operation: operation.endsWith("old") ? eval(`old => ${operation}`) : eval(`old => ${operation}`),
            testDivisibleBy: BigInt(parseInt(testDivisibleBy, 10)),
            trueDestination: BigInt(parseInt(trueDestination, 10)),
            falseDestination: BigInt(parseInt(falseDestination, 10)),
            inspections: 0,
        }
    } catch (e) {
        console.error(e);
        console.log(m);
    }
});

for (let round = 1; round <= 20; round++) {
    console.log(round);
    for (let monkey of data) {
        for (let item of monkey.items) {
            let level = item;
            level = monkey.operation(level);
            level = Math.floor(level / 3);
            const testResult = (level % monkey.testDivisibleBy) === 0;
            if (testResult) {
                data[monkey.trueDestination].items.push(level);
            } else {
                data[monkey.falseDestination].items.push(level);
            }
            monkey.inspections = monkey.inspections + 1;
        }
        monkey.items = [];
    }
    console.log(data);
}

const clonedMonkeys = cloneMonkeys(data);

clonedMonkeys.sort((a, b) => b.inspections - a.inspections);

console.log(clonedMonkeys[0].inspections * clonedMonkeys[1].inspections);