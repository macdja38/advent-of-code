import fs from "fs";
import jsnx from "jsnetworkx";

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

// data = example;

let valves = [...data.matchAll(/Valve (.+) has flow rate=(\d+); tunnels? leads? to valves? (.*)/g)].map(([_, v, r, t]) => {
  return {
    name: v,
    r: parseInt(r, 10),
    linkNames: t.split(", "),
    links: [],
    toString: () => v,
  };

})

const G = new jsnx.Graph();

G.addNodesFrom(valves);

let nodes = {};

valves.forEach(v => {
  nodes[v.name] = v;
});

valves.forEach(v => {
  nodes[v.name].links = v.linkNames.map((link) => {
    G.addEdge(v, nodes[link]);

    return ({ link: nodes[link] })
  })
})

const openableValves = new Set(Object.values(nodes).filter(node => node.r > 0));

const nodesWorthExistingAt = [...openableValves, nodes["AA"]];

// { from: { to: [] } }
const paths = {};

for (let from of nodesWorthExistingAt) {
  let toPaths = {};
  for (let to of nodesWorthExistingAt) {
    if (from === to) continue;

    let path = jsnx.shortestPath(G, {source: from, target: to})
    toPaths[to.name] = path.slice(1);
  }
  paths[from.name] = toPaths;
}


let globalBest2 = 0;

function depthFirstSearch2(minutes = 26, humanNode = nodes["AA"], elephantNode = nodes["AA"], humanQueue = [], elephantQueue = [], remainingValves = new Set(), points = 0) {
  if (remainingValves.size === 0) {
    return points;
  }
  if (minutes <= 0) {
    return points;
  }

  let possibleHumanQueues = humanQueue.length > 0 ? [humanQueue] : [];
  let possibleElephantQueues = elephantQueue.length > 0 ? [elephantQueue] : [];

  if (possibleHumanQueues.length <= 0) {
    for (let valve of remainingValves) {
      let path = paths[humanNode.name][valve.name];
      let queue = [...path.map(n => ({
        action: "move",
        newNode: nodes[n],
      })), {
        action: "open",
        newNode: valve,
      }];
      possibleHumanQueues.push(queue);
    }
  }
  if (possibleElephantQueues.length <= 0) {
    for (let valve of remainingValves) {
      let path = paths[elephantNode.name][valve.name];
      let queue = [...path.map(n => ({
        action: "move",
        newNode: nodes[n],
      })), {
        action: "open",
        newNode: valve,
      }];
      possibleElephantQueues.push(queue);
    }
  }


  let bestPoints = 0;

  for (let humanQueue of possibleHumanQueues) {
    for (let elephantQueue of possibleElephantQueues) {
      if (minutes === 26) {
        console.log(`Branch explored ${possibleHumanQueues.indexOf(humanQueue)}/${possibleHumanQueues.length}, ${possibleElephantQueues.indexOf(elephantQueue)}/${possibleElephantQueues.length}`)
      }
      if (minutes === 25) {
        console.log(`    Sub Branch explored ${possibleHumanQueues.indexOf(humanQueue)}/${possibleHumanQueues.length}, ${possibleElephantQueues.indexOf(elephantQueue)}/${possibleElephantQueues.length}`)
      }
      if (minutes === 24) {
        console.log(`    Sub Sub Branch explored ${possibleHumanQueues.indexOf(humanQueue)}/${possibleHumanQueues.length}, ${possibleElephantQueues.indexOf(elephantQueue)}/${possibleElephantQueues.length}`)
      }
      const humanTarget = humanQueue[humanQueue.length - 1].newNode;
      const elephantTarget = elephantQueue[elephantQueue.length - 1].newNode;


      // if (humanTarget === elephantTarget) {
      //   if (humanQueue.length <= elephantQueue.length) {
      //     // human will get there before the elephant, no reason to bother sending the elephant down this path
      //     continue;
      //   }
      // }

      let humanAction = humanQueue[0];
      let elephantAction = elephantQueue[0];

      let newRemainingValves = new Set([...remainingValves]);
      let newPoints = points;

      if (humanAction.action === "open") {
        const valveWasClosed = newRemainingValves.delete(humanAction.newNode);
        if (!valveWasClosed) {
          if (points > bestPoints) {
            bestPoints = points;
          }
          continue;
        } else {
          newPoints = newPoints + (minutes - 1) * nodes[humanAction.newNode].r
        }
      }

      if (elephantAction.action === "open") {
        const valveWasClosed = newRemainingValves.delete(elephantAction.newNode);
        if (!valveWasClosed) {
          if (points > bestPoints) {
            bestPoints = points;
          }
          continue;
        } else {
          newPoints = newPoints + (minutes - 1) * nodes[elephantAction.newNode].r
        }
      }

      const thisChoice = depthFirstSearch2(minutes - 1,
        humanAction.newNode,
        elephantAction.newNode,
        humanQueue.slice(1),
        elephantQueue.slice(1),
        newRemainingValves,
        newPoints
      )

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

console.log(depthFirstSearch2(26, nodes["AA"], nodes["AA"], [], [], openableValves, 0))
// 1694 too low
// 2000 too low
// 3000 too high
// 2735 incorrect
// 2878 incorrect
// 2989 incorrect

// random guesses
// 2995 incorrect
