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

const symbols = [...new Set(input.match(/[^\d\.]/g))];

console.log(symbols);

const getPartNumberSum = (input) => {
  const partArray = input.split("\n").map((row) => row.split(""));

  let sum = 0;

  for (let i = 0; i < partArray.length; i++) {
    for (let j = 0; j < partArray[i].length; j++) {
      if (/\d/.test(partArray[i][j])) {
        const startOfNumberIndex = j;
        let endOfNumberIndex;

        for (let k = j; k < partArray[i].length; k++) {
          if (/\d/.test(partArray[i][k])) {
            endOfNumberIndex = k;
          } else {
            break;
          }
        }

        const number = partArray[i]
          .slice(startOfNumberIndex, endOfNumberIndex + 1)
          .join("");

        const numberLength = number.length;
        let isEnginePart = false;

        for (let l = 0; l < numberLength; l++) {
          //check left side of first element
          if (l === 0) {
            const leftAdjacentElements = [
              partArray?.[i - 1]?.[j - 1],
              partArray?.[i]?.[j - 1],
              partArray?.[i + 1]?.[j - 1],
              partArray?.[i - 1]?.[j],
              partArray?.[i + 1]?.[j],
            ];

            leftAdjacentElements.forEach((element) => {
              if (symbols.includes(element)) {
                isEnginePart = true;
              }
            });
          }

          //check right side of last element
          if (l === numberLength - 1) {
            const rightAdjacentElements = [
              partArray?.[i - 1]?.[j + l],
              partArray?.[i - 1]?.[j + l + 1],
              partArray?.[i]?.[j + l + 1],
              partArray?.[i + 1]?.[j + l],
              partArray?.[i + 1]?.[j + l + 1],
            ];

            rightAdjacentElements.forEach((element) => {
              if (symbols.includes(element)) {
                isEnginePart = true;
              }
            });
          }

          //check top and bottom of middle elements
          if (l > 0 && l < numberLength - 1) {
            const topAdjacentElements = [
              partArray?.[i - 1]?.[j + l],
              partArray?.[i + 1]?.[j + l],
            ];

            topAdjacentElements.forEach((element) => {
              if (symbols.includes(element)) {
                isEnginePart = true;
              }
            });
          }
        }
        j = j + numberLength;

        if (isEnginePart) {
          sum += parseInt(number);
        }
      }
    }
  }

  return sum;
};

const testSum = getPartNumberSum(testInput);

console.log(testSum);

const value = getPartNumberSum(input);
console.log(value);
