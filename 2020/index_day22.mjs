import fs from "fs";

const example = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let [player1, player2] = data.split("\n\n").map(line => line.trim()).filter(l => l !== "").map(line => {
  return line.slice(10).split("\n").map(v => parseInt(v, 10));
});

console.log(player1, player2);

function play(player1Original, player2Original) {
  const player1 = JSON.parse(JSON.stringify(player1Original));
  const player2 = JSON.parse(JSON.stringify(player2Original));

  while (true) {
    if (player1.length < 1 || player2.length < 1) {
      break;
    }
    const card1 = player1.shift();
    const card2 = player2.shift();

    if (card1 > card2) {
      player1.push(card1);
      player1.push(card2);
    } else if (card2 > card1) {
      player2.push(card2);
      player2.push(card1);
    } else {
      throw new Error("wwtttt")
    }

  }
}



console.log(player1, player2);

console.log(player1.reduce((acc, card, index, cards) => acc + (card * (cards.length - index)), 0))
console.log(player2.reduce((acc, card, index, cards) => acc + (card * (cards.length - index)), 0))

console.log(player1.reduce((acc, card, index, cards) => {
  const mul = (cards.length - index);
  console.log(`+ ${card} * ${mul}`)
  return acc + (card * mul)
}, 0))
