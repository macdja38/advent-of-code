import fs from "fs";

const example = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim()).filter(l => l !== "").map(line => {
  const [ingredients, contains] = line.split(" (contains ");

  console.log(contains);

  return { ingredients: ingredients.split(" ").sort(), contains: contains.slice(0, contains.length - 1).split(", ") };
});

function findItemsInAll(...arrays) {
  const arraysSorted = arrays.sort((a, b) => a.length - b.length);
  const shortest = arraysSorted[0];

  const common = [];

  itemIter: for (let item of shortest) {
    for (let array of arraysSorted.slice(1)) {
      if (array.indexOf(item) < 0) {
        continue itemIter;
      }
    }

    common.push(item);
  }

  return common;
}

console.log(findItemsInAll([1, 2], [1, 2], [1, 4, 2]))

function findSolution() {
  const mutableLines = JSON.parse(JSON.stringify(lines));

  const solved = []

  while(true) {

    const ingredients = new Set(mutableLines.map(line => line.contains).flat());

    if (ingredients.size === 0) {
      return solved;
    }

    for (let item of ingredients) {
      const listsWithAllergen = mutableLines.filter(line => line.contains.includes(item));
      const common = findItemsInAll(...listsWithAllergen.map(list => list.ingredients));

      if (common.length === 1) {
        const alien = common[0];
        console.log("removing", alien, item);

        solved.push({ english: item, alien })

        // remove item
        for (let line of mutableLines) {
          const containsIndex = line.contains.indexOf(item);
          if (containsIndex >= 0) {
            line.contains.splice(containsIndex, 1);
          }

          const ingredientsIndex = line.ingredients.indexOf(alien);
          if (ingredientsIndex >= 0) {
            line.ingredients.splice(ingredientsIndex, 1);
          }
        }
      }

    }
  }
}

const allergens = findSolution();

const allergenAlienNames = new Set(allergens.map(allergen => allergen.alien));

const countWithoutAllergens = lines.reduce((acc, line) => {
  return acc + line.ingredients.filter(i => !allergenAlienNames.has(i)).length
}, 0)

let sortedAllergenNames = allergens.map(a => a.english);

console.log(sortedAllergenNames.map(name => allergens.find(a => a.english === name).alien).join(","))

// find commons
// take commons out.

