import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" }).trim();

let example = `1
2
-3
3
-2
0
4`;

// data = example;

let decryptionKey = 811589153

let numbers = data.split("\n").map(n => parseInt(n, 10) * decryptionKey);

let linkedListStart;
let previousLinkedListValue;

for (let number of numbers) {
    if (!linkedListStart) {
        let node = {
            value: number,
        }
        linkedListStart = node;
        previousLinkedListValue = node;
    } else {
        let node = {
            value: number,
            prev: previousLinkedListValue,
        }
        previousLinkedListValue.next = node;
        previousLinkedListValue = node;
    }
}

previousLinkedListValue.next = linkedListStart;
linkedListStart.prev = previousLinkedListValue;

let zeroPointer;
let arrayOfOriginalOrderNodes = new Array(numbers.length);

{
    let pointer = linkedListStart;
    let i = 0;
    for (let number of numbers) {
        arrayOfOriginalOrderNodes[i] = pointer;
        if (pointer.value === 0) {
            zeroPointer = pointer;
        }
        pointer = pointer.next;
        i++;
    }
}

validate();

const lengthOfNumbers = numbers.length;

for (let i = 0; i < 10; i++) {
    for (let node of arrayOfOriginalOrderNodes) {
        // console.log(node);
        let direction = node.value > 0 ? "next" : "prev";
        let abs = Math.abs(node.value);

        // remove this node from the linked list
        let next = node.next;
        let prev = node.prev;
        prev.next = next;
        next.prev = prev;

        let pointer = node.prev;
        let moveBy = (direction === "next" ? abs : abs) % (lengthOfNumbers - 1);
        for (let i = 0; i < moveBy; i++) {
            pointer = pointer[direction];
        }

        // insert the new node
        next = pointer.next;
        prev = pointer;

        prev.next = node;
        next.prev = node;

        node.prev = prev;
        node.next = next;
    }
}


function print() {
    let str = [];
    let start = linkedListStart;
    let pointer = linkedListStart;
    let i = 0;
    while(true) {
        i++;
        if (i > 20) {
            break;
        }
        str.push(pointer.value);
        pointer = pointer.next;
        if (pointer === start) {
            break;
        }
    }

    console.log(str.join(", "));
}

{
    let pointer = zeroPointer;
    let oneThousand;
    let twoThousand;
    let threeThousand;
    for (let i = 1; i <= 3001; i++) {
        pointer = pointer.next;
        if (i === (1000)) {
            oneThousand = pointer;
        }
        if (i === (2000)) {
            twoThousand = pointer;
        }
        if (i === (3000)) {
            threeThousand = pointer;
        }
    }

    console.log(oneThousand.value, twoThousand.value, threeThousand.value);
    console.log(oneThousand.value + twoThousand.value + threeThousand.value);
}

function validate() {
    let set = new Set();
    let pointer = linkedListStart;
    let i = 1;
    while(true) {
        pointer = pointer.next;
        if (pointer === linkedListStart) {
            break;
        }
        i = i + 1
        set.add(pointer);
    }
    set = new Set();
    pointer = linkedListStart;
    i = 1;
    while(true) {
        pointer = pointer.prev;
        if (pointer === linkedListStart) {
            break;
        }
        i = i + 1
    }
    console.log(i);
}

validate();

// too high 23799851911725
// too low   9890025418458
