const start = Date.now();

import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let flips = data.split("\n").map(line => line.trim()).filter(l => l !== "");

const tiles = {};

const directions = ["e", "se", "sw", "w", "nw", "ne"]
const scales = { "e": "w", "ne": "sw", "se": "nw" }
const TV = {
  WHITE: 0,
  BLACK: 1,
}

function reduce6dirDirection(directionTotals) {
  const finalDirs = Object.keys(scales).reduce((obj, dir) => {
    obj[dir] = 0;
    return obj;
  }, {})

  for (let [scale, antiScale] of Object.entries(scales)) {
    finalDirs[scale] = directionTotals[scale] - directionTotals[antiScale];
  }

  while(true) {
    if (finalDirs["e"] > 0) {
      finalDirs["e"] = finalDirs["e"] - 1;
      finalDirs["ne"] = finalDirs["ne"] + 1;
      finalDirs["se"] = finalDirs["se"] + 1;
    } else if (finalDirs["ne"] < 0) {
      finalDirs["e"] = finalDirs["e"] - 1;
      finalDirs["ne"] = finalDirs["ne"] + 1;
      finalDirs["se"] = finalDirs["se"] + 1;
    } else if (finalDirs["se"] < 0) {
      finalDirs["e"] = finalDirs["e"] - 1;
      finalDirs["ne"] = finalDirs["ne"] + 1;
      finalDirs["se"] = finalDirs["se"] + 1;
    } else if (finalDirs["ne"] > 0 && finalDirs["se"] > 0 && finalDirs["e"] < 0) {
      finalDirs["e"] = finalDirs["e"] + 1;
      finalDirs["ne"] = finalDirs["ne"] - 1;
      finalDirs["se"] = finalDirs["se"] - 1;
    } else {
      break;
    }
  }

  return finalDirs;
}

function blank() {
  return directions.reduce((obj, dir) => {
    obj[dir] = 0;
    return obj;
  }, {})
}

function stringifyKey(finalDirs) {
  return `{${Object.keys(scales).map((key) => `"${key}":${finalDirs[key]}`).join(",")}}`;
}

for (let flip of flips) {

  const directionTotals = blank();

  while (flip.length > 0) {
    for (let dir of directions) {
      if (flip.startsWith(dir)) {
        flip = flip.slice(dir.length);
        directionTotals[dir] = directionTotals[dir] + 1;
      }
    }
  }

  const finalDirs = reduce6dirDirection(directionTotals);

  const key = stringifyKey(finalDirs);

  const tileValue = tiles[key];

  if (tileValue === TV.WHITE || tileValue === undefined) {
    tiles[key] = TV.BLACK;
  } else {
    delete tiles[key];
  }
}

const black = Object.values(tiles).reduce((acc, tile) => acc + tile, 0);
console.log("part 1", black);

let roundTiles = tiles;

function locationsAround(allTiles, locationRaw) {
  let location = JSON.parse(locationRaw);

  return directions.map((dir) => {
    let currentDirValueRaw = location[dir];
    if (currentDirValueRaw === undefined) {
      currentDirValueRaw = 0;
    }
    currentDirValueRaw += 1;

    const rawGeneratedLocation = Object.assign(blank(), location, { [dir]: currentDirValueRaw });
    const probeLocation = reduce6dirDirection(rawGeneratedLocation);
    return stringifyKey(probeLocation)
  }, 0)
}

for (let i = 0; i < 100; i++) {
  let roundTilesStart = roundTiles;
  roundTiles = JSON.parse(JSON.stringify(roundTilesStart));

  const blackTileLocations = Object.entries(roundTilesStart).filter(([key, value]) => value === TV.BLACK).map(([key, value]) => key);

  const allLocationsAround = blackTileLocations.map(location => locationsAround(roundTilesStart, location)).flat();

  const tileLocationSet = new Set([...blackTileLocations, ...allLocationsAround]);

  const allTiles = Array.from(tileLocationSet).map((location) => {
    let tile = roundTilesStart[location];
    if (tile === undefined) {
      tile = TV.WHITE;
    }
    return [location, tile];
  })

  for (let [locationRaw, tile] of allTiles) {
    let location = JSON.parse(locationRaw);

    const blackTilesAround = directions.reduce((acc, dir) => {
      let currentDirValueRaw = location[dir];
      if (currentDirValueRaw === undefined) {
        currentDirValueRaw = 0;
      }
      currentDirValueRaw += 1;

      const rawGeneratedLocation = Object.assign(blank(), location, { [dir]: currentDirValueRaw });
      const probeLocation = reduce6dirDirection(rawGeneratedLocation);
      // console.log(rawGeneratedLocation, probeLocation);

      const probeValue = roundTilesStart[stringifyKey(probeLocation)]

      if (probeValue === TV.BLACK) {
        return acc + 1
      }
      return acc;
    }, 0)

    // more than two flip to white if black
    if (tile === TV.WHITE || tile === undefined) {
      if (blackTilesAround === 2) {
        roundTiles[locationRaw] = TV.BLACK
      }
    } else {
      if (blackTilesAround === 0 || blackTilesAround > 2) {
        delete roundTiles[locationRaw];
      }
    }
  }
}

const black2 = Object.values(roundTiles).reduce((acc, tile) => acc + tile, 0);

console.log(`In ${Date.now() - start}ms`)

console.log("part 2", black2);
