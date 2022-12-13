import fs from "fs";

const example = `389125467`;

const data = `942387615`;

let cupData = data.split("").map(line => line.trim()).filter(l => l !== "").map(line => {
  return parseInt(line, 10);
});

function makeLinkedList(cupData) {
  const cupLinkedList = { label: cupData[0] }
  let lastLinkedCup = cupLinkedList;

  for (let i = 1; i < cupData.length; i++) {
    const newCup = { label: cupData[i] };

    lastLinkedCup.next = newCup;
    newCup.last = lastLinkedCup;
    lastLinkedCup = newCup;
  }

  lastLinkedCup.next = cupLinkedList;
  cupLinkedList.last = lastLinkedCup;
  return cupLinkedList
}

let linkedList = makeLinkedList(cupData);

console.log(linkedList);

function findDestinationWrapper(linkedList, target) {
  return findDestination(linkedList.next, linkedList.label, target)
}

function findDestination(linkedList, starting, target) {
  if (linkedList.label === target) {
    return linkedList;
  } else {
    if (linkedList.label === starting) {
      return false;
    }
    return findDestination(linkedList.next, starting, target);
  }
}

for (let i = 0; i < 100; i++) {

  // remove 3 cups
  const first = linkedList.next
  const second = linkedList.next.next;
  const third = linkedList.next.next.next;

  linkedList.next = third.next;
  third.next.last = linkedList;

  // select destination cup
  let target = linkedList.label;
  let destination = false;
  do {
    target = target - 1;
    if (target === 0) {
      target = 9;
    }
    destination = findDestinationWrapper(linkedList, target)
  } while (destination === false)

  // place cups
  destination.next.last = third;
  third.next = destination.next;

  destination.next = first;
  first.last = destination

  linkedList = linkedList.next;
}

// count cups
const cupLabelledOne = findDestinationWrapper(linkedList, 1);
console.log("one", cupLabelledOne);

function collectCups(cupOne) {
  if (cupOne.label === 1) {
    return "";
  }
  return cupOne.label + collectCups(cupOne.next);
}

console.log(collectCups(cupLabelledOne.next));
