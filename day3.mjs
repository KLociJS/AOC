import input from "./day3Input.mjs";

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const getPartNumberSum = (partArray) => {
  let sum = 0;

  for (let i = 0; i < partArray.length; i++) {
    for (let j = 0; j < partArray[i].length; j++) {
      if (/\d/.test(partArray[i][j])) {
        const firstIndexOfNumber = j;

        let lastIndexOfNumber = getLastIndexOfNumber(
          partArray[i],
          firstIndexOfNumber
        );

        const number = getNumber(
          partArray[i],
          firstIndexOfNumber,
          lastIndexOfNumber
        );

        let isEnginePart = hasSymbolAdjacentElement(partArray, number, i, j);

        j = j + number.length;

        if (isEnginePart) {
          sum += parseInt(number);
        }
      }
    }
  }

  return sum;
};

const getLastIndexOfNumber = (line, firstIndexOfNumber) => {
  let lastIndexOfNumber;
  for (let i = firstIndexOfNumber; i < line.length; i++) {
    if (/\d/.test(line[i])) {
      lastIndexOfNumber = i;
    } else {
      break;
    }
  }
  return lastIndexOfNumber;
};

const getNumber = (line, firstIndexOfNumber, lastIndexOfNumber) =>
  line.slice(firstIndexOfNumber, lastIndexOfNumber + 1).join("");

const hasSymbolAdjacentElement = (partArray, number, lineIndex, rowIndex) => {
  for (let l = 0; l < number.length; l++) {
    const adjacentElements = [];

    //check left side of first element
    if (l === 0) {
      const leftAdjacentElements = [
        partArray?.[lineIndex - 1]?.[rowIndex - 1],
        partArray?.[lineIndex]?.[rowIndex - 1],
        partArray?.[lineIndex + 1]?.[rowIndex - 1],
        partArray?.[lineIndex - 1]?.[rowIndex],
        partArray?.[lineIndex + 1]?.[rowIndex],
      ];

      adjacentElements.push(...leftAdjacentElements);
    }

    //check right side of last element
    if (l === number.length - 1) {
      const rightAdjacentElements = [
        partArray?.[lineIndex - 1]?.[rowIndex + l],
        partArray?.[lineIndex - 1]?.[rowIndex + l + 1],
        partArray?.[lineIndex]?.[rowIndex + l + 1],
        partArray?.[lineIndex + 1]?.[rowIndex + l],
        partArray?.[lineIndex + 1]?.[rowIndex + l + 1],
      ];

      adjacentElements.push(...rightAdjacentElements);
    }

    //check top and bottom of middle elements
    if (l > 0 && l < number.length - 1) {
      const topAdjacentElements = [
        partArray?.[lineIndex - 1]?.[rowIndex + l],
        partArray?.[lineIndex + 1]?.[rowIndex + l],
      ];

      adjacentElements.push(...topAdjacentElements);
    }

    let isEnginePart = isElementEnginePart(adjacentElements);

    if (isEnginePart) {
      return true;
    }
  }
  return false;
};

const isElementEnginePart = (adjacentElements) =>
  adjacentElements.some((element) => symbols.includes(element));

const getPartArray = (input) => input.split("\n").map((row) => row.split(""));

const getSymbols = (input) => [...new Set(input.match(/[^\d\.]/g))];

// Results
const symbols = getSymbols(input);
const testArray = getPartArray(testInput);
const testSum = getPartNumberSum(testArray);

console.log(testSum);

const inputArray = getPartArray(input);
const value = getPartNumberSum(inputArray);
console.log(value);
