import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf8" })
let lines = data.split("\n").map(line => line.trim().split(" ")).filter(([range, letter, password]) => {
  if (range === "") return false;
  const [ol, twol] = range.split("-");
  const one = parseInt(ol, 10);
  const two = parseInt(twol, 10);

  const lete = letter.slice(0, 1);

  const cmatch = password.split("").filter(l => l === lete).length;

  return cmatch <= two && cmatch >= one;
})


lines = data.split("\n").map(line => line.trim().split(" ")).filter(([range, letter, password]) => {
  if (range === "") return false;
  const [ol, twol] = range.split("-");
  const one = parseInt(ol, 10);
  const two = parseInt(twol, 10);

  const lete = letter.slice(0, 1);

  let m1 = password[one - 1] === lete;
  let m2 = password[two - 1] === lete;

  return (m1 || m2) && !(m1 && m2)
})

console.log(lines.length)
