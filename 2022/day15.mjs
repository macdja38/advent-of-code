import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

let example = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

let probeRow = 2000000;

// data = example;
// probeRow = 9;

function manhattenDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

let sensors = [...data.matchAll(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/g)].map(([_, sx, sy, bx, by]) => ({
  sx: parseInt(sx, 10),
  sy: parseInt(sy, 10),
  bx: parseInt(bx, 10),
  by: parseInt(by, 10),
}));

sensors = sensors.map(sensor => ({
  ...sensor,
  visibleDistance: manhattenDistance(sensor.sx, sensor.sy, sensor.bx, sensor.by),
}))

console.log(sensors);

let checked = 0;

cellLoop: for (let x = -5000000; x <= 5828004; x++) {
  let y = probeRow;

  for (let sensor of sensors) {
    if (x === sensor.bx && y === sensor.by) {
      continue cellLoop;
    }
  }
  for (let sensor of sensors) {
    let distanceFromSensor = manhattenDistance(x, y, sensor.sx, sensor.sy);
    if (distanceFromSensor <= sensor.visibleDistance) {
      // console.log(x);
      checked += 1;
      continue cellLoop;
    }
  }
}


console.log("==========================")
console.log(checked);
// 4767178

const probeDistance = 1000;
const halfProbeDistance = 500 + 2;
const probeLength = Math.ceil(Math.sqrt(2 * probeDistance ** 2)) + 10;
console.log(probeLength)

outer: for (let x = 0; x <= 4000000; x += probeDistance) {
  // console.log(x);
  cellLoop2: for (let y = 0; y <= 4000000; y += probeDistance) {

    for (let sensor of sensors) {
      let distanceFromSensor = manhattenDistance(x, y, sensor.sx, sensor.sy);
      if (distanceFromSensor <= (sensor.visibleDistance - probeLength)) {
        continue cellLoop2;
      }
    }
    console.log(x, y);
    for (let xi = x - halfProbeDistance; xi <= (x + halfProbeDistance); xi++) {
      cellLoop: for (let yi = y - halfProbeDistance; yi <= (y + halfProbeDistance); yi++) {

        for (let sensor of sensors) {
          if (xi === sensor.bx && yi === sensor.by) {
            continue cellLoop;
          }
          let distanceFromSensor = manhattenDistance(xi, yi, sensor.sx, sensor.sy);
          if (distanceFromSensor <= sensor.visibleDistance) {
            continue cellLoop;
          }
        }
        console.log("===================")
        console.log(xi, yi);
        break outer;
      }

    }
  }

}
