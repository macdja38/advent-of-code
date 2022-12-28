import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

let example = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

let valves = [...data.matchAll(/Valve (.+) has flow rate=(\d+); tunnels? leads? to valves? (.*)/g)].map(([_, v, r, t]) => {
  return {
    name: v,
    r: parseInt(r, 10),
    linkNames: t.split(", "),
    links: [],
  };

})

console.log(valves);

let nodes = {};

valves.forEach(v => {
  nodes[v.name] = v;
});

console.log(nodes);

valves.forEach(v => {
  nodes[v.name].links = v.linkNames.map((link) => {
    console.log(nodes[link])
    return ({ link: nodes[link], length: 1 })
  })
})

console.log("==============2 = ==========")
console.log(nodes);

for (let i = 0; i < 100; i++) {
  for (let v of valves) {
    if (v !== undefined) {
      if (v.name !== "AA" && v.r === 0 && v.links.length === 2) {
        console.log("Dropping ", v.name);
        const { link: link1, length: length1 } = v.links[0];
        const { link: link2, length: length2 } = v.links[1];
        link1.links[link1.links.findIndex(({ link }) => link === v)] = {
          link: link2,
          length: length1 + length2,
        };
        link2.links[link2.links.findIndex(({ link }) => link === v)] = {
          link: link1,
          length: length1 + length2,
        };
        console.log(link1.name, link1.links);
        console.log(link2.name, link2.links);
        delete valves[valves.indexOf(v)];
        delete nodes[v.name];
        break;
      }
    }
  }
}

console.log(nodes);
console.log("Left", Object.keys(nodes).length)

let globalBest = 0;

function depthFirstSearch(minutes = 30, node = nodes["AA"], valvesOpened = new Set(), points = 0) {
  if (minutes <= 0) {
    return points;
  }
  let canOpenThisValve = !valvesOpened.has(node) && node.r > 0;

  let bestPoints = 0;
  if (canOpenThisValve) {
    const thisChoice = depthFirstSearch(minutes - 1, node, new Set([...valvesOpened, node]), points + (minutes - 1) * node.r)
    if (thisChoice > bestPoints) {
      bestPoints = thisChoice;
    }

  }
  for (let { link, length } of node.links) {
    const thisChoice = depthFirstSearch(minutes - length, link, valvesOpened, points)
    if (thisChoice > bestPoints) {
      bestPoints = thisChoice;
    }
  }
  if (bestPoints > globalBest) {
    globalBest = bestPoints;
    console.log(bestPoints);
  }
  return bestPoints;
}

// console.log(depthFirstSearch(30, nodes["AA"], new Set(), 0))
// 1694 is too low
// 2000 too high
// 1754 correct

const openableValves = Object.values(nodes).filter(node => node.r > 0).length;

let globalBest2 = 0;

console.log("openable valves", openableValves);

function depthFirstSearch2(minutes = 26, humanNode = nodes["AA"], elephantNode = nodes["AA"], humanPausedMinutes = 0, elephantPausedMinutes = 0, valvesOpened = new Set(), points = 0) {
  if (valvesOpened.size === openableValves) {
    return points;
  }
  if (minutes <= 0) {
    return points;
  }
  let humanCanOpenThisValve = !valvesOpened.has(humanNode) && humanNode.r > 0 && humanPausedMinutes <= 0;
  let elephantCanOpenThisValve = !valvesOpened.has(elephantNode) && elephantNode.r > 0 && elephantPausedMinutes <= 0 && !(humanCanOpenThisValve && elephantNode === humanNode);

  let humanActions = [];
  let elephantActions = [];

  if (humanPausedMinutes <= 0) {

    if (humanCanOpenThisValve) {
      humanActions.push({
        pointsOperation: (points) => points + (minutes - 1) * humanNode.r,
        freezeOperation: _ => 0,
        newNode: humanNode,
        valvesOperation: v => new Set([...v, elephantNode]),
      });
    }
    for (let { link, length } of humanNode.links) {
      humanActions.push({
        pointsOperation: (points) => points,
        freezeOperation: (freeze) => length - 1,
        newNode: link,
        valvesOperation: _ => _,
      })
    }
  } else {
    humanActions.push({
      pointsOperation: (points) => points,
      newNode: humanNode,
      freezeOperation: freeze => freeze - 1,
      valvesOperation: _ => _,
    })
  }
  if (elephantPausedMinutes <= 0) {
    if (elephantCanOpenThisValve) {
      elephantActions.push({
        pointsOperation: (points) => points + (minutes - 1) * elephantNode.r,
        freezeOperation: _ => 0,
        newNode: elephantNode,
        valvesOperation: v => new Set([...v, elephantNode]),
      });
    }
    for (let { link, length } of elephantNode.links) {
      elephantActions.push({
        pointsOperation: (points) => points,
        freezeOperation: _ => length - 1,
        newNode: link,
        valvesOperation: _ => _,
      })
    }
  } else {
    elephantActions.push({
      pointsOperation: (points) => points,
      newNode: elephantNode,
      freezeOperation: freeze => freeze - 1,
      valvesOperation: _ => _,
    })
  }

  let bestPoints = 0;

  for (let humanAction of humanActions) {
    for (let elephantAction of elephantActions) {
      if (minutes === 26) {
        console.log(`Branch explored ${humanActions.indexOf(humanAction)}/${humanActions.length}, ${elephantActions.indexOf(elephantAction)}/${elephantActions.length}`)
      }
      if (minutes === 25) {
        console.log(`    Sub Branch explored ${humanActions.indexOf(humanAction)}/${humanActions.length}, ${elephantActions.indexOf(elephantAction)}/${elephantActions.length}`)
      }
      if (minutes === 24) {
        console.log(`    Sub Branch explored ${humanActions.indexOf(humanAction)}/${humanActions.length}, ${elephantActions.indexOf(elephantAction)}/${elephantActions.length}`)
      }
      const thisChoice = depthFirstSearch2(minutes - 1,
        humanAction.newNode,
        elephantAction.newNode,
        humanAction.freezeOperation(humanPausedMinutes),
        elephantAction.freezeOperation(elephantPausedMinutes),
        humanAction.valvesOperation(elephantAction.valvesOperation(valvesOpened)),
        humanAction.pointsOperation(elephantAction.pointsOperation(points)))

      if (thisChoice > bestPoints) {
        bestPoints = thisChoice;
      }
    }
  }
  if (bestPoints > globalBest2) {
    globalBest2 = bestPoints;
    console.log(bestPoints);
  }
  return bestPoints;
}

console.log(depthFirstSearch2(26, nodes["AA"], nodes["AA"], 0, 0, new Set(), 0))
// 1694 too low
// 2000 too low
// 3000 too high
// 2735 incorrect
// 2878 incorrect
// 2989 incorrect

// random guesses
// 2995 incorrect
