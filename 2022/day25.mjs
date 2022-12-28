import fs from "fs";

let data = fs.readFileSync("./data.txt", {encoding: "utf8"}).trim();

let example = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

// data = example;

const fromSnafuMap = {
    '2': 2,
    '1': 1,
    '0': 0,
    '-': -1,
    '=': -2,
}

function fromSnafu(number) {
    const numberString = number.toString();
    const numberLength = number.toString().length;
    return numberString.split("").reduce((acc, digit, index) => {
        const fromStart = numberLength - index - 1;

        console.log(fromStart);

        return acc + ((5 ** fromStart) * fromSnafuMap[digit]);
    }, 0)
}

console.log(fromSnafu("1121-1110-1=0"));

const result = data.split("\n").reduce((acc, line) => acc + fromSnafu(line), 0)

console.log(result);

const mapToSnafu = {
    '2': '2',
    '1': '1',
    '0': '0',
    '-1': '-',
    '-2': '=',
}

function toSnafu(number) {
    let base5Number = number.toString(5).split("");
    let appendToStart = "";

    for (let i = base5Number.length - 1; i >= 0; i--) {
        let digit = parseInt(base5Number[i]);
        if (digit > 2) {
            if (i > 0) {
                base5Number[i - 1] = parseInt(base5Number[i - 1], 5) + 1
            } else {
                appendToStart = "1";
            }
            digit = digit - 5;
        }
        base5Number[i] = mapToSnafu[digit];

    }

    return `${appendToStart}${base5Number.join("")}`;
}

console.log(toSnafu(result))
