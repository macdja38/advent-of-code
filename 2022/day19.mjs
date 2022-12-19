import fs from "fs";

let data = fs.readFileSync("./data2.txt", { encoding: "utf8" }).trim();

let example = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

// data = example;

function resourcesHasCostAvailable(resources, cost) {
  return Object.entries(cost).every(([resource, quantity]) => resources[resource] >= quantity)
}

function newResourcesLessCost(resources, cost) {
  return Object.fromEntries(Object.entries(resources).map(([resource, quantity]) => {
    if (cost.hasOwnProperty(resource)) {
      return [resource, quantity - cost[resource]];
    }
    return [resource, quantity];
  }));
}

function newResourcesPlusRobots(resources, robotBounty) {
  return {
    ore: resources["ore"] + robotBounty["ore"],
    clay: resources["clay"] + robotBounty["clay"],
    obsidian: resources["obsidian"] + robotBounty["obsidian"],
    geodes: resources["geodes"] + robotBounty["geodes"],
  };
}

// function newResourcesPlusRobots(resources, robots) {
//   return Object.fromEntries(Object.entries(resources).map(([resource, quantity]) => {
//     for (let robot of robots) {
//       if (robot.product.hasOwnProperty(resource)) {
//         quantity += robot.product[resource];
//       }
//     }
//     return [resource, quantity];
//   }));
// }

function solveBlueprint(oreRobotCost, clayRobotCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost) {

  let oreRobot = {
    cost: { ore: oreRobotCost },
    productName: "ore",
  }

  let clayRobot = {
    cost: { ore: clayRobotCost },
    productName: "clay",
  }

  let obsidianRobot = {
    cost: { ore: obsidianRobotOreCost, clay: obsidianRobotClayCost },
    productName: "obsidian",

  }

  let geodeRobot = {
    cost: { ore: geodeRobotOreCost, obsidian: geodeRobotObsidianCost },
    productName: "geodes",
  }

  let maxOreCost = Math.max(oreRobot.cost.ore, clayRobot.cost.ore, obsidianRobot.cost.ore, geodeRobot.cost.ore);
  let maxClayCost = Math.max(clayRobot.cost.clay, obsidianRobot.cost.clay);
  let maxObsidianCost = geodeRobot.obsidian;

  function orePerSecond(robots) {
    return robots.filter(robot => robot === oreRobot).length
  }

  function clayPerSecond(robots) {
    return robots.filter(robot => robot === clayRobot).length
  }

  function obsidianPerSecond(robots) {
    return robots.filter(robot => robot === obsidianRobot).length
  }

  let robotChoices = [oreRobot, clayRobot, obsidianRobot, geodeRobot];

  function makeChoice(minutes = 24, resources = { ore: 0, clay: 0, obsidian: 0, geodes: 0}, robotCollections = { ore: 1, clay: 0, obsidian: 0, geodes: 0}, saving = []) {
    if (minutes === 0) {
      return [resources.geodes, robotCollections];
    }
    let viableRobotChoices = robotChoices.filter(choice => {
      if (choice === clayRobot && robotCollections.clay >= maxClayCost) {
        return false
      }
      if (choice === oreRobot && robotCollections.ore >= maxOreCost) {
        return false
      }
      if (choice === obsidianRobot && robotCollections.obsidian >= maxObsidianCost) {
        return false
      }
      return resourcesHasCostAvailable(resources, choice.cost) && !saving.includes(choice);
    });
    if (minutes < 4) {
      viableRobotChoices = viableRobotChoices.filter(choice => choice !== oreRobot && choice !== clayRobot);
    }
    if (minutes === 1) {
      viableRobotChoices = [];
    }
    // if (viableRobotChoices.length > 1 && viableRobotChoices.includes(geodeRobot)) {
    //   viableRobotChoices = [geodeRobot];
    // }
    // if (viableRobotChoices.length > 1 && viableRobotChoices.includes(obsidianRobot)) {
    //   viableRobotChoices = [obsidianRobot];
    // }

    // viableRobotChoices.reverse();
    // viableRobotChoices = viableRobotChoices.slice(0, 2);

    let best = 0;

    for (let viableChoice of viableRobotChoices) {
      let newResources = newResourcesLessCost(resources, viableChoice.cost);
      newResources = newResourcesPlusRobots(newResources, robotCollections);
      let newRobots = { ...robotCollections };
      newRobots[viableChoice.productName] += 1;
      let newPotentialBest = makeChoice(minutes - 1, newResources, newRobots, []);
      if (newPotentialBest > best) {
        best = newPotentialBest;
      }
    }

    // if (!viableRobotChoices.includes(geodeRobot)) {
      let newResources = newResourcesPlusRobots(resources, robotCollections);
      let newPotentialBest = makeChoice(minutes - 1, newResources, robotCollections, viableRobotChoices);
      if (newPotentialBest > best) {
        best = newPotentialBest;
      }
    // }

    return best;
  }

  return makeChoice(32, { ore: 0, clay: 0, obsidian: 0, geodes: 0}, { ore: 1, clay: 0, obsidian: 0, geodes: 0} );
}

let blueprints = data.split("\n");

let total = 0;
let totalP2 = 1;

for (let blueprint of blueprints) {
  const [_, blueprintNumber, oreRobotCost, clayRobotCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost] = blueprint.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian/).map(v => parseInt(v, 10));


  let result = solveBlueprint(oreRobotCost, clayRobotCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost);
  total += blueprintNumber * result;
  totalP2 = totalP2 * result;
  console.log(result, blueprintNumber, blueprintNumber * result);
}

console.log("=========")
console.log(total);
console.log(totalP2);

// 10062 is too low
