import fs from "fs";

let data = fs.readFileSync("./data.txt", { encoding: "utf8" });

data = "$ cd /\n" +
  "$ ls\n" +
  "dir a\n" +
  "14848514 b.txt\n" +
  "8504156 c.dat\n" +
  "dir d\n" +
  "$ cd a\n" +
  "$ ls\n" +
  "dir e\n" +
  "29116 f\n" +
  "2557 g\n" +
  "62596 h.lst\n" +
  "$ cd e\n" +
  "$ ls\n" +
  "584 i\n" +
  "$ cd ..\n" +
  "$ cd ..\n" +
  "$ cd d\n" +
  "$ ls\n" +
  "4060174 j\n" +
  "8033020 d.log\n" +
  "5626152 d.ext\n" +
  "7214296 k";

function parseCommand(str) {
  str = str.slice(2)
  const [command, ...args] = str.split(" ")

  return { command, args };
}

const commands = data.split("\n").reduce((commands, line) => {
  if (line.startsWith("$")) {
    const { command, args } = parseCommand(line);
    return [...commands, { command, args, output: [] }];
  } else {
    commands[commands.length - 1].output.push(line);
  }
  return commands;
}, [])

const root = {};

let path = [];
let currentNode = root;

function nodeAtPath(start, path) {
  if (path.length === 0) {
    return start;
  }
  if (path.length === 1) {
    return start[path];
  }
  return nodeAtPath(start[path[0]], path.slice(1))
}

for (let command of commands) {
  switch (command.command) {
    case "cd": {
      if (command.args[0] === "/") {
        currentNode = root;
        path = [];
      } else if (command.args[0] === "..") {
        path.pop();
        currentNode = nodeAtPath(root, path);
      } else {
        const newDir = command.args[0];
        path.push(newDir);
        if (!currentNode.hasOwnProperty(newDir)) {
          currentNode[newDir] = {};
        }
        currentNode = currentNode[newDir];
      }
      break;
    }
    case "ls": {
      for (let file of command.output) {
        let [sizeOrDir, name] = file.split(" ")
        if (sizeOrDir === "dir") {
          currentNode[name] = {};
        } else {
          currentNode[name] = parseInt(sizeOrDir, 10);
        }
      }
      break;
    }
  }
}

console.log(root);

function countFoldersUnder10000(root) {
  let containedSize = 0;
  let containedFoldersUnder10000 = [];

  for (let folderOrFileName of Object.keys(root)) {
    const subItem = root[folderOrFileName]

    if (Number.isInteger(subItem)) {
      containedSize += subItem;
    } else {
      const { foldersUnder100000, size } = countFoldersUnder10000(subItem)
      containedSize += size;
      containedFoldersUnder10000.push(...foldersUnder100000);
    }
  }

  if (containedSize <= 100000) {
    containedFoldersUnder10000.push(containedSize);
  }


  return { foldersUnder100000: containedFoldersUnder10000, size: containedSize };
}

const part1 = countFoldersUnder10000(root);

console.log("part 1", part1.foldersUnder100000.reduce((a, b) => a + b));

const totalSpace = 70000000;
const totalRequiredFreeSpace = 30000000;
const usedSpace = part1.size;

const targetSize = totalRequiredFreeSpace - (totalSpace - usedSpace)
console.log("Space to Free", targetSize);

function folderUnderSpaceToFree(root) {
  let containedSize = 0;
  let bestFolderSoFar = Number.POSITIVE_INFINITY;

  for (let folderOrFileName of Object.keys(root)) {
    const subItem = root[folderOrFileName]

    if (Number.isInteger(subItem)) {
      containedSize += subItem;
    } else {
      const { size, bestFolder } = folderUnderSpaceToFree(subItem)
      containedSize += size;
      if (bestFolder <= bestFolderSoFar && bestFolder >= targetSize) {
        bestFolderSoFar = bestFolder;
      }
    }
  }

  if (containedSize <= bestFolderSoFar && containedSize >= targetSize) {
    bestFolderSoFar = containedSize;
  }


  return { size: containedSize, bestFolder: bestFolderSoFar };
}

console.log(folderUnderSpaceToFree(root));
