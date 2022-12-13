const start = Date.now();
const example = `389125467`;
const data = `942387615`;

let cupData = data.split("").map(line => line.trim()).filter(l => l !== "").map(line => {
  return parseInt(line, 10);
});

const listPointers = new Array(1000000);

function makeLinkedList(cupData) {
  const cupLinkedList = { label: cupData[0] }
  listPointers[cupData[0]] = cupLinkedList;
  let lastLinkedCup = cupLinkedList;

  for (let i = 1; i < cupData.length; i++) {
    const newCup = { label: cupData[i] };
    listPointers[cupData[i]] = newCup;

    lastLinkedCup.next = newCup;
    lastLinkedCup = newCup;
  }

  for (let i = 10; i <= 1000000; i++) {
    const newCup = { label: i };
    listPointers[i] = newCup;

    lastLinkedCup.next = newCup;
    lastLinkedCup = newCup;
  }

  lastLinkedCup.next = cupLinkedList;
  return cupLinkedList
}

let linkedList = makeLinkedList(cupData);

const setupEnd = Date.now();

for (let i = 10000000; i > 0; i--) {
  // remove 3 cups
  const first = linkedList.next
  const second = first.next;
  const third = second.next;

  linkedList.next = third.next;

  // select destination cup
  let target = linkedList.label;
  let destination = false;
  do {
    target = target - 1;
    if (target === 0) {
      target = 1000000;
    }
  } while (target === first.label || target === second.label || target === third.label)
  destination = listPointers[target]

  // place cups
  third.next = destination.next;
  destination.next = first;
  linkedList = linkedList.next;
}

let cupOne = listPointers[1];
const end = Date.now();
const solution = cupOne.next.label * cupOne.next.next.label;
console.log(`Solved to get ${solution} in ${end - start}. Setup: ${setupEnd - start}ms Processing: ${end - setupEnd}`);
